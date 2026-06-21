const fs = require('fs');
const path = require('path');
const json = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/test.json'), 'utf8'));

const TARGET = 80;
const current = json.assets.length;
const toAdd = TARGET - current;
console.log(`Current: ${current}, adding: ${toAdd}`);

const owners = [
  { full_name: 'Yuki Tanaka',    email_id: 'yuki.tanaka@corporate.com',    ownership_type: 'Manager'  },
  { full_name: 'Hiroshi Sato',   email_id: 'hiroshi.sato@corporate.com',   ownership_type: 'Director' },
  { full_name: 'Akiko Yamamoto', email_id: 'akiko.yamamoto@corporate.com', ownership_type: 'Lead'     },
  { full_name: 'Kenji Nakamura', email_id: 'kenji.nakamura@corporate.com', ownership_type: 'Manager'  },
  { full_name: 'Mio Kobayashi',  email_id: 'mio.kobayashi@corporate.com',  ownership_type: 'Director' },
  { full_name: 'Ryo Watanabe',   email_id: 'ryo.watanabe@corporate.com',   ownership_type: 'Lead'     },
  { full_name: 'Nana Ito',       email_id: 'nana.ito@corporate.com',       ownership_type: 'Manager'  },
  { full_name: 'Takeshi Suzuki', email_id: 'takeshi.suzuki@corporate.com', ownership_type: 'Director' },
];

const moderators = [
  { full_name: '山田 花子 / YAMADA，HANAKO',     email_id: 'hanako.yamada@corporate.com'        },
  { full_name: '佐藤 誠 / SATO，MAKOTO',         email_id: 'makoto.sato@corporate.com'          },
  { full_name: '中村 優子 / NAKAMURA，YUKO',     email_id: 'yuko.nakamura@corporate.com'        },
  { full_name: '鈴木 大介 / SUZUKI，DAISUKE',    email_id: 'daisuke.suzuki@corporate.com'       },
  { full_name: '田中 美咲 / TANAKA，MISAKI',     email_id: 'misaki.tanaka@corporate.com'        },
  { full_name: 'AIAgentForDevelopers［業務ＩＤ］ / AIAssetsforAIAG，GYOUMU', email_id: 'aiassetsforAIAG@sub.corporate.co.jp' },
];

const types = [
  { id: 201, title: '資料・文書作成',     capId: 201, capName: 'doc-gen',       capEn: 'Document Generation',  capJa: '文書生成'     },
  { id: 202, title: '開発・コード支援',   capId: 202, capName: 'code-assist',   capEn: 'Code Assistance',      capJa: 'コード支援'    },
  { id: 203, title: 'データ分析・診断',   capId: 203, capName: 'data-analysis', capEn: 'Data Analysis',        capJa: 'データ分析'    },
  { id: 204, title: '情報収集・調査',     capId: 204, capName: 'research',      capEn: 'Research',             capJa: '情報収集'     },
  { id: 205, title: '営業・顧問対応',     capId: 205, capName: 'sales',         capEn: 'Sales Support',        capJa: '営業支援'     },
  { id: 206, title: 'レビュー・チェック', capId: 206, capName: 'review',        capEn: 'Quality Review',       capJa: 'レビュー'     },
  { id: 207, title: 'テスト・品質保証',   capId: 207, capName: 'test-auto',     capEn: 'Test Automation',      capJa: 'テスト自動化'  },
  { id: 208, title: 'サービス・プロダクト',capId: 208, capName: 'product',      capEn: 'Product Management',   capJa: 'プロダクト管理' },
  { id: 209, title: 'ナレッジ・業務支援', capId: 209, capName: 'knowledge',     capEn: 'Knowledge Management', capJa: 'ナレッジ管理'   },
];

const titlesByType = {
  '資料・文書作成':     ['提案書自動生成ツール', '議事録ドラフター', '週次レポート作成AI', '仕様書テンプレートジェネレーター', 'メール文章アシスタント', 'プレゼン構成AI'],
  '開発・コード支援':   ['コードレビューAI', 'バグ検出アシスタント', 'API設計支援ツール', 'リファクタリング提案AI', 'ドキュメント生成Bot', 'テストコード生成AI'],
  'データ分析・診断':   ['売上トレンド分析AI', '顧客セグメント診断', 'KPIダッシュボード自動化', 'データ異常検知エンジン', 'レポート自動集計AI', 'コスト最適化分析AI'],
  '情報収集・調査':     ['市場調査自動化AI', '競合分析Bot', '社内ナレッジ検索AI', 'ニュースサマリーAI', '規制・法令チェッカー', 'トレンドウォッチAI'],
  '営業・顧問対応':     ['商談準備アシスタント', '顧客フォローアップAI', '提案資料パーソナライザー', 'CRM自動入力ボット', '顧客インサイト抽出AI', '営業メール生成AI'],
  'レビュー・チェック': ['契約書チェックAI', 'コンプライアンス審査Bot', '品質チェックリストAI', '誤字脱字校正AI', 'セキュリティレビューAI', '要件整合性チェッカー'],
  'テスト・品質保証':   ['E2Eテスト自動生成', 'バグ再現シナリオAI', '性能テスト計画AI', 'テストカバレッジ分析', 'UIテスト自動化ツール', '回帰テスト最適化AI'],
  'サービス・プロダクト':['フィードバック分析AI', 'ロードマップ優先度AI', 'ユーザーストーリー生成AI', 'A/Bテスト設計AI', '機能使用率分析Bot', 'NPS分析・改善提案AI'],
  'ナレッジ・業務支援': ['社内FAQ自動応答AI', 'オンボーディング支援AI', '業務手順書生成ツール', 'ベストプラクティス収集AI', '部門間知識共有Bot', 'スキルマップ更新AI'],
};

