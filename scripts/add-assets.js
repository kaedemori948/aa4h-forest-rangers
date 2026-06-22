"use strict";
const fs   = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/test.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const TYPES = [
  { id: 101, title: "資料・文書作成" },
  { id: 102, title: "開発・コード支援" },
  { id: 103, title: "データ分析・診断" },
  { id: 104, title: "情報収集・調査" },
  { id: 105, title: "営業・顧客対応" },
  { id: 106, title: "レビュー・チェック" },
  { id: 107, title: "テスト・品質保証" },
  { id: 108, title: "サービス・プロダクト" },
  { id: 109, title: "ナレッジ・業務支援" },
];

const CAPS = [
  { id: 201, c_name: "doc-gen",        title: "Document Generation",  ja: "文書生成" },
  { id: 202, c_name: "code-assist",    title: "Code Assistance",      ja: "コード支援" },
  { id: 203, c_name: "data-analysis",  title: "Data Analysis",        ja: "データ分析" },
  { id: 204, c_name: "info-gather",    title: "Info Gathering",       ja: "情報収集" },
  { id: 205, c_name: "sales-support",  title: "Sales Support",        ja: "営業支援" },
  { id: 206, c_name: "review-check",   title: "Review & Check",       ja: "レビュー" },
  { id: 207, c_name: "test-auto",      title: "Test Automation",      ja: "テスト自動化" },
  { id: 208, c_name: "product-mgmt",   title: "Product Management",   ja: "プロダクト管理" },
  { id: 209, c_name: "knowledge-mgmt", title: "Knowledge Management", ja: "ナレッジ管理" },
];

const OWNERS = [
  { id: 2001, full_name: "Hiroshi Sato",   email: "hiroshi.sato@corporate.com",   role: "Director" },
  { id: 2002, full_name: "Akiko Yamamoto", email: "akiko.yamamoto@corporate.com", role: "Lead" },
  { id: 2003, full_name: "Kenji Tanaka",   email: "kenji.tanaka@corporate.com",   role: "Manager" },
  { id: 2004, full_name: "Yuki Nakamura",  email: "yuki.nakamura@corporate.com",  role: "Lead" },
  { id: 2005, full_name: "Ryo Suzuki",     email: "ryo.suzuki@corporate.com",     role: "Director" },
  { id: 2006, full_name: "Mina Watanabe",  email: "mina.watanabe@corporate.com",  role: "Manager" },
  { id: 2007, full_name: "Takashi Ito",    email: "takashi.ito@corporate.com",    role: "Lead" },
  { id: 2008, full_name: "Emi Kobayashi",  email: "emi.kobayashi@corporate.com",  role: "Director" },
];

const DATES = [
  "2026-06-19T00:00:00.000Z", "2026-06-10T00:00:00.000Z",
  "2026-05-28T00:00:00.000Z", "2026-05-15T00:00:00.000Z",
  "2026-04-22T00:00:00.000Z", "2026-03-30T00:00:00.000Z",
  "2026-03-10T00:00:00.000Z", "2026-02-20T00:00:00.000Z",
  "2026-01-15T00:00:00.000Z", "2025-12-20T00:00:00.000Z",
  "2025-11-30T00:00:00.000Z", "2025-10-25T00:00:00.000Z",
];

