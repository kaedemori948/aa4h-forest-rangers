/* ============================================================
   AI Assets for HMAX — shared logic
   Fetches /data/test.json and transforms to internal format
   ============================================================ */
(function () {
  "use strict";

  let DATA = { meta: {}, categories: [], agents: [] };
  let CATS = [];
  let CAT_BY_ID = {};

  const CARD_PAD = document.querySelector('link[href*="theme-b"],link[href*="theme-c"]') ? 18 : 22;

  // ---- slider CSS ----
  (function injectSliderCSS() {
    const id = "aa4h-slider-css";
    if (document.getElementById(id)) return;
    const p = CARD_PAD;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
.card.has-slider{padding-top:0;}
.card-slider{position:relative;overflow:hidden;border-radius:3px 3px 0 0;
  margin:0 -${p}px ${p===18?"12px":"14px"};height:160px;background:var(--line-soft);}
.card-slider-track{display:flex;height:100%;transition:transform .4s cubic-bezier(.2,.7,.2,1);}
.card-slider-track img{flex:0 0 100%;width:100%;height:100%;object-fit:cover;display:block;}
.card-slider-dots{position:absolute;bottom:7px;left:50%;transform:translateX(-50%);
  display:flex;gap:5px;z-index:2;}
.card-slider-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.5);
  border:none;padding:0;cursor:pointer;transition:background .2s;}
.card-slider-dot.active{background:#fff;}
.card-slider-btn{position:absolute;top:50%;transform:translateY(-50%);
  width:28px;height:28px;border-radius:50%;border:none;background:rgba(255,255,255,.75);
  color:var(--ink);font-size:13px;cursor:pointer;z-index:2;
  display:flex;align-items:center;justify-content:center;
  opacity:0;transition:opacity .2s,background .2s;line-height:1;}
.card-slider-btn:hover{background:#fff;}
.card:hover .card-slider-btn{opacity:1;}
.card-slider-prev{left:7px;}
.card-slider-next{right:7px;}
.detail-slider{position:relative;overflow:hidden;border-radius:3px;margin-bottom:28px;
  background:var(--line-soft);aspect-ratio:16/7;}
.detail-slider-track{display:flex;height:100%;transition:transform .45s cubic-bezier(.2,.7,.2,1);}
.detail-slider-track img{flex:0 0 100%;width:100%;height:100%;object-fit:cover;display:block;}
.detail-slider-prev,.detail-slider-next{position:absolute;top:50%;transform:translateY(-50%);
  width:44px;height:44px;border-radius:50%;border:none;background:rgba(255,255,255,.85);
  color:var(--ink);font-size:18px;cursor:pointer;z-index:2;
  display:flex;align-items:center;justify-content:center;
  transition:background .2s,transform .2s;box-shadow:0 2px 8px rgba(0,0,0,.15);}
.detail-slider-prev:hover,.detail-slider-next:hover{background:#fff;transform:translateY(-50%) scale(1.08);}
.detail-slider-prev{left:14px;}
.detail-slider-next{right:14px;}
.detail-slider-dots{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);
  display:flex;gap:7px;z-index:2;}
.detail-slider-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.55);
  border:none;padding:0;cursor:pointer;transition:background .2s,transform .2s;}
.detail-slider-dot.active{background:#fff;transform:scale(1.25);}
.detail-slider-count{position:absolute;bottom:12px;right:14px;
  font-family:var(--mono);font-size:11px;color:rgba(255,255,255,.8);
  background:rgba(0,0,0,.35);padding:3px 8px;border-radius:100px;z-index:2;}
.detail-overview{font-size:14.5px;line-height:1.8;color:var(--ink);margin:24px 0;}
.detail-overview p{margin:0 0 1em;}
`;
    document.head.appendChild(s);
  })();

  // ---- card-level slider ----
  const HIDE_SLIDER = `this.closest('.card-slider').hidden=true;this.closest('.card').classList.remove('has-slider');`;

  function cardSliderHTML(images) {
    if (!images || !images.length) return "";
    if (images.length === 1) {
      return `<div class="card-slider"><div class="card-slider-track"><img src="${images[0]}" alt="" loading="lazy" onerror="${HIDE_SLIDER}"></div></div>`;
    }
    const dots = images.map((_, i) =>
      `<button class="card-slider-dot${i===0?" active":""}" data-idx="${i}" aria-label="スライド${i+1}"></button>`
    ).join("");
    const imgs = images.map(u => `<img src="${u}" alt="" loading="lazy">`).join("");
    return `
<div class="card-slider" data-slider>
  <div class="card-slider-track">${imgs}</div>
  <button class="card-slider-btn card-slider-prev" data-dir="-1" aria-label="前へ">‹</button>
  <button class="card-slider-btn card-slider-next" data-dir="1"  aria-label="次へ">›</button>
  <div class="card-slider-dots">${dots}</div>
</div>`;
  }

  function bindCardSlider(el) {
    const track = el.querySelector(".card-slider-track");
    const dots  = el.querySelectorAll(".card-slider-dot");
    const total = track ? track.children.length : 0;
    if (!track || total < 2) return;
    let cur = 0;
    function go(n) {
      cur = (n + total) % total;
      track.style.transform = `translateX(-${cur * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === cur));
    }
    el.querySelectorAll(".card-slider-btn").forEach(btn => {
      btn.addEventListener("click", e => { e.stopPropagation(); go(cur + +btn.dataset.dir); });
    });
    dots.forEach(d => {
      d.addEventListener("click", e => { e.stopPropagation(); go(+d.dataset.idx); });
    });
  }

  // ---- detail-page slider ----
  function detailSliderHTML(images) {
    if (!images || !images.length) return "";
    const imgs = images.map(u => `<img src="${u}" alt="" loading="lazy">`).join("");
    const dots = images.length > 1 ? `<div class="detail-slider-dots">` +
      images.map((_, i) => `<button class="detail-slider-dot${i===0?" active":""}" data-idx="${i}" aria-label="スライド${i+1}"></button>`).join("") +
      `</div>` : "";
    const arrows = images.length > 1 ? `
      <button class="detail-slider-prev" data-dir="-1" aria-label="前へ">‹</button>
      <button class="detail-slider-next" data-dir="1"  aria-label="次へ">›</button>` : "";
    const count = images.length > 1 ? `<span class="detail-slider-count">1 / ${images.length}</span>` : "";
    return `<div class="detail-slider" data-detail-slider>
  <div class="detail-slider-track">${imgs}</div>
  ${arrows}${dots}${count}
</div>`;
  }

  function bindDetailSlider(root) {
    const el = root.querySelector("[data-detail-slider]");
    if (!el) return;
    const track = el.querySelector(".detail-slider-track");
    const dots  = el.querySelectorAll(".detail-slider-dot");
    const count = el.querySelector(".detail-slider-count");
    const total = track ? track.children.length : 0;
    if (!track || total < 2) return;
    let cur = 0;
    function go(n) {
      cur = (n + total) % total;
      track.style.transform = `translateX(-${cur * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === cur));
      if (count) count.textContent = `${cur + 1} / ${total}`;
    }
    el.querySelectorAll("[data-dir]").forEach(btn => {
      btn.addEventListener("click", () => go(cur + +btn.dataset.dir));
    });
    dots.forEach(d => d.addEventListener("click", () => go(+d.dataset.idx)));
  }

  // ---- data transform ----
  const CAT_ICONS = {
    '資料・文書作成': '✎', '開発・コード支援': '</>', 'データ分析・診断': '◴',
    '情報収集・調査': '⌕', '営業・顧問対応': '♚', '営業・顧客対応': '♚',
    'レビュー・チェック': '⚑', 'テスト・品質保証': '✓',
    'サービス・プロダクト': '◆', 'ナレッジ・業務支援': '◈', 'Product': '✦',
  };

  function getCatIcon(title) {
    return CAT_ICONS[title] || '✦';
  }

  function stripHTML(html) {
    return (html || "").replace(/<[^>]+>/g, "").trim();
  }

  function transformData(json) {
    const assets = json.assets;
    const typeMap = new Map();
    assets.forEach(a => {
      const key = a.type.title;
      if (!typeMap.has(key)) {
        typeMap.set(key, {
          id: key,
          name: key,
          icon: getCatIcon(key),
          count: 0,
        });
      }
      typeMap.get(key).count++;
    });
    const categories = [...typeMap.values()];

    const agents = assets.map((a, i) => ({
      id: a.id,
      title: a.title,
      category: a.type.title,
      views: a.stats?.view_count || 0,
      uniqueViews: a.stats?.unique_view_count || 0,
      downloads: a.stats?.download_count || 0,
      likes: a.stats?.like_count || 0,
      comments: a.stats?.comment_count || 0,
      published: a.last_updated_at ? a.last_updated_at.split('T')[0] : null,
      owner: (a.owners && a.owners[0] && a.owners[0].full_name) ||
             (a.creator && a.creator.full_name) || null,
      ownerRole: (a.owners && a.owners[0] && a.owners[0].ownership_type) || null,
      ownerEmail: (a.owners && a.owners[0] && a.owners[0].email_id) || null,
      moderators: (a.moderators || []).map(m => ({ name: m.full_name, email: m.email_id })),
      capabilities: (a.capabilities || []).map(c => {
        const ja = (c.translations || []).find(t => t.language_code === 'ja');
        return ja ? ja.title : c.title;
      }),
      status: a.status?.title || null,
      accessType: a.access_type?.title || null,
      termsUrl: a.type?.download_term_condition_url || null,
      termsTitle: a.type?.download_term_condition_title || null,
      description: stripHTML(a.overview),
      overview: a.overview || null,
      pick: false,
      images: a.preview_url ? [a.preview_url] : [],
      tags: (a.tags || []).map(t => typeof t === "string" ? t : (t.title || "")).filter(Boolean),
    }));

    const topPickIds = new Set(
      [...agents].sort((a, b) => b.views - a.views).slice(0, 4).map(a => a.id)
    );
    agents.forEach(a => { a.pick = topPickIds.has(a.id); });

    return {
      meta: {
        total: agents.length,
        totalViews: agents.reduce((s, a) => s + a.views, 0),
        totalLikes: agents.reduce((s, a) => s + a.likes, 0),
      },
      categories,
      agents,
    };
  }

  // ---- i18n ----
  const I18N = {
    ja: {
      nav_index:"索引", nav_home:"ホーム", nav_agents:"アセット一覧", nav_new:"新着",
      stat_agents_br:"公開アセット<br>Published", stat_reuse_br:"閲覧数<br>VIEWS", stat_cats_br:"カテゴリ<br>Categories",
      stat_agents:"公開アセット", stat_reuse:"閲覧数", stat_cats:"カテゴリ",
      sec_picks_sub:"AI-CoE 厳選 — Curated", sec_cats_sub:"利用シーン別 — Index",
      sec_ranking_sub:"人気ランキング — Top 8", sec_newest_sub:"新着アセット",
      link_picks:"ピック一覧 →", link_cats:"すべて見る →", link_ranking:"ランキング全体 →", link_newest:"新着をもっと →",
      list_h1:"アセット一覧", list_desc:"公開中のAIアセットを横断検索。キーワード・カテゴリ・並び順で、目的のアセットへ素早くたどり着けます。",
      list_h1_en:"Directory",
      search_ph:"アセット名・概要で検索…",
      sort_label:"並び順",
      sort_views:"人気順（ビュー）", sort_downloads:"利用実績順（DL）", sort_newest:"新着順", sort_likes:"いいね順", sort_title:"名前順",
      facet_cap_label:"機能タグ", facet_date_label:"更新日", facet_dl_label:"DL実績", facet_tag_label:"タグ",
      facet_date_1m:"過去1ヶ月", facet_date_3m:"過去3ヶ月", facet_date_year:"今年",
      facet_dl_10:"10件以上", facet_dl_50:"50件以上", facet_dl_100:"100件以上",
      facet_reset:"リセット",
      facet_all:"すべて",
      result_suffix:"件のアセット",
      more_text:"さらに表示", more_remain:"残り",
      empty_title:"No matches.", empty_title_b:"該当なし",
      empty_msg:"条件に合うアセットが見つかりませんでした。キーワードやカテゴリを変えてお試しください。",
      suggest_title:"もしかして、こちらをお探しですか？",
      suggest_reason_tag:'タグ "<b>$1</b>" に一致',
      suggest_reason_cat:'カテゴリ "<b>$1</b>" に一致',
      suggest_reason_cap:'機能 "<b>$1</b>" に一致',
      suggest_reason_desc:'概要に "<b>$1</b>" が含まれます',
      rail_cats:"カテゴリ", rail_filter:"絞り込み",
      card_reuse:"ビュー", card_users:"ユニーク",
      rank_reuse:"ビュー",
      modal_reuse:"ビュー数", modal_uniq:"ユニーク", modal_likes:"いいね", modal_rank:"人気順位",
      modal_owner:"オーナー", modal_pubdate:"更新日", modal_assetid:"アセットID",
      modal_note:"※ 統計は表示時点のデータです。", modal_close:"閉じる",
      detail_back:"← アセット一覧へ戻る", detail_demo:"※ 一部の情報はデモ用データです",
      detail_try:"試す", detail_try_done:"デモ環境のため起動しません ✓",
      fld_owner:"オーナー", fld_pubdate:"更新日", fld_assetid:"アセットID",
      dtl_reuse:"ビュー", dtl_uniq:"ユニーク", dtl_dl:"DL", dtl_likes:"いいね",
      notfound:"アセットが見つかりませんでした。", notfound_link:"← 一覧へ戻る",
      pick_badge:"⭐ ピック",
      chat_name:"AIアシスタント", chat_sub:"Find the Right Asset",
      chat_close:"閉じる", chat_ph:"例：資料作成を自動化したい", chat_open_label:"AIアシスタントを開く",
      chat_hello:"こんにちは！<b>AI Assets</b> の検索アシスタントです。<br>どんな業務をAIでサポートしたいか教えてください。",
      chat_found:"件見つかりました", chat_noresult:"該当するアセットが見つかりませんでした。<br>別のキーワードでお試しください。",
      chat_detail_link:"詳細を見る →", chat_reuse:"ビュー",
      chat_sugs:["資料作成","コードレビュー","データ分析","営業支援","情報収集","テスト自動化"],
      cta_explore:"アセットを探す", cta_cats:"カテゴリから見る", cta_dir_btn:"アセット一覧へ",
      hero_badge_b:"AI CoE · 社内AIアセット カタログ",
      hero_h1_b:'あなたに最適な、<br><em>AIアセット</em>を。',
      hero_lead_b:'AI CoE が公開する <span data-stat="total">—</span> 個のAI Assetを、カテゴリ・人気・新着から横断検索。業務にぴったりの一体が、すぐ見つかります。',
      sec_h_picks_b:"⭐ プロデューサーズピック", sec_h_cats_b:"カテゴリから探す",
      sec_h_ranking_b:"人気のアセット", sec_h_newest_b:"新着アセット",
      cta_band_b:"選択肢から、あなたの一体を。", cta_band_sub_b:"キーワード・カテゴリ・並び替えで横断検索",
    },
    en: {
      nav_index:"Index", nav_home:"Home", nav_agents:"Directory", nav_new:"New",
      stat_agents_br:"Assets Published", stat_reuse_br:"Views", stat_cats_br:"Categories",
      stat_agents:"Assets", stat_reuse:"Views", stat_cats:"Categories",
      sec_picks_sub:"Curated by AI-CoE", sec_cats_sub:"Browse by use case",
      sec_ranking_sub:"Top 8 by popularity", sec_newest_sub:"Recently published",
      link_picks:"All picks →", link_cats:"View all →", link_ranking:"Full ranking →", link_newest:"More new →",
      list_h1:"Directory", list_desc:"Search across all published AI assets. Filter by keyword, category, or sort order.",
      list_h1_en:"Directory",
      search_ph:"Search by name, owner, or description…",
      sort_label:"Sort",
      sort_views:"Most Popular", sort_downloads:"Most Downloaded", sort_newest:"Newest", sort_likes:"Most Liked", sort_title:"Name A–Z",
      facet_cap_label:"Capability", facet_date_label:"Updated", facet_dl_label:"Downloads", facet_tag_label:"Tags",
      facet_date_1m:"Past month", facet_date_3m:"Past 3 months", facet_date_year:"This year",
      facet_dl_10:"10+", facet_dl_50:"50+", facet_dl_100:"100+",
      facet_reset:"Reset",
      facet_all:"All",
      result_suffix:"assets found",
      more_text:"Load more", more_remain:"remaining",
      empty_title:"No matches.", empty_title_b:"No matches.",
      empty_msg:"No assets match your filters. Try a different keyword or category.",
      suggest_title:"Did you mean one of these?",
      suggest_reason_tag:'Matches tag "<b>$1</b>"',
      suggest_reason_cat:'Matches category "<b>$1</b>"',
      suggest_reason_cap:'Matches capability "<b>$1</b>"',
      suggest_reason_desc:'"<b>$1</b>" found in description',
      rail_cats:"Categories", rail_filter:"Filters",
      card_reuse:"Views", card_users:"Unique",
      rank_reuse:"Views",
      modal_reuse:"Views", modal_uniq:"Unique", modal_likes:"Likes", modal_rank:"Rank",
      modal_owner:"Owner", modal_pubdate:"Updated", modal_assetid:"Asset ID",
      modal_note:"* Stats as of display date.", modal_close:"Close",
      detail_back:"← Back to Directory", detail_demo:"* Some info is sample data.",
      detail_try:"Try it", detail_try_done:"Not available in demo ✓",
      fld_owner:"Owner", fld_pubdate:"Updated", fld_assetid:"Asset ID",
      dtl_reuse:"Views", dtl_uniq:"Unique", dtl_dl:"DL", dtl_likes:"Likes",
      notfound:"Asset not found.", notfound_link:"← Back to Directory",
      pick_badge:"⭐ Pick",
      chat_name:"AI Assistant", chat_sub:"Find the Right Asset",
      chat_close:"Close", chat_ph:"e.g. I want to automate document creation", chat_open_label:"Open AI Assistant",
      chat_hello:"Hi! I\'m the <b>AI Assets</b> assistant.<br>What task would you like AI to help with?",
      chat_found:"asset(s) found", chat_noresult:"No matching assets found.<br>Try a different keyword.",
      chat_detail_link:"View details →", chat_reuse:"Views",
      chat_sugs:["Document creation","Code review","Data analysis","Sales support","Research","Test automation"],
      cta_explore:"Explore Assets", cta_cats:"Browse Categories", cta_dir_btn:"View Directory",
      hero_badge_b:"AI CoE · Internal AI Asset Catalog",
      hero_h1_b:'Find the AI Asset<br><em>built for you.</em>',
      hero_lead_b:'Discover <span data-stat="total">—</span> AI assets published by AI CoE.',
      sec_h_picks_b:"⭐ Producer's Picks", sec_h_cats_b:"Browse Categories",
      sec_h_ranking_b:"Most Popular", sec_h_newest_b:"Newly Added",
      cta_band_b:"Find your perfect match.", cta_band_sub_b:"Search by keyword, category, or sort order",
    },
  };

  let _lang = (typeof localStorage !== "undefined" && localStorage.getItem("aa4h_lang")) || "ja";
  const t = key => (I18N[_lang] && I18N[_lang][key] !== undefined ? I18N[_lang][key] : (I18N.ja[key] !== undefined ? I18N.ja[key] : key));

  function applyI18n() {
    document.documentElement.lang = _lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const v = t(el.dataset.i18n); if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const v = t(el.dataset.i18nHtml); if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const v = t(el.dataset.i18nPh); if (v !== undefined) el.placeholder = v;
    });
  }

  // ---- helpers ----
  const fmt = n => (n == null ? "0" : n.toLocaleString("en-US"));
  const esc = s => String(s ?? "").replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
  const safeUrl = u => /^https?:\/\//i.test(u) ? esc(u) : "#";
  const catName  = id => (CAT_BY_ID[id] ? CAT_BY_ID[id].name  : "その他");
  const catGlyph = id => esc(CAT_BY_ID[id] ? CAT_BY_ID[id].icon : "✦");
  const fmtDate  = iso => { if (!iso) return "—"; const [y,m,d] = iso.split("-"); return `${y}.${m}.${d}`; };

  const flagDetailPage = () => document.body.dataset.detail === "page";

  function cardHTML(a, idx) {
    const delay = idx != null ? ` style="animation-delay:${Math.min(idx,12)*45}ms"` : "";
    const slider = cardSliderHTML(a.images);
    const desc = a.description
      ? `<p class="card-desc">${esc(a.description)}</p>`
      : `<p class="card-desc" style="opacity:.5">— 概要なし —</p>`;
    const sliderClass = slider ? " has-slider" : "";
    return `
<article class="card reveal${sliderClass}" data-id="${a.id}"${delay}>
  ${slider}
  <div class="card-top">
    <a class="card-cat" href="${(window.AGENTS_PAGE||'agents.html')}?cat=${encodeURIComponent(a.category)}"><span class="gl">${catGlyph(a.category)}</span>${esc(catName(a.category))}</a>
    <span class="card-id">№${a.id}</span>
  </div>
  <h3 class="card-title">${esc(a.title)}</h3>
  ${desc}
  <div class="card-foot">
    <span class="stat"><span class="lab">${t("card_reuse")}</span> ${fmt(a.views)}</span>
    <span class="stat"><span class="lab">${t("card_users")}</span> ${fmt(a.uniqueViews)}</span>
    ${a.likes ? `<span class="stat"><span class="lab">♥</span> ${fmt(a.likes)}</span>` : ""}
    ${a.owner ? `<span class="card-owner">${esc(a.owner)}</span>` : ""}
  </div>
</article>`;
  }

  function bindCardSliders(root) {
    root.querySelectorAll("[data-slider]").forEach(bindCardSlider);
  }

  // ---- detail modal ----
  function openModal(id) {
    const a = DATA.agents.find(x => x.id === id);
    if (!a) return;
    let m = document.getElementById("agent-modal");
    if (!m) {
      m = document.createElement("div");
      m.id = "agent-modal"; m.className = "modal";
      m.innerHTML = `<div class="modal-bg"></div><div class="modal-card" role="dialog" aria-modal="true"></div>`;
      document.body.appendChild(m);
      m.querySelector(".modal-bg").addEventListener("click", closeModal);
    }
    const rankAll = [...DATA.agents].sort((x,y) => y.views - x.views);
    const rank = rankAll.findIndex(x => x.id === a.id) + 1;
    m.querySelector(".modal-card").innerHTML = `
      <button class="modal-x" aria-label="${t("modal_close")}">×</button>
      <div class="modal-eyebrow"><span class="gl">${catGlyph(a.category)}</span> ${esc(catName(a.category))} · №${a.id}</div>
      <h2 class="modal-title">${esc(a.title)}</h2>
      ${a.description ? `<p class="modal-desc">${esc(a.description)}</p>` : ""}
      <div class="modal-grid">
        <div class="mg"><span class="mg-n">${fmt(a.views)}</span><span class="mg-l">${t("modal_reuse")}</span></div>
        <div class="mg"><span class="mg-n">${fmt(a.uniqueViews)}</span><span class="mg-l">${t("modal_uniq")}</span></div>
        <div class="mg"><span class="mg-n">${fmt(a.likes)}</span><span class="mg-l">${t("modal_likes")}</span></div>
        <div class="mg"><span class="mg-n">#${rank}</span><span class="mg-l">${t("modal_rank")}</span></div>
      </div>
      <dl class="modal-meta">
        <div><dt>${t("modal_owner")}</dt><dd>${esc(a.owner||"—")}</dd></div>
        <div><dt>${t("modal_pubdate")}</dt><dd>${fmtDate(a.published)}</dd></div>
        <div><dt>${t("modal_assetid")}</dt><dd>${a.id}</dd></div>
      </dl>
      <p class="modal-note">${t("modal_note")}</p>`;
    m.querySelector(".modal-x").addEventListener("click", closeModal);
    m.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    const m = document.getElementById("agent-modal");
    if (m) m.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  function go(id) {
    if (flagDetailPage()) location.href = `${window.AGENT_PAGE ?? "agent.html"}?id=${id}`;
    else openModal(id);
  }

  function bindCards(root) {
    root.addEventListener("click", e => {
      if (e.target.closest("[data-slider]") &&
          (e.target.closest(".card-slider-btn") || e.target.closest(".card-slider-dot"))) return;
      if (e.target.closest(".card-cat")) return;
      const c = e.target.closest(".card");
      if (c) go(+c.dataset.id);
    });
    bindCardSliders(root);
  }

  // ================= HOME =================
  function renderHome() {
    const setText = (sel, v) => { document.querySelectorAll(sel).forEach(el => { el.textContent = v; }); };
    setText("[data-stat=total]",  fmt(DATA.meta.total));
    setText("[data-stat=views]",  fmt(DATA.meta.totalViews));
    setText("[data-stat=cats]",   CATS.length);

    const pk = document.getElementById("picks");
    if (pk) {
      const picks = DATA.agents.filter(a => a.pick);
      pk.innerHTML = picks.map((a,i) => cardHTML(a,i)).join("");
      if (!pk.dataset.bound) { bindCards(pk); pk.dataset.bound = "1"; }
    }

    const ci = document.getElementById("cat-index");
    if (ci) {
      ci.innerHTML = CATS.map((c,i) => `
        <a class="cat-row reveal" href="${window.AGENTS_PAGE || 'pages/agents.html'}?cat=${c.id}" style="animation-delay:${i*50}ms">
          <span class="cat-no">${String(i+1).padStart(2,"0")}</span>
          <span class="cat-gl">${esc(c.icon)}</span>
          <span class="cat-name">${esc(c.name)}</span>
          <span class="cat-count">${fmt(c.count)} assets</span>
          <span class="cat-arr">→</span>
        </a>`).join("");
    }

    const rk = document.getElementById("ranking");
    if (rk) {
      const top = [...DATA.agents].sort((a,b) => b.views - a.views).slice(0,8);
      rk.innerHTML = top.map((a,i) => `
        <article class="rank-row reveal" data-id="${a.id}" style="animation-delay:${i*55}ms">
          <span class="rank-no">${String(i+1).padStart(2,"0")}</span>
          <span class="rank-body">
            <span class="rank-title">${esc(a.title)}</span>
            <span class="rank-cat">${catGlyph(a.category)} ${esc(catName(a.category))}</span>
          </span>
          <span class="rank-stats">
            <span class="rs"><b>${fmt(a.views)}</b>${t("rank_reuse")}</span>
            <span class="rs"><b>${fmt(a.uniqueViews)}</b>user</span>
          </span>
        </article>`).join("");
      if (!rk.dataset.bound) {
        rk.addEventListener("click", e => { const r = e.target.closest(".rank-row"); if (r) go(+r.dataset.id); });
        rk.dataset.bound = "1";
      }
    }

    const nw = document.getElementById("newest");
    if (nw) {
      const recent = [...DATA.agents].filter(a => a.published)
        .sort((a,b) => b.published.localeCompare(a.published)).slice(0,8);
      nw.innerHTML = recent.map((a,i) => cardHTML(a,i)).join("");
      if (!nw.dataset.bound) { bindCards(nw); nw.dataset.bound = "1"; }
    }
  }

  // ================= LIST =================
  function renderList() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    const params  = new URLSearchParams(location.search);
    const qInput  = document.getElementById("q");
    const sortSel = document.getElementById("sort");
    const validSorts = ["views","downloads","newest","likes","title"];
    const urlSort = params.get("sort");
    const urlCats = (params.get("cat") || "").split(",").filter(Boolean);
    const state = {
      q:"", cats: urlCats, caps:[], tags:[], dateRange:"", minDl:0,
      sort: validSorts.includes(urlSort) ? urlSort : "views",
      shown:0, step:48, results:[],
    };
    const chipWrap  = document.getElementById("chips");
    const countEl   = document.getElementById("result-count");
    const moreBtn   = document.getElementById("more");
    const emptyEl   = document.getElementById("empty");
    const capPills  = document.getElementById("facet-cap-pills");
    const tagPills  = document.getElementById("facet-tag-pills");
    const dateSel   = document.getElementById("facet-date");
    const dlSel     = document.getElementById("facet-dl");
    const resetBtn  = document.getElementById("facet-reset");

    const chips = [{ id:"all", name:t("facet_all"), icon:"✦", count:DATA.meta.total }, ...CATS];
    chipWrap.innerHTML = chips.map(c =>
      `<button class="chip" data-cat="${c.id}">${esc(c.icon)} ${esc(c.name)} <span>${fmt(c.count)}</span></button>`
    ).join("");

    // build capability pills
    function buildPills(container, items, stateArr) {
      if (!container) return;
      container.innerHTML = [...items.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], "ja"))
        .map(([name, cnt]) =>
          `<button class="facet-pill" data-val="${esc(name)}">${esc(name)}<span>${cnt}</span></button>`
        ).join("");
      container.addEventListener("click", e => {
        const b = e.target.closest(".facet-pill"); if (!b) return;
        const val = b.dataset.val;
        const idx = stateArr.indexOf(val);
        if (idx === -1) stateArr.push(val); else stateArr.splice(idx, 1);
        b.classList.toggle("active", stateArr.includes(val));
        refresh();
      });
    }

    const capSet = new Map();
    DATA.agents.forEach(a => (a.capabilities||[]).forEach(c => capSet.set(c, (capSet.get(c)||0)+1)));
    buildPills(capPills, capSet, state.caps);

    const TAG_GROUPS = [
      { label: "業務・文書",   tags: ["テンプレート","文書","手順書","チェックリスト","レポート","提案","ロードマップ"] },
      { label: "データ・分析", tags: ["データ","分析","BI","KPI","ダッシュボード","トレンド","市場","調査","リサーチ","情報収集"] },
      { label: "開発・技術",   tags: ["コード","開発","バグ","テスト","API","CI/CD対応","DevOps","UX","アーキテクチャ","QA","ノーコード","品質","品質保証"] },
      { label: "営業・顧客",   tags: ["営業","顧客","リード","CRM","CRM連携","フォローアップ"] },
      { label: "業務改善",     tags: ["自動化","効率化","業務改善","自動通知","監査","確認"] },
      { label: "ナレッジ・情報", tags: ["ナレッジ","Wiki"] },
      { label: "ツール連携",   tags: ["API連携","Excel対応","Outlook連携","チャットBot"] },
      { label: "戦略・企画",   tags: ["戦略","プロダクト","アジャイル","ビジネス","レビュー"] },
    ];

    const tagSet = new Map();
    DATA.agents.forEach(a => (a.tags||[]).forEach(tg => tagSet.set(tg, (tagSet.get(tg)||0)+1)));

    function buildGroupedTagPills(container, stateArr) {
      if (!container) return;
      const allKnown = new Set(TAG_GROUPS.flatMap(g => g.tags));
      const otherTags = [...tagSet.keys()].filter(t => !allKnown.has(t)).sort((a,b) => a.localeCompare(b,"ja"));
      const groups = otherTags.length > 0 ? [...TAG_GROUPS, { label:"その他", tags: otherTags }] : TAG_GROUPS;
      container.innerHTML = groups.map(g => {
        const pills = g.tags.filter(t => tagSet.has(t));
        if (!pills.length) return "";
        return `<div class="tag-group">
          <div class="tag-group-label">${esc(g.label)}</div>
          <div class="facet-pills">${pills.map(name =>
            `<button class="facet-pill" data-val="${esc(name)}">${esc(name)}<span>${tagSet.get(name)}</span></button>`
          ).join("")}</div>
        </div>`;
      }).join("");
      container.addEventListener("click", e => {
        const b = e.target.closest(".facet-pill"); if (!b) return;
        const val = b.dataset.val;
        const idx = stateArr.indexOf(val);
        if (idx === -1) stateArr.push(val); else stateArr.splice(idx, 1);
        b.classList.toggle("active", stateArr.includes(val));
        refresh();
      });
    }
    buildGroupedTagPills(tagPills, state.tags);

    // 業務用語と実際のタイトル・説明に現れる語の橋渡し（データを変えずに検索精度を上げるため）
    const FILTER_SYNONYMS = {
      'スライド':    ['提案書', '資料', 'プレゼン'],
      'powerpoint':  ['提案書', '資料', '文書'],
      'ppt':         ['提案書', '資料', '文書'],
      'プレゼン':    ['提案書', '資料'],
      'プレゼンテーション': ['提案書', '資料'],
    };
    function expandFilterTokens(tokens) {
      const expanded = new Set(tokens);
      tokens.forEach(tok => {
        const syns = FILTER_SYNONYMS[tok];
        if (syns) syns.forEach(s => expanded.add(s));
      });
      return [...expanded];
    }

    function compute() {
      const rawTokens = state.q.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);
      const tokens = expandFilterTokens(rawTokens);
      const now = new Date();
      let r = DATA.agents.filter(a => {
        if (state.cats.length > 0 && !state.cats.includes(a.category)) return false;
        if (state.caps.length > 0 && !(a.capabilities||[]).some(c => state.caps.includes(c))) return false;
        if (state.tags.length > 0 && !(a.tags||[]).some(tg => state.tags.includes(tg))) return false;
        if (state.dateRange && a.published) {
          const d = new Date(a.published + "T00:00:00");
          if (state.dateRange === "1m" && (now - d) > 30 * 86400000) return false;
          if (state.dateRange === "3m" && (now - d) > 90 * 86400000) return false;
          if (state.dateRange === "year" && d.getFullYear() < now.getFullYear()) return false;
        }
        if (a.downloads < state.minDl) return false;
        if (tokens.length > 0) {
          const ti = a.title.toLowerCase();
          const ow = (a.owner||"").toLowerCase();
          const de = (a.description||"").toLowerCase();
          if (!tokens.every(tok => ti.includes(tok) || ow.includes(tok) || de.includes(tok))) return false;
        }
        return true;
      });
      const sorters = {
        views:     (a,b) => b.views - a.views,
        downloads: (a,b) => b.downloads - a.downloads || b.views - a.views,
        newest:    (a,b) => (b.published||"").localeCompare(a.published||""),
        title:     (a,b) => a.title.localeCompare(b.title,"ja"),
        likes:     (a,b) => b.likes - a.likes || b.views - a.views,
      };
      r.sort(sorters[state.sort]);
      state.results = r; state.shown = 0;
    }

    // ---- suggest: broader search when results are zero ----
    let suggestEl = document.getElementById("suggest-section");
    if (!suggestEl) {
      suggestEl = document.createElement("div");
      suggestEl.id = "suggest-section";
      suggestEl.style.display = "none";
      emptyEl.insertAdjacentElement("afterend", suggestEl);
    }

    function suggestAgents(tokens) {
      if (!tokens.length) return [];
      return DATA.agents.map(a => {
        let reason = null;
        const catTitle = catName(a.category).toLowerCase();
        for (const tok of tokens) {
          const matched = (a.tags||[]).find(tg => tg.toLowerCase().includes(tok));
          if (matched) { reason = t("suggest_reason_tag").replace("$1", esc(matched)); break; }
          if (catTitle.includes(tok)) { reason = t("suggest_reason_cat").replace("$1", esc(catName(a.category))); break; }
          const cap = (a.capabilities||[]).find(c => c.toLowerCase().includes(tok));
          if (cap) { reason = t("suggest_reason_cap").replace("$1", esc(cap)); break; }
          const desc = (a.description||"").toLowerCase();
          if (desc.includes(tok)) { reason = t("suggest_reason_desc").replace("$1", esc(tok)); break; }
        }
        return reason ? { a, reason } : null;
      }).filter(Boolean).slice(0, 4);
    }

    function paintSuggests(tokens) {
      if (!tokens.length) { suggestEl.style.display = "none"; return; }
      const items = suggestAgents(tokens);
      if (!items.length) { suggestEl.style.display = "none"; return; }
      suggestEl.innerHTML = `
        <div class="suggest-head">${t("suggest_title")}</div>
        <div class="suggest-grid">
          ${items.map(({a, reason}) => `
            <article class="suggest-card" data-id="${a.id}">
              <span class="suggest-reason">${reason}</span>
              <span class="suggest-cat"><span class="gl">${catGlyph(a.category)}</span>${esc(catName(a.category))}</span>
              <span class="suggest-title">${esc(a.title)}</span>
            </article>`).join("")}
        </div>`;
      suggestEl.style.display = "";
      if (!suggestEl.dataset.bound) {
        suggestEl.addEventListener("click", e => {
          const c = e.target.closest(".suggest-card");
          if (c) go(+c.dataset.id);
        });
        suggestEl.dataset.bound = "1";
      }
    }

    function paint(append) {
      if (!append) grid.innerHTML = "";
      const next = state.results.slice(state.shown, state.shown + state.step);
      grid.insertAdjacentHTML("beforeend", next.map((a,i) => cardHTML(a, append?null:i)).join(""));
      grid.querySelectorAll("[data-slider]:not([data-slider-bound])").forEach(el => {
        bindCardSlider(el);
        el.dataset.sliderBound = "1";
      });
      state.shown += next.length;
      countEl.textContent = fmt(state.results.length);
      moreBtn.style.display = state.shown < state.results.length ? "" : "none";
      moreBtn.textContent = `${t("more_text")}  (${t("more_remain")} ${fmt(state.results.length - state.shown)})`;
      const isEmpty = state.results.length === 0;
      // .empty は CSS で display:none のため、表示側は明示的に block を指定する
      emptyEl.style.display = isEmpty ? "block" : "none";
      const tokens = state.q.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);
      if (isEmpty && tokens.length) paintSuggests(tokens);
      else suggestEl.style.display = "none";
    }

    function syncChips() {
      chipWrap.querySelectorAll(".chip").forEach(b =>
        b.classList.toggle("active",
          b.dataset.cat === "all" ? state.cats.length === 0 : state.cats.includes(b.dataset.cat)));
    }

    function syncReset() {
      if (!resetBtn) return;
      const active = state.cats.length > 0 || state.caps.length > 0 || state.tags.length > 0
        || state.dateRange || state.minDl > 0 || state.q;
      resetBtn.style.display = active ? "" : "none";
    }

    function refresh() { compute(); paint(false); syncChips(); syncReset(); }

    chipWrap.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      if (b.dataset.cat === "all") {
        state.cats = [];
      } else {
        const id = b.dataset.cat;
        const idx = state.cats.indexOf(id);
        if (idx === -1) state.cats.push(id); else state.cats.splice(idx, 1);
      }
      refresh();
      const catParam = state.cats.join(",");
      history.replaceState(null, "", catParam ? `?cat=${catParam}` : location.pathname);
    });

    if (dateSel) dateSel.addEventListener("change", () => { state.dateRange = dateSel.value; refresh(); });
    if (dlSel)   dlSel.addEventListener("change",   () => { state.minDl = +dlSel.value; refresh(); });
    if (resetBtn) resetBtn.addEventListener("click", () => {
      state.cats = []; state.caps = []; state.tags = []; state.dateRange = ""; state.minDl = 0; state.q = "";
      qInput.value = "";
      if (dateSel) dateSel.value = "";
      if (dlSel)   dlSel.value = "0";
      if (capPills) capPills.querySelectorAll(".facet-pill").forEach(p => p.classList.remove("active"));
      if (tagPills) tagPills.querySelectorAll(".facet-pill").forEach(p => p.classList.remove("active"));
      refresh();
    });

    let timer;
    qInput.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { state.q = qInput.value; refresh(); }, 160); });
    sortSel.addEventListener("change", () => { state.sort = sortSel.value; refresh(); });
    moreBtn.addEventListener("click", () => paint(true));
    bindCards(grid);

    refresh();
  }

  // ================= DETAIL =================
  function renderDetail() {
    const root = document.getElementById("detail");
    if (!root) return;
    const id = +new URLSearchParams(location.search).get("id");
    const a  = DATA.agents.find(x => x.id === id);
    if (!a) {
      root.innerHTML = `<p style="padding:60px 0;text-align:center;color:var(--muted)">${t("notfound")}<br><a href="agents.html" style="color:var(--red)">${t("notfound_link")}</a></p>`;
      return;
    }
    document.title = `${a.title} — AI Assets for HMAX`;

    const imgHTML = a.images && a.images[0]
      ? `<img src="${safeUrl(a.images[0])}" alt="" loading="eager">`
      : `<div class="dtl-img-placeholder">${catGlyph(a.category)}</div>`;

    const capsHTML = a.capabilities && a.capabilities.length
      ? `<div class="dtl-caps">${a.capabilities.map(c => `<span class="dtl-cap">${esc(c)}</span>`).join("")}</div>`
      : "";

    const badgesHTML = [
      a.status     ? `<span class="dtl-badge dtl-badge-status">${esc(a.status)}</span>` : "",
      a.accessType ? `<span class="dtl-badge dtl-badge-access">${esc(a.accessType)}</span>` : "",
    ].join("");

    const modsHTML = a.moderators && a.moderators.length
      ? `<section class="dtl-mods-section">
          <h2 class="dtl-section-label">モデレーター</h2>
          <ul class="dtl-mods">${a.moderators.map(m => `
            <li class="dtl-mod">
              <span class="dtl-mod-name">${esc(m.name)}</span>
              <a class="dtl-mod-email" href="mailto:${esc(m.email)}">${esc(m.email)}</a>
            </li>`).join("")}
          </ul>
        </section>`
      : "";

    const termsHTML = a.termsUrl
      ? `<a class="dtl-terms" href="${safeUrl(a.termsUrl)}" target="_blank" rel="noopener">
           ${esc(a.termsTitle || "利用規約を見る")} →
         </a>`
      : "";

    root.innerHTML = `
      <a class="detail-back" href="agents.html">${t("detail_back")}</a>

      <div class="dtl-hero">
        <div class="dtl-img">${imgHTML}</div>
        <div class="dtl-info">
          <div class="dtl-eyebrow">
            <a class="dtl-cat-link" href="agents.html?cat=${encodeURIComponent(a.category)}"><span class="gl">${catGlyph(a.category)}</span>${esc(catName(a.category))}</a>
            <span>·</span><span>№${a.id}</span>
            ${a.pick ? `<span class="dtl-pick">· ${t("pick_badge")}</span>` : ""}
          </div>
          <h1 class="dtl-title">${esc(a.title)}</h1>

          ${badgesHTML ? `<div class="dtl-status-row">${badgesHTML}</div>` : ""}
          ${capsHTML}

          <div class="dtl-stats">
            <div class="dtl-stat"><span class="dtl-stat-n">${fmt(a.views)}</span><span class="dtl-stat-l">${t("dtl_reuse")}</span></div>
            <div class="dtl-stat"><span class="dtl-stat-n">${fmt(a.uniqueViews)}</span><span class="dtl-stat-l">${t("dtl_uniq")}</span></div>
            <div class="dtl-stat"><span class="dtl-stat-n">${fmt(a.downloads)}</span><span class="dtl-stat-l">${t("dtl_dl")}</span></div>
            <div class="dtl-stat"><span class="dtl-stat-n">${fmt(a.likes)}</span><span class="dtl-stat-l">${t("dtl_likes")}</span></div>
            <div class="dtl-stat"><span class="dtl-stat-n">${fmt(a.comments)}</span><span class="dtl-stat-l">コメント</span></div>
          </div>

          <dl class="dtl-meta">
            <div>
              <dt>${t("fld_owner")}</dt>
              <dd>${esc(a.owner||"—")}${a.ownerRole ? `<span class="dtl-role">${esc(a.ownerRole)}</span>` : ""}</dd>
            </div>
            ${a.ownerEmail ? `<div><dt>連絡先</dt><dd><a class="dtl-email" href="mailto:${esc(a.ownerEmail)}">${esc(a.ownerEmail)}</a></dd></div>` : ""}
            <div><dt>${t("fld_pubdate")}</dt><dd>${fmtDate(a.published)}</dd></div>
            <div><dt>${t("fld_assetid")}</dt><dd>#${a.id}</dd></div>
          </dl>

          ${termsHTML}
        </div>
      </div>

      <section class="dtl-body">
        <h2 class="dtl-section-label">概要</h2>
        <div class="dtl-overview">${a.overview || `<p style="color:var(--muted)">—</p>`}</div>
        ${modsHTML}
      </section>`;

    bindDetailSlider(root);


  }

  // ================= CHAT POD =================
  function initChatPod() {
    if (document.getElementById("chat-fab")) return;
    const css = `
      .chat-fab{position:fixed;right:22px;bottom:22px;z-index:300;width:54px;height:54px;border-radius:50%;
        background:var(--ink);color:var(--paper-2);border:none;cursor:pointer;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 8px 28px -8px rgba(27,22,19,.55);
        transform:translateY(80px);opacity:0;
        transition:transform .4s cubic-bezier(.2,.7,.2,1),opacity .4s,background .2s;}
      .chat-fab.show{transform:none;opacity:1;}
      .chat-fab:hover{background:var(--red);}
      .chat-overlay{position:fixed;inset:0;z-index:319;background:transparent;pointer-events:none;}
      .chat-overlay.open{pointer-events:auto;}
      .chat-panel{position:fixed;right:22px;bottom:84px;
        width:min(380px,calc(100vw - 44px));max-height:min(580px,calc(100vh - 110px));
        z-index:320;border-radius:20px;overflow:hidden;
        background:var(--paper-2,#fff);display:flex;flex-direction:column;
        box-shadow:0 28px 64px -12px rgba(27,22,19,.28),0 0 0 1px rgba(27,22,19,.1);
        opacity:0;pointer-events:none;transform-origin:bottom right;
        transform:scale(0.93) translateY(12px);
        transition:transform .32s cubic-bezier(.2,.7,.2,1),opacity .24s;}
      .chat-panel.open{opacity:1;pointer-events:auto;transform:scale(1) translateY(0);}
      .chat-head{padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-shrink:0;background:var(--ink);}
      .chat-head-info{display:flex;align-items:center;gap:11px;}
      .chat-head-icon{width:34px;height:34px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
      .chat-head h3{font-size:14px;font-weight:700;color:var(--paper-2);margin:0;}
      .chat-head-sub{font-family:var(--mono);font-size:9.5px;color:var(--muted-2);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;}
      .chat-close{border:none;background:none;font-size:22px;line-height:1;color:var(--muted-2);cursor:pointer;padding:2px;transition:color .2s;}
      .chat-close:hover{color:var(--paper-2);}
      .chat-msgs{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px;}
      .msg{display:flex;gap:9px;}
      .msg.user{flex-direction:row-reverse;}
      .msg-avatar{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;margin-top:2px;background:var(--red);color:#fff;font-weight:700;}
      .msg.user .msg-avatar{background:var(--ink);}
      .msg-bubble{max-width:82%;padding:10px 13px;border-radius:12px;font-size:13.5px;line-height:1.65;color:var(--ink);background:var(--paper-card);border:1px solid var(--line);}
      .msg.user .msg-bubble{background:var(--ink);color:var(--paper-2);border-color:var(--ink);border-radius:12px 2px 12px 12px;}
      .msg:not(.user) .msg-bubble{border-radius:2px 12px 12px 12px;}
      .chat-result-card{background:var(--paper);border:1px solid var(--line);border-radius:6px;padding:11px 13px;margin-top:8px;transition:border-color .2s,transform .2s;}
      .chat-result-card:hover{border-color:var(--red);transform:translateX(3px);}
      .chat-result-cat{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--red);margin-bottom:4px;}
      .chat-result-title{font-weight:700;font-size:13px;color:var(--ink);margin-bottom:7px;line-height:1.35;}
      .chat-result-meta{display:flex;gap:10px;font-family:var(--mono);font-size:10px;color:var(--muted);align-items:center;}
      .chat-result-link{margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--red);text-decoration:none;}
      .chat-result-link:hover{text-decoration:underline;}
      .chat-suggestions{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
      .chat-sug{font-size:12px;color:var(--ink-soft);background:var(--paper);border:1px solid var(--line);padding:4px 11px;border-radius:100px;cursor:pointer;transition:border-color .15s,color .15s;}
      .chat-sug:hover{border-color:var(--red);color:var(--red);}
      .chat-typing{display:flex;gap:5px;align-items:center;padding:3px 0;}
      .chat-dot{width:7px;height:7px;border-radius:50%;background:var(--muted-2);animation:dot-b 1.2s ease-in-out infinite;}
      .chat-dot:nth-child(2){animation-delay:.18s;}
      .chat-dot:nth-child(3){animation-delay:.36s;}
      @keyframes dot-b{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
      .chat-input-area{padding:12px 14px;border-top:1px solid var(--line);flex-shrink:0;background:var(--paper-2);}
      .chat-input-row{display:flex;gap:8px;align-items:flex-end;}
      .chat-input{flex:1;font-family:var(--sans);font-size:13px;color:var(--ink);padding:9px 14px;border:1px solid var(--line);border-radius:100px;background:var(--paper-card);outline:none;resize:none;transition:border-color .2s;min-height:38px;max-height:110px;line-height:1.5;}
      .chat-input:focus{border-color:var(--red);}
      .chat-send{width:38px;height:38px;border-radius:50%;border:none;background:var(--red);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .15s;}
      .chat-send:hover{background:var(--red-deep);transform:scale(1.06);}
      .chat-send:disabled{background:var(--muted-2);cursor:default;transform:none;}`;

    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    const btn = document.createElement("button");
    btn.id = "chat-fab"; btn.className = "chat-fab"; btn.type = "button";
    btn.setAttribute("aria-label", t("chat_open_label"));
    btn.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22"><path d="M9.5 1.5c-.1 2.8-1 5.2-2.8 7S2 11.4 1 11.5c2.8.1 5.2 1 7 2.8s2.7 4.2 2.8 5.7c.1-2.8 1-5.2 2.8-7s4.7-2.7 5.7-2.8c-2.8-.1-5.2-1-7-2.8S9.6 3 9.5 1.5z"/></svg>`;
    const ov = document.createElement("div"); ov.className = "chat-overlay";
    const panel = document.createElement("aside");
    panel.className = "chat-panel"; panel.setAttribute("role","dialog");
    panel.innerHTML = `
      <div class="chat-head">
        <div class="chat-head-info">
          <div class="chat-head-icon">✦</div>
          <div><h3>${t("chat_name")}</h3><div class="chat-head-sub">${t("chat_sub")}</div></div>
        </div>
        <button class="chat-close" type="button">×</button>
      </div>
      <div class="chat-msgs" id="chat-msgs"></div>
      <div class="chat-input-area">
        <div class="chat-input-row">
          <textarea class="chat-input" id="chat-input" placeholder="${t("chat_ph")}" rows="1"></textarea>
          <button class="chat-send" id="chat-send" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>`;
    document.body.append(btn, ov, panel);

    const msgs    = document.getElementById("chat-msgs");
    const input   = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    const openPanel  = () => { ov.classList.add("open"); panel.classList.add("open"); input.focus(); };
    const closePanel = () => { ov.classList.remove("open"); panel.classList.remove("open"); };
    btn.addEventListener("click", openPanel);
    ov.addEventListener("click", closePanel);
    panel.querySelector(".chat-close").addEventListener("click", closePanel);

    function addMsg(html, isUser=false) {
      const div = document.createElement("div");
      div.className = `msg${isUser?" user":""}`;
      div.innerHTML = `<div class="msg-avatar">${isUser?"人":"✦"}</div><div class="msg-bubble">${html}</div>`;
      msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight; return div;
    }
    function addTyping() {
      const div = document.createElement("div"); div.className = "msg";
      div.innerHTML = `<div class="msg-avatar">✦</div><div class="msg-bubble"><div class="chat-typing"><div class="chat-dot"></div><div class="chat-dot"></div><div class="chat-dot"></div></div></div>`;
      msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight; return div;
    }

    function searchAgents(query) {
      const q = query.toLowerCase().trim();
      const baseTokens = q.split(/[\s　]+/).filter(Boolean);
      if (!baseTokens.length) return [];
      const tokens = expandFilterTokens(baseTokens);
      return DATA.agents.map(a => {
        let score = 0;
        const ti = a.title.toLowerCase();
        const d  = (a.description||"").toLowerCase();
        const catTitle = catName(a.category).toLowerCase();
        // 元のトークンは高スコア、同義語展開トークンは低スコア
        baseTokens.forEach(tok => {
          if (ti.includes(tok)) score += 4;
          if (d.includes(tok))  score += 1.5;
          if (catTitle.includes(tok)) score += 2;
        });
        const synTokens = tokens.filter(t => !baseTokens.includes(t));
        synTokens.forEach(tok => {
          if (ti.includes(tok)) score += 1.5;
          if (d.includes(tok))  score += 0.5;
          if (catTitle.includes(tok)) score += 0.8;
        });
        if (a.pick) score *= 1.2;
        return {a, score};
      }).filter(({score}) => score > 0)
        .sort((x,y) => y.score - x.score).slice(0,3).map(({a}) => a);
    }
    function resultHTML(agents) {
      if (!agents.length) return `<p style="color:var(--muted);font-size:13px;line-height:1.6">${t("chat_noresult")}</p>`;
      return agents.map(a => `
        <div class="chat-result-card">
          <div class="chat-result-cat">${catGlyph(a.category)} ${esc(catName(a.category))}</div>
          <div class="chat-result-title">${esc(a.title)}</div>
          <div class="chat-result-meta">
            <span>${fmt(a.views)} ${t("chat_reuse")}</span>
            <a class="chat-result-link" href="${window.AGENT_PAGE ?? "agent.html"}?id=${a.id}">${t("chat_detail_link")}</a>
          </div>
        </div>`).join("");
    }
    function handleSend() {
      const q = input.value.trim(); if (!q) return;
      addMsg(esc(q), true); input.value = ""; input.style.height = "auto"; sendBtn.disabled = true;
      const typing = addTyping();
      setTimeout(() => {
        typing.remove();
        const results = searchAgents(q);
        addMsg(results.length
          ? `<p style="margin-bottom:2px;font-size:13px"><b>${results.length}</b> ${t("chat_found")}</p>${resultHTML(results)}`
          : resultHTML([]));
        sendBtn.disabled = false; input.focus();
      }, 500 + Math.random()*400);
    }
    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", e => { if (e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSend();} });
    input.addEventListener("input", () => { input.style.height="auto"; input.style.height=Math.min(input.scrollHeight,110)+"px"; });
    msgs.addEventListener("click", e => { const sug=e.target.closest(".chat-sug"); if(sug){input.value=sug.textContent;handleSend();} });

    const sugs = t("chat_sugs");
    addMsg(`${t("chat_hello")}<div class="chat-suggestions">${sugs.map(s=>`<button class="chat-sug" type="button">${s}</button>`).join("")}</div>`);

    let shown = false;
    const reveal = () => { if(shown)return; shown=true; btn.classList.add("show"); };
    setTimeout(reveal, 2500);
    window.addEventListener("scroll", () => { if(window.scrollY>200)reveal(); }, {passive:true});
  }

  // ================= LANG SWITCH =================
  function initLangSwitch() {
    if (document.getElementById("lang-switch")) return;
    const nav = document.querySelector(".site-head .nav"); if (!nav) return;
    const st = document.createElement("style");
    st.textContent = `.lang-switch{display:flex;align-items:center;gap:0;margin-left:10px;padding-left:14px;border-left:1px solid var(--line-strong);flex-shrink:0;}.lang-btn{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:pointer;padding:3px 6px;line-height:1;transition:color .18s;}.lang-btn.active{color:var(--ink);font-weight:700;}.lang-btn:hover:not(.active){color:var(--red);}.lang-sep{font-size:10px;color:var(--line-strong);pointer-events:none;user-select:none;line-height:1;padding:0 1px;}`;
    document.head.appendChild(st);
    const sw = document.createElement("div");
    sw.id = "lang-switch"; sw.className = "lang-switch";
    sw.innerHTML = `<button class="lang-btn" data-l="ja" type="button">JA</button><span class="lang-sep">/</span><button class="lang-btn" data-l="en" type="button">EN</button>`;
    nav.appendChild(sw);
    sw.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.l===_lang));
    sw.addEventListener("click", e => {
      const b = e.target.closest("[data-l]"); if (!b||b.dataset.l===_lang) return;
      _lang = b.dataset.l;
      if (typeof localStorage!=="undefined") localStorage.setItem("aa4h_lang", _lang);
      location.reload();
    });
  }

  // ---- boot ----
  document.addEventListener("DOMContentLoaded", async () => {
    applyI18n();

    let raw;
    if (typeof AA4H_API_ENABLED !== "undefined" && AA4H_API_ENABLED) {
      try {
        raw = await AA4HAPI.fetchAssets();
      } catch (e) {
        console.error("fetchAssets failed:", e);
        return;
      }
    } else {
      if (!window.ASSETS_DATA) { console.error("ASSETS_DATA not loaded"); return; }
      raw = window.ASSETS_DATA;
    }

    DATA = transformData(raw);
    CATS = DATA.categories;
    CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]));
    if (document.body.dataset.page === "home")   renderHome();
    if (document.body.dataset.page === "list")   renderList();
    if (document.body.dataset.page === "detail") renderDetail();
    initChatPod();
    initLangSwitch();
  });
})();