const overviewByType = {
  '資料・文書作成':     (t) => `<p>${t}は、資料・文書の作成を自動化するAIアセットです。<br>[課題] テンプレートの選定から文章構成まで手作業に依存しており、担当者ごとにクオリティのばらつきが発生していました。<br>[解決策] AIが目的・対象に応じて最適な構成を提案し、ブランドガイドラインに準拠したドキュメントを自動生成します。作成時間を平均60%削減し、品質の均一化を実現します。</p>`,
  '開発・コード支援':   (t) => `<p>${t}は、開発者の生産性向上を支援するAIアセットです。<br>[課題] コードレビューや実装支援に多くの時間がかかり、リリースサイクルが長期化していました。<br>[解決策] コンテキストを理解したコード提案・補完・バグ検出を自動化します。既存の開発環境にシームレスに統合でき、チーム全体の開発速度を向上させます。</p>`,
  'データ分析・診断':   (t) => `<p>${t}は、データから意思決定に必要なインサイトを自動抽出するAIアセットです。<br>[課題] データ分析には専門知識が必要で、レポート作成に多大な工数がかかっていました。<br>[解決策] 自然言語でデータに問い合わせができ、グラフ・サマリーを自動生成します。専門家でなくてもデータドリブンな判断が可能になります。</p>`,
  '情報収集・調査':     (t) => `<p>${t}は、情報収集・調査業務を自動化するAIアセットです。<br>[課題] 社内外の情報を手動で収集・整理する作業に多くの時間が費やされていました。<br>[解決策] Web・社内データベース・文書を横断的に検索し、必要な情報を構造化レポートとして提供します。調査工数を最大70%削減します。</p>`,
  '営業・顧問対応':     (t) => `<p>${t}は、営業活動と顧客対応を強化するAIアセットです。<br>[課題] 商談準備に時間がかかり、顧客ごとの最適なアプローチを一貫して実施することが困難でした。<br>[解決策] 顧客情報・過去の商談データをもとに、パーソナライズされた提案文や対応スクリプトを自動生成します。成約率の向上と対応品質の標準化を実現します。</p>`,
  'レビュー・チェック': (t) => `<p>${t}は、レビュー・チェック業務を効率化するAIアセットです。<br>[課題] 文書・コード・契約書のレビューは属人的になりやすく、抜け漏れのリスクがありました。<br>[解決策] チェックリストに基づいた一貫したレビューを自動化し、問題点や改善提案をリストアップします。レビュー工数を削減しつつ品質を担保します。</p>`,
  'テスト・品質保証':   (t) => `<p>${t}は、テスト・品質保証プロセスを自動化するAIアセットです。<br>[課題] テストケースの設計・実行・結果分析に多大な工数がかかり、リリース遅延の原因となっていました。<br>[解決策] AIがコード変更の影響範囲を解析し、テストケースを自動生成・実行します。QA工数を大幅削減しリリースサイクルを加速します。</p>`,
  'サービス・プロダクト':(t) => `<p>${t}は、サービス・プロダクト管理を支援するAIアセットです。<br>[課題] ユーザーフィードバックや市場データが散在しており、優先すべき改善点の特定に時間がかかっていました。<br>[解決策] 定性・定量データを統合分析し、プロダクトロードマップ策定に必要なインサイトを提供します。意思決定のスピードと精度を向上させます。</p>`,
  'ナレッジ・業務支援': (t) => `<p>${t}は、社内ナレッジの集約・活用を促進するAIアセットです。<br>[課題] ナレッジがドキュメント・メール・チャットに散在しており、必要な情報へのアクセスに時間がかかっていました。<br>[解決策] 社内情報を横断検索し、自然言語での問い合わせに即座に回答します。新入社員のオンボーディング効率化にも貢献します。</p>`,
};

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const usedTitles = new Set(json.assets.map(a => a.title));
const titleCounters = {};

