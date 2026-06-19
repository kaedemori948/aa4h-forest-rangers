const fs = require('fs');
const path = require('path');
const json = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/test.json'), 'utf8'));

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

const capsByType = {
  '資料・文書作成':     { id: 201, c_name: 'doc-gen',      title: 'Document Generation',  ja: '文書生成'    },
  '開発・コード支援':   { id: 202, c_name: 'code-assist',  title: 'Code Assistance',      ja: 'コード支援'   },
  'データ分析・診断':   { id: 203, c_name: 'data-analysis',title: 'Data Analysis',        ja: 'データ分析'   },
  '情報収集・調査':     { id: 204, c_name: 'research',     title: 'Research',             ja: '情報収集'    },
  '営業・顧問対応':     { id: 205, c_name: 'sales',        title: 'Sales Support',        ja: '営業支援'    },
  'レビュー・チェック': { id: 206, c_name: 'review',       title: 'Quality Review',       ja: 'レビュー'    },
  'テスト・品質保証':   { id: 207, c_name: 'test-auto',    title: 'Test Automation',      ja: 'テスト自動化' },
  'サービス・プロダクト':{ id: 208, c_name: 'product',     title: 'Product Management',   ja: 'プロダクト管理'},
  'ナレッジ・業務支援': { id: 209, c_name: 'knowledge',    title: 'Knowledge Management', ja: 'ナレッジ管理'  },
};