// 70件の新規アセット定義
const NEW_ASSETS = [
  // 資料・文書作成 (101) × 10
  { id:8051, title:"週報自動生成AI",                   typeId:101, capId:201, tags:["テンプレート"],                        views:312, dl:88,  likes:14, comments:3  },
  { id:8052, title:"社内報ドラフトAI",                  typeId:101, capId:201, tags:["テンプレート"],                        views:198, dl:55,  likes:8,  comments:1  },
  { id:8053, title:"RFP自動作成支援ツール",             typeId:101, capId:201, tags:["テンプレート"],                        views:445, dl:131, likes:22, comments:5  },
  { id:8054, title:"議事録要約・配信AI",                typeId:101, capId:201, tags:["自動通知","Outlook連携"],              views:509, dl:178, likes:31, comments:8  },
  { id:8055, title:"契約書レビュー補助AI",              typeId:101, capId:206, tags:["テンプレート"],                        views:287, dl:74,  likes:11, comments:2  },
  { id:7056, title:"プレスリリーステンプレ",            typeId:101, capId:201, tags:["テンプレート"],                        views:143, dl:39,  likes:4,  comments:0  },
  { id:7058, title:"製品マニュアルテンプレ",            typeId:101, capId:201, tags:["テンプレート","ノーコード"],           views:89,  dl:21,  likes:2,  comments:0  },
  { id:8056, title:"プロジェクト計画書生成AI",          typeId:101, capId:201, tags:["テンプレート"],                        views:376, dl:102, likes:18, comments:4  },
  { id:8057, title:"採用JD自動生成ツール",              typeId:101, capId:201, tags:["テンプレート"],                        views:264, dl:61,  likes:9,  comments:1  },
  { id:7060, title:"SOP文書テンプレート集",             typeId:101, capId:201, tags:["テンプレート","ノーコード"],           views:112, dl:28,  likes:3,  comments:0  },

  // 開発・コード支援 (102) × 8
  { id:8058, title:"依存関係可視化ツール",              typeId:102, capId:202, tags:["CI/CD対応","API連携"],                 views:521, dl:189, likes:37, comments:9  },
  { id:8059, title:"ドキュメントコメント生成AI",        typeId:102, capId:202, tags:["CI/CD対応"],                          views:398, dl:143, likes:26, comments:6  },
  { id:8060, title:"コードカバレッジ分析AI",            typeId:102, capId:207, tags:["CI/CD対応"],                          views:312, dl:88,  likes:15, comments:3  },
  { id:8061, title:"リリースノート生成AI",              typeId:102, capId:202, tags:["CI/CD対応","自動通知"],               views:276, dl:71,  likes:12, comments:2  },
  { id:8062, title:"技術負債検出アシスタント",          typeId:102, capId:202, tags:["CI/CD対応"],                          views:445, dl:158, likes:29, comments:7  },
  { id:8063, title:"マイグレーションスクリプト生成AI",  typeId:102, capId:202, tags:["API連携"],                            views:187, dl:48,  likes:7,  comments:1  },
  { id:8064, title:"Dockerfileテンプレ生成AI",         typeId:102, capId:202, tags:["CI/CD対応","ノーコード"],              views:334, dl:97,  likes:16, comments:3  },
  { id:7062, title:"APIサンプルコード集",               typeId:102, capId:202, tags:["API連携","テンプレート"],              views:156, dl:44,  likes:5,  comments:0  },

  // データ分析・診断 (103) × 9
  { id:8065, title:"在庫最適化分析AI",                  typeId:103, capId:203, tags:["ダッシュボード","Excel対応"],          views:489, dl:167, likes:33, comments:8  },
  { id:8066, title:"離職予測モデルAI",                  typeId:103, capId:203, tags:["ダッシュボード"],                      views:367, dl:112, likes:21, comments:5  },
  { id:8067, title:"NPS分析自動化AI",                   typeId:103, capId:203, tags:["ダッシュボード","Excel対応"],          views:298, dl:82,  likes:14, comments:3  },
  { id:8068, title:"A/Bテスト結果解釈AI",               typeId:103, capId:203, tags:["ダッシュボード"],                      views:412, dl:138, likes:24, comments:6  },
  { id:8069, title:"予算差異分析ボット",                typeId:103, capId:203, tags:["Excel対応","自動通知"],               views:243, dl:63,  likes:9,  comments:2  },
  { id:7064, title:"BIレポートテンプレート",            typeId:103, capId:203, tags:["Excel対応","テンプレート","ダッシュボード"], views:178, dl:51, likes:6, comments:1 },
  { id:8070, title:"購買パターン分析AI",                typeId:103, capId:203, tags:["ダッシュボード"],                      views:534, dl:201, likes:41, comments:10 },
  { id:8071, title:"エネルギー消費最適化AI",            typeId:103, capId:203, tags:["ダッシュボード","自動通知"],           views:211, dl:57,  likes:8,  comments:2  },
  { id:8072, title:"サプライチェーンリスク診断",        typeId:103, capId:203, tags:["自動通知"],                            views:376, dl:121, likes:19, comments:4  },

  // 情報収集・調査 (104) × 7
  { id:8073, title:"特許情報収集ボット",                typeId:104, capId:204, tags:["自動通知","API連携"],                  views:287, dl:79,  likes:11, comments:2  },
  { id:8074, title:"SNSモニタリングAI",                 typeId:104, capId:204, tags:["自動通知","チャットBot"],              views:456, dl:163, likes:28, comments:7  },
  { id:8075, title:"求人市場調査Bot",                   typeId:104, capId:204, tags:["自動通知"],                            views:198, dl:52,  likes:6,  comments:1  },
  { id:8076, title:"論文サマリーAI",                    typeId:104, capId:204, tags:["API連携"],                             views:334, dl:99,  likes:17, comments:4  },
  { id:8077, title:"価格比較収集ボット",                typeId:104, capId:204, tags:["自動通知","API連携"],                  views:412, dl:147, likes:23, comments:5  },
  { id:7066, title:"業界レポートテンプレ",              typeId:104, capId:204, tags:["テンプレート"],                        views:134, dl:36,  likes:3,  comments:0  },
  { id:8078, title:"規格・標準改訂ウォッチャー",        typeId:104, capId:204, tags:["自動通知"],                            views:245, dl:66,  likes:9,  comments:2  },

  // 営業・顧客対応 (105) × 9
  { id:8079, title:"見積書自動生成AI",                  typeId:105, capId:205, tags:["CRM連携","テンプレート"],              views:489, dl:176, likes:34, comments:8  },
  { id:8080, title:"顧客対応スクリプトAI",              typeId:105, capId:205, tags:["CRM連携","チャットBot"],               views:367, dl:121, likes:22, comments:5  },
  { id:8081, title:"解約防止シグナル検知AI",            typeId:105, capId:205, tags:["CRM連携","自動通知"],                  views:534, dl:198, likes:42, comments:11 },
  { id:8082, title:"アップセル推薦エンジン",            typeId:105, capId:205, tags:["CRM連携","API連携"],                   views:423, dl:152, likes:27, comments:6  },
  { id:8083, title:"オンボーディング自動化AI",          typeId:105, capId:205, tags:["CRM連携","Outlook連携"],               views:312, dl:89,  likes:15, comments:3  },
  { id:8084, title:"クレーム要因分析AI",                typeId:105, capId:205, tags:["CRM連携"],                             views:276, dl:73,  likes:11, comments:2  },
  { id:8085, title:"SLA遵守状況モニター",               typeId:105, capId:205, tags:["CRM連携","自動通知","ダッシュボード"], views:198, dl:54,  likes:7,  comments:1  },
  { id:8086, title:"競合比較マトリクス生成AI",          typeId:105, capId:205, tags:["テンプレート"],                        views:345, dl:103, likes:18, comments:4  },
  { id:7068, title:"提案資料テンプレート（英語版）",    typeId:105, capId:205, tags:["テンプレート"],                        views:167, dl:47,  likes:5,  comments:0  },

  // レビュー・チェック (106) × 6
  { id:8087, title:"財務諸表異常検知AI",                typeId:106, capId:206, tags:["自動通知","ダッシュボード"],           views:412, dl:141, likes:24, comments:6  },
  { id:8088, title:"コンプライアンス文書チェッカー",    typeId:106, capId:206, tags:["自動通知"],                            views:356, dl:108, likes:19, comments:4  },
  { id:8089, title:"翻訳品質チェックAI",                typeId:106, capId:206, tags:[],                                     views:234, dl:62,  likes:8,  comments:2  },
  { id:8090, title:"アクセシビリティ検査Bot",           typeId:106, capId:206, tags:["CI/CD対応","ノーコード"],              views:289, dl:77,  likes:12, comments:3  },
  { id:8091, title:"個人情報マスキングAI",              typeId:106, capId:206, tags:["CI/CD対応"],                          views:478, dl:169, likes:31, comments:7  },
  { id:7070, title:"チェックリストテンプレート集",      typeId:106, capId:206, tags:["テンプレート"],                        views:143, dl:39,  likes:4,  comments:0  },

  // テスト・品質保証 (107) × 6
  { id:8092, title:"APIテスト自動生成AI",               typeId:107, capId:207, tags:["CI/CD対応","API連携"],                 views:489, dl:175, likes:35, comments:9  },
  { id:8093, title:"負荷テストシナリオ生成AI",          typeId:107, capId:207, tags:["CI/CD対応"],                          views:334, dl:97,  likes:16, comments:3  },
  { id:8094, title:"モバイルUI自動テストBot",           typeId:107, capId:207, tags:["CI/CD対応","ノーコード"],              views:267, dl:70,  likes:10, comments:2  },
  { id:8095, title:"テストデータ生成AI",                typeId:107, capId:207, tags:["CI/CD対応"],                          views:412, dl:144, likes:22, comments:5  },
  { id:8096, title:"障害再現シナリオ分析AI",            typeId:107, capId:207, tags:["自動通知"],                            views:356, dl:111, likes:18, comments:4  },
  { id:7072, title:"テスト計画テンプレート",            typeId:107, capId:207, tags:["テンプレート","CI/CD対応"],            views:123, dl:34,  likes:3,  comments:0  },

  // サービス・プロダクト (108) × 8
  { id:8097, title:"ユーザーストーリー生成AI",          typeId:108, capId:208, tags:["テンプレート"],                        views:445, dl:158, likes:27, comments:7  },
  { id:8098, title:"プロダクトバックログ整理AI",        typeId:108, capId:208, tags:["ノーコード"],                          views:312, dl:91,  likes:15, comments:3  },
  { id:8099, title:"KPI設定支援AI",                    typeId:108, capId:208, tags:["ダッシュボード"],                       views:534, dl:196, likes:40, comments:10 },
  { id:8100, title:"競合製品ベンチマークBot",           typeId:108, capId:208, tags:["API連携","自動通知"],                  views:378, dl:124, likes:21, comments:5  },
  { id:8101, title:"ユーザーインタビュー分析AI",        typeId:108, capId:208, tags:["ノーコード"],                          views:256, dl:68,  likes:9,  comments:2  },
  { id:8102, title:"製品ロードマップ可視化AI",          typeId:108, capId:208, tags:["ダッシュボード","ノーコード"],         views:423, dl:151, likes:26, comments:6  },
  { id:8103, title:"チャーン率予測AI",                  typeId:108, capId:208, tags:["ダッシュボード","CRM連携"],            views:489, dl:178, likes:33, comments:8  },
  { id:7074, title:"プロダクト仕様テンプレート",        typeId:108, capId:208, tags:["テンプレート"],                        views:134, dl:37,  likes:4,  comments:0  },

  // ナレッジ・業務支援 (109) × 7
  { id:8104, title:"社内手続きガイドBot",               typeId:109, capId:209, tags:["チャットBot","ノーコード"],            views:512, dl:183, likes:38, comments:9  },
  { id:8105, title:"新人研修コンテンツ生成AI",          typeId:109, capId:209, tags:["テンプレート","ノーコード"],          views:356, dl:108, likes:19, comments:4  },
  { id:8106, title:"社内翻訳・ローカライズAI",          typeId:109, capId:209, tags:[],                                     views:289, dl:79,  likes:12, comments:3  },
  { id:8107, title:"業務自動化フロー設計AI",            typeId:109, capId:209, tags:["ノーコード","API連携"],               views:478, dl:171, likes:32, comments:8  },
  { id:8108, title:"ナレッジベース自動更新Bot",         typeId:109, capId:209, tags:["チャットBot","自動通知"],             views:334, dl:99,  likes:16, comments:4  },
  { id:8109, title:"社内問い合わせトリアージAI",        typeId:109, capId:209, tags:["チャットBot","自動通知"],             views:412, dl:143, likes:23, comments:5  },
  { id:7076, title:"業務マニュアルテンプレート集",      typeId:109, capId:209, tags:["テンプレート","ノーコード"],          views:145, dl:41,  likes:5,  comments:0  },
];