const dates = [
  '2025-10-15T00:00:00.000Z', '2025-11-03T00:00:00.000Z', '2025-12-20T00:00:00.000Z',
  '2026-01-08T00:00:00.000Z', '2026-02-14T00:00:00.000Z', '2026-03-01T00:00:00.000Z',
  '2026-03-25T00:00:00.000Z', '2026-04-10T00:00:00.000Z', '2026-05-02T00:00:00.000Z',
  '2026-05-18T00:00:00.000Z', '2026-06-01T00:00:00.000Z', '2026-06-10T00:00:00.000Z',
];

for (let n = 0; n < toAdd; n++) {
  const globalIdx = current + n;
  const type = types[globalIdx % types.length];
  const titlePool = titlesByType[type.title];
  const poolIdx = Math.floor(n / types.length);
  let baseTitle = titlePool[poolIdx % titlePool.length];
  titleCounters[baseTitle] = (titleCounters[baseTitle] || 0) + 1;
  const title = usedTitles.has(baseTitle) ? `${baseTitle} ${titleCounters[baseTitle]}` : baseTitle;
  usedTitles.add(title);

  const assetId = 8000 + n;
  const owner = owners[globalIdx % owners.length];
  const mod1 = moderators[globalIdx % moderators.length];
  const mod2 = moderators[(globalIdx + 1) % moderators.length];

  const views = rand(10, 1200);
  const uniqueViews = Math.floor(views * (0.45 + Math.random() * 0.4));
  const downloads = rand(0, Math.floor(views * 0.35));
  const likes = rand(0, Math.floor(views * 0.12));
  const comments = rand(0, 15);

  json.assets.push({
    id: assetId,
    original_asset_id: assetId,
    version_number: 1,
    title,
    tag_line: '',
    overview: overviewByType[type.title](title),
    contact_email_id: '',
    preview_gallery_id: null,
    preview_url: `https://picsum.photos/seed/asset${assetId}/800/450`,
    type: {
      id: type.id,
      c_name: 'category',
      title: type.title,
      download_term_condition_url: 'https://storage.cloud.google.com/assets-terms/terms.pdf',
      download_term_condition_title: 'Asset Usage Terms & Conditions',
    },
    status: { id: 4, c_name: 'published', title: 'Published' },
    access_type: { id: 2, c_name: 'everyone', title: 'Everyone' },
    people: [],
    last_updated_at: dates[globalIdx % dates.length],
    communities: [],
    languages: [],
    active_versions: [{ id: assetId + 1, asset_id: assetId, original_asset_id: assetId, previous_asset_id: null, version_number: 1, is_active: true }],
    versions: [],
    entities: [],
    locations: [],
    owners: [{
      mapping_id: 40000 + n,
      ownership_type: owner.ownership_type,
      is_owner: 1,
      id: 5000 + n,
      full_name: owner.full_name,
      email_id: owner.email_id,
      inactive: false,
      is_verified: true,
    }],
    creator: {
      id: 5000 + n,
      first_name: owner.full_name.split(' ')[0],
      last_name: owner.full_name.split(' ')[1] || '',
      full_name: owner.full_name,
      email_id: owner.email_id,
      inactive: false,
      is_verified: true,
    },
    moderators: [
      { id: 6000 + n, first_name: '', last_name: '', full_name: mod1.full_name, email_id: mod1.email_id, inactive: false, is_listener: false, status: null },
      { id: 6100 + n, first_name: '', last_name: '', full_name: mod2.full_name, email_id: mod2.email_id, inactive: false, is_listener: false, status: null },
    ],
    capabilities: [{
      id: type.capId,
      c_name: type.capName,
      title: type.capEn,
      is_exclusive: false,
      is_featured: false,
      capability_type: { id: 38, c_name: 'technology', title: 'Technology' },
      sub_capabilities: [],
      sub_capabilities_count: 0,
      translations: [{ id: type.capId, capability_id: type.capId, title: type.capJa, language_code: 'ja' }],
      parent: null,
      mapping_id: 80000 + n,
    }],
    tags: [],
    stats: {
      view_count: views,
      unique_view_count: uniqueViews,
      download_count: downloads,
      unique_download_count: Math.floor(downloads * 0.8),
      open_download_count: 0,
      in_moderation_download_count: 0,
      published_download_count: downloads,
      like_count: likes,
      dislike_count: rand(0, 3),
      comment_count: comments,
      open_comment_count: 0,
      in_moderation_comment_count: rand(0, 2),
      published_comment_count: rand(0, comments),
      utilization_report_count: rand(0, Math.floor(views * 0.2)),
    },
    is_locked: false,
  });
}

fs.writeFileSync(path.join(__dirname, '../data/test.json'), JSON.stringify(json, null, 4));
fs.writeFileSync(path.join(__dirname, '../data/test.js'), 'window.ASSETS_DATA = ' + JSON.stringify(json) + ';');
console.log('Done. Total assets:', json.assets.length);
