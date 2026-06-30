/* ============================================================
   Backend API client
   Switch API_BASE to the GCP endpoint on production.
   ============================================================ */

// コメントアウトするとdata/test.jsのモックデータを使用する
// const AA4H_API_ENABLED = true;

(function (global) {
  "use strict";

  const API_BASE = "http://localhost:3000";

  // ---- Assets ----

  async function fetchAssets() {
    const res = await fetch(`${API_BASE}/api/assets`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  // ---- Issues ----

  async function createIssue({ title, body }) {
    const res = await fetch(`${API_BASE}/api/issues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    return res.json(); // { url, number }
  }

  global.AA4HAPI = { fetchAssets, createIssue };
})(window);