function pickDate(id) { return DATES[id % DATES.length]; }

function makeOwner(ownerDef, mapId) {
  return {
    mapping_id: mapId,
    ownership_type: ownerDef.role,
    is_owner: 1,
    id: ownerDef.id,
    full_name: ownerDef.full_name,
    email_id: ownerDef.email,
    inactive: false,
    is_verified: true,
  };
}

function makeCap(capDef, mapId) {
  return {
    id: capDef.id,
    c_name: capDef.c_name,
    title: capDef.title,
    is_exclusive: false,
    is_featured: false,
    capability_type: { id: 38, c_name: "technology", title: "Technology" },
    sub_capabilities: [],
    sub_capabilities_count: 0,
    translations: [{ id: capDef.id, capability_id: capDef.id, title: capDef.ja, language_code: "ja" }],
    parent: null,
    mapping_id: mapId,
  };
}

function makeType(typeDef) {
  return {
    id: typeDef.id,
    title: typeDef.title,
    c_name: typeDef.title.toLowerCase().replace(/[・\s]/g, "-"),
    download_term_condition_url: null,
    download_term_condition_title: null,
  };
}

function makeOverview(title, typeTitle) {
  return `<p>${title}は、${typeTitle}領域における業務効率化を支援するAIアセットです。<br>[課題] 担当者ごとに作業品質にばらつきがあり、手作業によるミスや工数超過が発生していました。<br>[解決策] ${title}を活用することで、処理の自動化・標準化が実現し、作業時間を大幅に削減。チーム全体の生産性向上に貢献します。</p>`;
}