const overviewByType = {
  '資料・文書作成': (t) =>
    `<p>${t}は、資料・文書の作成を自動化するAIアセットです。<br>[課題] テンプレートの選定から文章構成まで手作業に依存しており、担当者ごとにクオリティのばらつきが発生していました。<br>[解決策] AIが目的・対象に応じて最適な構成を提案し、ブランドガイドラインに準拠したドキュメントを自動生成します。作成時間を平均60%削減し、品質の均一化を実現します。</p>`,
  '開発・コード支援': (t) =>
    `<p>${t}は、開発者の生産性向上を支援するAIアセットです。<br>[課題] コードレビューや実装支援に多くの時間がかかり、リリースサイクルが長期化していました。<br>[解決策] コンテキストを理解したコード提案・補完・バグ検出を自動化します。既存の開発環境にシームレスに統合でき、チーム全体の開発速度を向上させます。</p>`,
  'データ分析・診断': (t) =>
    `<p>${t}は、データから意思決定に必要なインサイトを自動抽出するAIアセットです。<br>[課題] データ分析には専門知識が必要で、レポート作成に多大な工数がかかっていました。<br>[解決策] 自然言語でデータに問い合わせができ、グラフ・サマリーを自動生成します。専門家でなくてもデータドリブンな判断が可能になります。</p>`,
  '情報収集・調査': (t) =>
    `<p>${t}は、情報収集・調査業務を自動化するAIアセットです。<br>[課題] 社内外の情報を手動で収集・整理する作業に多くの時間が費やされていました。<br>[解決策] Web・社内データベース・文書を横断的に検索し、必要な情報を構造化レポートとして提供します。調査工数を最大70%削減します。</p>`,
  '営業・顧問対応': (t) =>
    `<p>${t}は、営業活動と顧客対応を強化するAIアセットです。<br>[課題] 商談準備に時間がかかり、顧客ごとの最適なアプローチを一貫して実施することが困難でした。<br>[解決策] 顧客情報・過去の商談データをもとに、パーソナライズされた提案文や対応スクリプトを自動生成します。成約率の向上と対応品質の標準化を実現します。</p>`,
  'レビュー・チェック': (t) =>
    `<p>${t}は、レビュー・チェック業務を効率化するAIアセットです。<br>[課題] 文書・コード・契約書のレビューは属人的になりやすく、抜け漏れのリスクがありました。<br>[解決策] チェックリストに基づいた一貫したレビューを自動化し、問題点や改善提案をリストアップします。レビュー工数を削減しつつ品質を担保します。</p>`,
  'テスト・品質保証': (t) =>
    `<p>${t}は、テスト・品質保証プロセスを自動化するAIアセットです。<br>[課題] テストケースの設計・実行・結果分析に多大な工数がかかり、リリース遅延の原因となっていました。<br>[解決策] AIがコード変更の影響範囲を解析し、テストケースを自動生成・実行します。QA工数を大幅削減しリリースサイクルを加速します。</p>`,
  'サービス・プロダクト': (t) =>
    `<p>${t}は、サービス・プロダクト管理を支援するAIアセットです。<br>[課題] ユーザーフィードバックや市場データが散在しており、優先すべき改善点の特定に時間がかかっていました。<br>[解決策] 定性・定量データを統合分析し、プロダクトロードマップ策定に必要なインサイトを提供します。意思決定のスピードと精度を向上させます。</p>`,
  'ナレッジ・業務支援': (t) =>
    `<p>${t}は、社内ナレッジの集約・活用を促進するAIアセットです。<br>[課題] ナレッジがドキュメント・メール・チャットに散在しており、必要な情報へのアクセスに時間がかかっていました。<br>[解決策] 社内情報を横断検索し、自然言語での問い合わせに即座に回答します。新入社員のオンボーディング効率化にも貢献します。</p>`,
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

json.assets.forEach((a, i) => {
  if (i === 0) return;

  const typeTitle = a.type.title;
  const owner = owners[i % owners.length];

  a.owners = [{
    mapping_id: 37000 + i,
    ownership_type: owner.ownership_type,
    is_owner: 1,
    id: 2000 + i,
    full_name: owner.full_name,
    email_id: owner.email_id,
    inactive: false,
    is_verified: true,
  }];

  a.creator = {
    id: 2000 + i,
    first_name: owner.full_name.split(' ')[0],
    last_name: owner.full_name.split(' ')[1] || '',
    full_name: owner.full_name,
    email_id: owner.email_id,
    inactive: false,
    is_verified: true,
  };

  const mod1 = moderators[i % moderators.length];
  const mod2 = moderators[(i + 1) % moderators.length];
  a.moderators = [
    { id: 3000 + i, first_name: '', last_name: '', full_name: mod1.full_name, email_id: mod1.email_id, inactive: false, is_listener: false, status: null },
    { id: 3100 + i, first_name: '', last_name: '', full_name: mod2.full_name, email_id: mod2.email_id, inactive: false, is_listener: false, status: null },
  ];

  const cap = capsByType[typeTitle] || { id: 999, c_name: 'general', title: 'General', ja: '汎用' };
  a.capabilities = [{
    id: cap.id,
    c_name: cap.c_name,
    title: cap.title,
    is_exclusive: false,
    is_featured: false,
    capability_type: { id: 38, c_name: 'technology', title: 'Technology' },
    sub_capabilities: [],
    sub_capabilities_count: 0,
    translations: [{ id: cap.id, capability_id: cap.id, title: cap.ja, language_code: 'ja' }],
    parent: null,
    mapping_id: 70000 + i,
  }];

  const views = rand(20, 900);
  const uniqueViews = Math.floor(views * (0.45 + Math.random() * 0.4));
  const downloads = rand(0, Math.floor(views * 0.35));
  const likes = rand(0, Math.floor(views * 0.12));
  const comments = rand(0, 12);
  a.stats = {
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
  };

  const overviewFn = overviewByType[typeTitle];
  a.overview = overviewFn ? overviewFn(a.title) : `<p>${a.title}は、業務効率化を支援するAIアセットです。</p>`;

  if (!a.type.download_term_condition_url) {
    a.type.download_term_condition_url = 'https://storage.cloud.google.com/assets-terms/terms.pdf';
    a.type.download_term_condition_title = 'Asset Usage Terms & Conditions';
  }
});

fs.writeFileSync(path.join(__dirname, '../data/test.json'), JSON.stringify(json, null, 4));
fs.writeFileSync(path.join(__dirname, '../data/test.js'), 'window.ASSETS_DATA = ' + JSON.stringify(json) + ';');
console.log('Done. Updated', json.assets.length - 1, 'assets.');
