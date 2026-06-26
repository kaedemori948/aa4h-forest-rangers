/* ============================================================
   Backend API client
   Switch API_BASE to the GCP endpoint on production.
   ============================================================ */

// ローカルをfile://で開く場合はこの行をコメントアウト
// const AA4H_AUTH_ENABLED = true;

(function (global) {
  "use strict";

  const API_BASE = "http://localhost:3000";

  // ---- Auth ----

  function getToken() {
    return sessionStorage.getItem("gh_token");
  }

  function saveToken(token) {
    sessionStorage.setItem("gh_token", token);
  }

  function clearToken() {
    sessionStorage.removeItem("gh_token");
  }

  // URLにtokenパラメータがあればsessionStorageに保存してURLをクリーンにする
  function consumeTokenFromUrl() {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (!token) return;
    saveToken(token);
    params.delete("token");
    const clean = params.toString()
      ? `${location.pathname}?${params}`
      : location.pathname;
    history.replaceState(null, "", clean);
  }

  function isLoggedIn() {
    return !!getToken();
  }

  function login() {
    location.href = `${API_BASE}/auth/login?return_to=${encodeURIComponent(location.href)}`;
  }

  function logout() {
    clearToken();
    location.reload();
  }

  // ---- Issues ----

  async function createIssue({ title, body }) {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${API_BASE}/api/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    return res.json(); // { url, number }
  }

  // ---- Auth guard (runs on every page that loads this script) ----

  function initAuthGuard() {
    consumeTokenFromUrl();
    if (!isLoggedIn()) login();
  }

  global.AA4HAPI = { consumeTokenFromUrl, isLoggedIn, login, logout, createIssue, initAuthGuard };

  if (typeof AA4H_AUTH_ENABLED !== "undefined" && AA4H_AUTH_ENABLED) initAuthGuard();
})(window);