const existingIds = new Set(data.assets.map(a => a.id));
let ownerIdx = 0;

const newAssets = NEW_ASSETS
  .filter(a => !existingIds.has(a.id))
  .map((a, i) => {
    const typeDef = TYPES.find(t => t.id === a.typeId);
    const capDef  = CAPS.find(c => c.id === a.capId);
    const owner   = OWNERS[ownerIdx++ % OWNERS.length];
    const mod     = OWNERS[(ownerIdx + 2) % OWNERS.length];

    return {
      id: a.id,
      original_asset_id: a.id,
      version_number: 1,
      title: a.title,
      tag_line: `${typeDef.title}向けAIアセット`,
      overview: makeOverview(a.title, typeDef.title),
      contact_email_id: owner.email,
      preview_gallery_id: null,
      preview_url: null,
      type: makeType(typeDef),
      status: { id: 4, c_name: "published", title: "Published" },
      access_type: { id: 2, c_name: "everyone", title: "Everyone" },
      people: [],
      last_updated_at: pickDate(a.id),
      communities: [],
      languages: [],
      active_versions: [],
      versions: [],
      entities: [],
      locations: [],
      owners: [makeOwner(owner, 90000 + i)],
      creator: null,
      moderators: [{ full_name: mod.full_name, email_id: mod.email, mapping_id: 91000 + i }],
      capabilities: [makeCap(capDef, 80000 + i)],
      tags: a.tags || [],
      stats: {
        view_count:        a.views,
        download_count:    a.dl,
        unique_view_count: Math.floor(a.views * 0.65),
        like_count:        a.likes,
        comment_count:     a.comments,
      },
      variants: [],
      is_locked: false,
    };
  });

console.log(`Adding ${newAssets.length} assets (${NEW_ASSETS.length - newAssets.length} skipped as duplicate)`);

data.assets.push(...newAssets);
data.assets.sort((a, b) => a.id - b.id);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), "utf8");

const jsPath = path.join(__dirname, "../data/test.js");
fs.writeFileSync(jsPath, "window.ASSETS_DATA = " + JSON.stringify(data) + ";", "utf8");

console.log(`Total assets: ${data.assets.length}`);
console.log("Done.");
