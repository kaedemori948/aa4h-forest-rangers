window.AGENTS_DATA = {
  "meta": {
    "total": 30,
    "source": "dummy-assets-2026",
    "exportedOn": "2026-06-17",
    "totalViews": 12480,
    "totalLikes": 94,
    "demo": true,
    "demoFields": ["rating","ratingCount","certified","difficulty","department","effect","testimonials","useCases","tech","api","security","support"]
  },
  "categories": [
    {"id":"doc",      "name":"資料・文書作成",    "icon":"✎",  "count":7},
    {"id":"dev",      "name":"開発・コード支援",  "icon":"</>","count":5},
    {"id":"analysis", "name":"データ分析・診断",  "icon":"◴",  "count":5},
    {"id":"research", "name":"情報収集・調査",    "icon":"⌕",  "count":4},
    {"id":"sales",    "name":"営業・顧客対応",    "icon":"♚",  "count":3},
    {"id":"review",   "name":"レビュー・チェック","icon":"⚑",  "count":3},
    {"id":"test",     "name":"テスト・品質保証",  "icon":"✓",  "count":1},
    {"id":"service",  "name":"サービス・プロダクト","icon":"◆", "count":1},
    {"id":"knowledge","name":"ナレッジ・業務支援","icon":"◈",  "count":1}
  ],
  "agents": [
    {
      "id": 1, "title": "AIメール自動作成アシスタント", "category": "doc",
      "views": 1820, "uniqueViews": 642, "likes": 14, "published": "2026-05-20",
      "owner": "田中 美咲", "description": "件名・本文・締め文を状況に応じて自動生成。社内外メールのトーン調整にも対応し、作成時間を平均70%削減します。",
      "rating": 4.7, "ratingCount": 84, "certified": true, "difficulty": "低",
      "department": "総務・コーポレート本部",
      "effect": "メール作成工数を平均70%削減。返信品質の均一化を実現。",
      "testimonials": [{"role":"営業マネージャー","text":"毎日のメール作成が10分から3分に。クオリティも上がりました。"},{"role":"アシスタント","text":"敬語のレベル調整が特に助かっています。"}],
      "useCases": ["社内連絡メール作成","顧客向け返信文の生成","メルマガ文面の下書き"],
      "tech": {"model":"Azure OpenAI GPT-4o","integrations":["Outlook","Gmail","Teams"],"performance":"平均応答 1.2秒","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"送信前に自動マスキング","compliance":["個人情報マスキング","社内データ取扱規程 準拠"]},
      "support": {"channel":"Teamsサポートチャネル","sla":"翌営業日以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/mail1/800/450",
        "https://picsum.photos/seed/mail2/800/450",
        "https://picsum.photos/seed/mail3/800/450"
      ]
    },
    {
      "id": 2, "title": "会議議事録自動生成エージェント", "category": "doc",
      "views": 1560, "uniqueViews": 518, "likes": 11, "published": "2026-04-15",
      "owner": "山田 健一", "description": "会議音声・テキストから要点・決定事項・アクションアイテムを自動抽出。会議終了後5分で議事録を配信します。",
      "rating": 4.6, "ratingCount": 72, "certified": true, "difficulty": "低",
      "department": "DX推進本部",
      "effect": "議事録作成時間を90%削減。抜け漏れ防止により意思決定のスピードが向上。",
      "testimonials": [{"role":"プロジェクトマネージャー","text":"会議後すぐに議事録が届くのが革命的です。"},{"role":"チームリーダー","text":"アクションアイテムの抽出精度が高く、フォローアップが楽になりました。"}],
      "useCases": ["定例会議の議事録作成","意思決定記録の自動化","アクションアイテム管理"],
      "tech": {"model":"Whisper + GPT-4o","integrations":["Teams","Zoom","Google Meet"],"performance":"15分音声を2分で処理","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"会議音声はローカル処理","compliance":["音声データ不保存","社内セキュリティポリシー準拠"]},
      "support": {"channel":"専用Slackチャネル","sla":"4時間以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/meeting1/800/450",
        "https://picsum.photos/seed/meeting2/800/450",
        "https://picsum.photos/seed/meeting3/800/450"
      ]
    },
    {
      "id": 3, "title": "プレゼンスライド自動生成AI", "category": "doc",
      "views": 1340, "uniqueViews": 445, "likes": 9, "published": "2026-03-10",
      "owner": "鈴木 彩花", "description": "テキスト・データを入力するだけでPowerPointスライドを自動生成。デザインテンプレートから最適なレイアウトを選択します。",
      "rating": 4.4, "ratingCount": 56, "certified": false, "difficulty": "低",
      "department": "マーケティング本部",
      "effect": "スライド作成時間を60%短縮。デザイン品質の均一化に貢献。",
      "testimonials": [{"role":"マーケター","text":"構成から図解まで一気通貫で作れるのが便利です。"},{"role":"コンサルタント","text":"クライアント提案資料の初版がこれで十分使えます。"}],
      "useCases": ["経営報告資料の作成","営業提案スライドの生成","社内研修資料の作成"],
      "tech": {"model":"GPT-4o + DALL-E 3","integrations":["PowerPoint","Google Slides","Canva"],"performance":"10スライドを約90秒で生成","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"Active Directory","dataHandling":"社内データは外部送信なし","compliance":["機密情報フィルタリング"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/slides1/800/450",
        "https://picsum.photos/seed/slides2/800/450",
        "https://picsum.photos/seed/slides3/800/450",
        "https://picsum.photos/seed/slides4/800/450"
      ]
    },
    {
      "id": 4, "title": "技術仕様書作成支援エージェント", "category": "doc",
      "views": 980, "uniqueViews": 312, "likes": 7, "published": "2026-02-28",
      "owner": "伊藤 直樹", "description": "コードやAPIの仕様から技術ドキュメントを自動生成。Markdown・Word・HTMLの複数形式に対応します。",
      "rating": 4.5, "ratingCount": 43, "certified": true, "difficulty": "中",
      "department": "開発・SE本部",
      "effect": "ドキュメント作成工数を50%削減。最新仕様との乖離を防止。",
      "testimonials": [{"role":"ソフトウェアエンジニア","text":"コードから仕様書が自動生成される感動があります。"},{"role":"テックリード","text":"レビュー指摘が大幅に減りました。"}],
      "useCases": ["API仕様書の自動生成","システム設計書の作成支援","リリースノートの自動化"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["GitHub","Confluence","Notion"],"performance":"1000行コードを3分で解析","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"コードは解析後即時削除","compliance":["ソースコード外部送信禁止対応","Git監査ログ連携"]},
      "support": {"channel":"GitHubイシュー","sla":"48時間以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/docs1/800/450",
        "https://picsum.photos/seed/docs2/800/450",
        "https://picsum.photos/seed/docs3/800/450"
      ]
    },
    {
      "id": 5, "title": "提案書・見積書生成AI", "category": "doc",
      "views": 1120, "uniqueViews": 389, "likes": 8, "published": "2026-04-01",
      "owner": "中村 恵子", "description": "顧客情報・要件を入力するだけで、提案書・見積書をドラフト生成。過去案件データを参照して精度の高い金額算出をサポートします。",
      "rating": 4.3, "ratingCount": 38, "certified": false, "difficulty": "中",
      "department": "営業本部",
      "effect": "提案書作成時間を65%短縮。受注率が12%向上。",
      "testimonials": [{"role":"営業担当","text":"初回ドラフトがこれで十分なレベルに仕上がります。"},{"role":"営業部長","text":"若手でも高品質な提案書を出せるようになりました。"}],
      "useCases": ["新規顧客向け提案書作成","見積書の自動計算・生成","提案内容のカスタマイズ支援"],
      "tech": {"model":"GPT-4o","integrations":["Salesforce","kintone","Excel"],"performance":"A4 10ページを5分で生成","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"顧客情報は暗号化保存","compliance":["個人情報保護法準拠","顧客データ社外送信禁止"]},
      "support": {"channel":"Teamsサポートチャネル","sla":"翌営業日以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/proposal1/800/450",
        "https://picsum.photos/seed/proposal2/800/450",
        "https://picsum.photos/seed/proposal3/800/450"
      ]
    },
    {
      "id": 6, "title": "週次レポート自動作成エージェント", "category": "doc",
      "views": 870, "uniqueViews": 276, "likes": 6, "published": "2026-03-22",
      "owner": "小林 翔太", "description": "各種ツールからデータを自動収集し、週次業務レポートを生成。経営層向けサマリーから担当者向け詳細まで複数粒度で対応。",
      "rating": 4.2, "ratingCount": 31, "certified": false, "difficulty": "中",
      "department": "経営企画本部",
      "effect": "週次報告作成時間を80%削減。データの見落とし防止。",
      "testimonials": [{"role":"マネージャー","text":"毎週月曜の資料作成が完全自動化されました。"},{"role":"アナリスト","text":"データ収集の手間がゼロになりました。"}],
      "useCases": ["KPIダッシュボードの自動更新","経営会議向けサマリー作成","部門別業績レポートの生成"],
      "tech": {"model":"GPT-4o","integrations":["Excel","Tableau","Salesforce","kintone"],"performance":"データ取込から生成まで10分以内","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"Active Directory","dataHandling":"社内ネットワーク内処理","compliance":["財務データ取扱規程準拠"]},
      "support": {"channel":"メールサポート","sla":"2営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/report1/800/450",
        "https://picsum.photos/seed/report2/800/450",
        "https://picsum.photos/seed/report3/800/450"
      ]
    },
    {
      "id": 7, "title": "製品カタログ生成AI", "category": "doc",
      "views": 640, "uniqueViews": 198, "likes": 4, "published": "2026-05-05",
      "owner": "高橋 麻衣", "description": "製品スペック・画像から販促カタログを自動生成。多言語対応（日英中）で、印刷・Web・PDF向けに最適化されたレイアウトを出力します。",
      "rating": 4.1, "ratingCount": 24, "certified": false, "difficulty": "低",
      "department": "マーケティング本部",
      "effect": "カタログ制作期間を2週間から3日に短縮。多言語展開のコストを60%削減。",
      "testimonials": [{"role":"製品マーケター","text":"海外向けカタログが一気に作れるのが助かります。"},{"role":"デザイナー","text":"初稿として使えるクオリティです。"}],
      "useCases": ["新製品カタログの自動生成","多言語版カタログの一括作成","ECサイト用商品説明文の生成"],
      "tech": {"model":"GPT-4o + DALL-E 3","integrations":["Adobe InDesign","Canva","Shopify"],"performance":"20製品のカタログを15分で生成","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"製品画像はCDN経由","compliance":["著作権チェック機能内蔵"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/catalog1/800/450",
        "https://picsum.photos/seed/catalog2/800/450",
        "https://picsum.photos/seed/catalog3/800/450"
      ]
    },
    {
      "id": 8, "title": "コードレビュー自動化エージェント", "category": "dev",
      "views": 1680, "uniqueViews": 589, "likes": 13, "published": "2026-04-08",
      "owner": "渡辺 大輔", "description": "プルリクエストを自動解析し、バグ・セキュリティ脆弱性・コーディング規約違反をコメントとして自動付与。レビュー時間を大幅に短縮します。",
      "rating": 4.8, "ratingCount": 91, "certified": true, "difficulty": "低",
      "department": "開発・SE本部",
      "effect": "コードレビュー時間を50%削減。本番バグを30%低減。",
      "testimonials": [{"role":"テックリード","text":"レビューの抜け漏れが激減しました。チーム全体の品質が向上。"},{"role":"ジュニアエンジニア","text":"指摘内容から学べるので成長が加速しています。"}],
      "useCases": ["プルリクエストの自動レビュー","セキュリティ脆弱性の早期検出","コーディング規約チェックの自動化"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["GitHub","GitLab","Bitbucket"],"performance":"1000行コードを45秒でレビュー","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"コードはレビュー後即時削除","compliance":["ソースコード機密保持対応","SOC2 Type II準拠"]},
      "support": {"channel":"GitHubイシュー","sla":"24時間以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/codereview1/800/450",
        "https://picsum.photos/seed/codereview2/800/450",
        "https://picsum.photos/seed/codereview3/800/450"
      ]
    },
    {
      "id": 9, "title": "Pythonコード生成AI", "category": "dev",
      "views": 1240, "uniqueViews": 423, "likes": 10, "published": "2026-03-18",
      "owner": "松本 雄介", "description": "自然言語の要件からPythonコードを自動生成。データ処理・Web API・機械学習の各ドメインに特化したテンプレートを内蔵します。",
      "rating": 4.5, "ratingCount": 67, "certified": false, "difficulty": "低",
      "department": "開発・SE本部",
      "effect": "プロトタイプ開発期間を60%短縮。コーディング初心者の参入障壁を低減。",
      "testimonials": [{"role":"データサイエンティスト","text":"分析スクリプトの雛形を瞬時に生成できます。"},{"role":"バックエンドエンジニア","text":"定型処理のコーディングから解放されました。"}],
      "useCases": ["データ処理スクリプトの自動生成","REST API実装の雛形作成","機械学習パイプラインの構築支援"],
      "tech": {"model":"GPT-4o","integrations":["VS Code","JupyterLab","GitHub Copilot"],"performance":"100行コードを8秒で生成","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"入力コードは処理後削除","compliance":["コード品質スキャン内蔵"]},
      "support": {"channel":"Discordサポート","sla":"ベストエフォート"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/python1/800/450",
        "https://picsum.photos/seed/python2/800/450",
        "https://picsum.photos/seed/python3/800/450"
      ]
    },
    {
      "id": 10, "title": "APIドキュメント自動生成エージェント", "category": "dev",
      "views": 780, "uniqueViews": 254, "likes": 5, "published": "2026-02-14",
      "owner": "加藤 真理", "description": "OpenAPI仕様・コードコメントからAPIリファレンスを自動生成。インタラクティブなSwagger UIも同時出力します。",
      "rating": 4.4, "ratingCount": 29, "certified": false, "difficulty": "中",
      "department": "開発・SE本部",
      "effect": "APIドキュメント整備工数を75%削減。外部連携パートナーの問い合わせを40%削減。",
      "testimonials": [{"role":"APIエンジニア","text":"仕様変更時の更新が自動化されて助かります。"},{"role":"パートナー企業担当者","text":"ドキュメントの質が上がり連携実装が早くなりました。"}],
      "useCases": ["REST API仕様書の自動生成","GraphQLスキーマドキュメント化","SDK利用ガイドの作成"],
      "tech": {"model":"GPT-4o","integrations":["OpenAPI","Swagger","Postman","Redoc"],"performance":"100エンドポイントを5分で処理","customizable":false},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"APIキー","dataHandling":"スキーマ情報はキャッシュなし","compliance":["機密エンドポイント自動除外機能"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/apidoc1/800/450",
        "https://picsum.photos/seed/apidoc2/800/450",
        "https://picsum.photos/seed/apidoc3/800/450"
      ]
    },
    {
      "id": 11, "title": "バグ原因分析エージェント", "category": "dev",
      "views": 1050, "uniqueViews": 368, "likes": 8, "published": "2026-05-12",
      "owner": "佐藤 達也", "description": "エラーログ・スタックトレースを解析し、バグの根本原因と修正案を提示。再現手順の特定から修正コードの提案まで一貫してサポート。",
      "rating": 4.6, "ratingCount": 52, "certified": true, "difficulty": "中",
      "department": "開発・SE本部",
      "effect": "障害解決時間を平均40%短縮。エスカレーション件数を25%削減。",
      "testimonials": [{"role":"インフラエンジニア","text":"深夜の障害対応が格段に楽になりました。"},{"role":"SRE","text":"原因特定の見当をつけるのに非常に有効です。"}],
      "useCases": ["本番障害の初期調査","スタックトレース解析","テスト失敗の原因特定"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["Datadog","PagerDuty","Jira","Sentry"],"performance":"ログ1MB解析を30秒以内","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"ログは解析後48時間で削除","compliance":["個人情報自動マスキング","監査ログ保持"]},
      "support": {"channel":"専用Slackチャネル","sla":"2時間以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/debug1/800/450",
        "https://picsum.photos/seed/debug2/800/450",
        "https://picsum.photos/seed/debug3/800/450"
      ]
    },
    {
      "id": 12, "title": "データベース設計支援AI", "category": "dev",
      "views": 560, "uniqueViews": 178, "likes": 3, "published": "2026-01-30",
      "owner": "木村 俊介", "description": "業務要件からER図・テーブル定義・インデックス設計を自動提案。PostgreSQL・MySQL・BigQueryなど主要DBに対応します。",
      "rating": 4.2, "ratingCount": 21, "certified": false, "difficulty": "高",
      "department": "開発・SE本部",
      "effect": "DB設計工数を40%削減。設計レビュー指摘事項を50%削減。",
      "testimonials": [{"role":"データエンジニア","text":"ER図のドラフトを30分で作れるのが魅力です。"},{"role":"アーキテクト","text":"設計の抜け漏れチェックに重宝しています。"}],
      "useCases": ["新規システムのDB設計","既存DBのリファクタリング提案","パフォーマンス改善のためのインデックス最適化"],
      "tech": {"model":"GPT-4o","integrations":["PostgreSQL","MySQL","BigQuery","dbdiagram.io"],"performance":"20テーブル規模を10分で設計","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"Active Directory","dataHandling":"スキーマ情報のみ送信","compliance":["本番データ接続禁止"]},
      "support": {"channel":"メールサポート","sla":"2営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/db1/800/450",
        "https://picsum.photos/seed/db2/800/450",
        "https://picsum.photos/seed/db3/800/450"
      ]
    },
    {
      "id": 13, "title": "売上データ分析エージェント", "category": "analysis",
      "views": 1380, "uniqueViews": 486, "likes": 11, "published": "2026-04-22",
      "owner": "西田 由紀", "description": "売上・受注データをAIが自動分析し、傾向・異常値・予測を自然言語レポートで提供。経営層向けダッシュボードも自動生成します。",
      "rating": 4.7, "ratingCount": 78, "certified": true, "difficulty": "低",
      "department": "経営企画本部",
      "effect": "月次分析レポート作成を90%自動化。売上予測精度が従来比15%向上。",
      "testimonials": [{"role":"CFO","text":"数字の背景にあるストーリーを自動で説明してくれます。"},{"role":"営業部長","text":"リアルタイムに傾向を把握できるようになりました。"}],
      "useCases": ["月次・四半期売上レポートの自動化","異常値・外れ値の自動検出","売上予測モデルの構築支援"],
      "tech": {"model":"GPT-4o + Python分析エンジン","integrations":["Salesforce","Excel","Tableau","BigQuery"],"performance":"100万行データを3分で分析","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"財務データは社内サーバーで処理","compliance":["財務情報取扱規程準拠","監査ログ保持3年"]},
      "support": {"channel":"専用Teamsチャネル","sla":"翌営業日以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/sales1/800/450",
        "https://picsum.photos/seed/sales2/800/450",
        "https://picsum.photos/seed/sales3/800/450",
        "https://picsum.photos/seed/sales4/800/450"
      ]
    },
    {
      "id": 14, "title": "顧客行動分析AI", "category": "analysis",
      "views": 1020, "uniqueViews": 341, "likes": 7, "published": "2026-03-05",
      "owner": "岡田 智子", "description": "Webサイト・アプリの行動ログを解析し、ユーザーセグメント・チャーン予測・LTV最大化施策を自動提案します。",
      "rating": 4.5, "ratingCount": 49, "certified": false, "difficulty": "中",
      "department": "マーケティング本部",
      "effect": "チャーン率を20%低減。マーケティングROIを35%改善。",
      "testimonials": [{"role":"グロースマネージャー","text":"どのユーザーに何をすべきかが明確になりました。"},{"role":"データアナリスト","text":"分析工数が半減し、施策実行に集中できるようになりました。"}],
      "useCases": ["ユーザーセグメンテーション","チャーン予測とリテンション施策","A/Bテスト結果の自動解釈"],
      "tech": {"model":"GPT-4o + MLモデル","integrations":["Google Analytics","Amplitude","Mixpanel","BigQuery"],"performance":"1000万イベントを10分で分析","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"個人識別情報は自動匿名化","compliance":["GDPR準拠","個人情報保護法準拠"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/user1/800/450",
        "https://picsum.photos/seed/user2/800/450",
        "https://picsum.photos/seed/user3/800/450"
      ]
    },
    {
      "id": 15, "title": "製品品質予測エージェント", "category": "analysis",
      "views": 760, "uniqueViews": 234, "likes": 5, "published": "2026-02-10",
      "owner": "前田 康弘", "description": "製造ラインのセンサーデータを解析し、品質異常を事前に予測。不良品発生を未然に防ぎ、ロスを最小化します。",
      "rating": 4.6, "ratingCount": 38, "certified": true, "difficulty": "高",
      "department": "製造・品質管理本部",
      "effect": "品質不良率を35%削減。検査コストを20%削減。",
      "testimonials": [{"role":"品質管理部長","text":"予防保全が実現し、ライン停止が大幅に減りました。"},{"role":"製造エンジニア","text":"経験則に頼らなくても品質管理できるようになりました。"}],
      "useCases": ["製造ラインの異常予兆検知","品質不良の原因分析","出荷前品質予測スコアリング"],
      "tech": {"model":"カスタムMLモデル + GPT-4o","integrations":["Historian","OSIsoft PI","SAP","IoT Hub"],"performance":"リアルタイム処理(レイテンシ<500ms)","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"産業用認証基盤","dataHandling":"センサーデータはエッジ処理","compliance":["ISO 9001対応","製造データ取扱規程準拠"]},
      "support": {"channel":"専用サポート窓口（24/7）","sla":"1時間以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/quality1/800/450",
        "https://picsum.photos/seed/quality2/800/450",
        "https://picsum.photos/seed/quality3/800/450"
      ]
    },
    {
      "id": 16, "title": "財務リスク評価AI", "category": "analysis",
      "views": 840, "uniqueViews": 268, "likes": 6, "published": "2026-01-20",
      "owner": "石田 幸子", "description": "財務諸表・市場データを解析し、信用リスク・流動性リスクを定量評価。経営判断を支援するリスクレポートを自動生成します。",
      "rating": 4.4, "ratingCount": 33, "certified": true, "difficulty": "高",
      "department": "財務・経理本部",
      "effect": "リスク評価作業を70%自動化。信用損失を15%削減。",
      "testimonials": [{"role":"CFO","text":"リスクの可視化が格段に向上しました。"},{"role":"財務アナリスト","text":"詳細な財務データを素早く整理してくれます。"}],
      "useCases": ["取引先の信用リスク評価","投資ポートフォリオのリスク分析","財務コンプライアンスレポートの自動化"],
      "tech": {"model":"GPT-4o + 金融特化モデル","integrations":["Bloomberg","Refinitiv","SAP FI","Excel"],"performance":"財務諸表100社を30分で評価","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"多要素認証（MFA）","dataHandling":"財務データは暗号化保存","compliance":["金融庁ガイドライン準拠","SOX法対応"]},
      "support": {"channel":"専用サポート電話","sla":"4時間以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/finance1/800/450",
        "https://picsum.photos/seed/finance2/800/450",
        "https://picsum.photos/seed/finance3/800/450"
      ]
    },
    {
      "id": 17, "title": "業務プロセス改善分析エージェント", "category": "analysis",
      "views": 620, "uniqueViews": 195, "likes": 4, "published": "2026-05-30",
      "owner": "林 克也", "description": "業務ログ・稼働データを分析し、ボトルネック・無駄な工程を特定。改善提案とROI試算を自動生成します。",
      "rating": 4.3, "ratingCount": 27, "certified": false, "difficulty": "中",
      "department": "DX推進本部",
      "effect": "業務効率改善提案の策定工数を60%削減。実施施策の平均ROI 180%。",
      "testimonials": [{"role":"業務改善担当","text":"どこから手をつけるべきかが一目でわかります。"},{"role":"COO","text":"データに基づく改善提案が説得力を持つようになりました。"}],
      "useCases": ["業務フロー分析とボトルネック特定","RPA化候補業務の自動抽出","改善効果シミュレーション"],
      "tech": {"model":"GPT-4o","integrations":["kintone","SAP","ServiceNow","Excel"],"performance":"1万件の業務ログを10分で解析","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"Active Directory","dataHandling":"業務データは社内処理","compliance":["社内情報セキュリティポリシー準拠"]},
      "support": {"channel":"メールサポート","sla":"2営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/process1/800/450",
        "https://picsum.photos/seed/process2/800/450",
        "https://picsum.photos/seed/process3/800/450"
      ]
    },
    {
      "id": 18, "title": "市場トレンド調査AI", "category": "research",
      "views": 1160, "uniqueViews": 398, "likes": 9, "published": "2026-04-10",
      "owner": "橋本 奈々", "description": "Web・SNS・ニュースから最新の市場トレンドを自動収集・分析。競合動向と市場機会をリアルタイムで把握できるレポートを生成します。",
      "rating": 4.5, "ratingCount": 61, "certified": false, "difficulty": "低",
      "department": "マーケティング本部",
      "effect": "市場調査工数を65%削減。機会損失を20%低減。",
      "testimonials": [{"role":"マーケティングディレクター","text":"毎週のトレンドレポートが完全自動化されました。"},{"role":"事業開発担当","text":"新規事業の市場調査に欠かせないツールになっています。"}],
      "useCases": ["業界トレンドの定期モニタリング","新規市場参入調査","競合他社の動向ウォッチ"],
      "tech": {"model":"GPT-4o + Webクローラー","integrations":["Slack","Notion","Teams","RSS"],"performance":"100ソースを30分で収集・整理","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"APIキー","dataHandling":"公開情報のみ収集","compliance":["著作権法準拠","robots.txt遵守"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/market1/800/450",
        "https://picsum.photos/seed/market2/800/450",
        "https://picsum.photos/seed/market3/800/450"
      ]
    },
    {
      "id": 19, "title": "競合他社動向分析エージェント", "category": "research",
      "views": 940, "uniqueViews": 312, "likes": 7, "published": "2026-03-28",
      "owner": "辻 英二", "description": "競合各社のプレスリリース・IR情報・SNS発信を自動収集し、戦略変化・新製品動向・人材採用傾向を分析レポートにまとめます。",
      "rating": 4.4, "ratingCount": 44, "certified": false, "difficulty": "中",
      "department": "経営企画本部",
      "effect": "競合調査工数を70%削減。競合の動きを平均2週間早くキャッチ。",
      "testimonials": [{"role":"事業戦略担当","text":"競合の動きをリアルタイムで追えるようになりました。"},{"role":"経営企画部長","text":"定性情報の収集・整理が劇的に効率化されました。"}],
      "useCases": ["競合のプレスリリース自動モニタリング","競合製品・価格比較表の自動更新","競合の採用動向から戦略を推測"],
      "tech": {"model":"GPT-4o","integrations":["Slack","Notion","Google Alerts","Twitter/X API"],"performance":"20社の情報を1時間で収集","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"公開情報のみ収集","compliance":["不正アクセス禁止法準拠"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/competitor1/800/450",
        "https://picsum.photos/seed/competitor2/800/450",
        "https://picsum.photos/seed/competitor3/800/450"
      ]
    },
    {
      "id": 20, "title": "技術情報収集エージェント", "category": "research",
      "views": 820, "uniqueViews": 267, "likes": 6, "published": "2026-02-20",
      "owner": "長谷川 亮", "description": "arXiv・GitHub・技術ブログから最新技術情報を収集し、エンジニア向けに要約・分類して配信。テクノロジーレーダーの自動更新も対応。",
      "rating": 4.6, "ratingCount": 39, "certified": false, "difficulty": "低",
      "department": "開発・SE本部",
      "effect": "技術トレンドの把握工数を80%削減。新技術採用のリードタイムを短縮。",
      "testimonials": [{"role":"CTOオフィス","text":"重要な技術論文を見逃さなくなりました。"},{"role":"エンジニア","text":"日本語要約が秀逸で、キャッチアップ速度が上がっています。"}],
      "useCases": ["最新論文・技術ブログの自動収集","テクノロジーレーダーの自動更新","エンジニア向け週次技術ニュースレター"],
      "tech": {"model":"GPT-4o","integrations":["Slack","Notion","arXiv API","GitHub Trending"],"performance":"200記事を1時間で収集・要約","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"APIキー","dataHandling":"公開情報のみ","compliance":["著作権法準拠"]},
      "support": {"channel":"GitHubイシュー","sla":"ベストエフォート"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/tech1/800/450",
        "https://picsum.photos/seed/tech2/800/450",
        "https://picsum.photos/seed/tech3/800/450"
      ]
    },
    {
      "id": 21, "title": "法令・規制情報検索AI", "category": "research",
      "views": 680, "uniqueViews": 214, "likes": 4, "published": "2026-01-15",
      "owner": "村田 律子", "description": "法令・規制・ガイドラインをAIが検索・解釈。法務・コンプライアンス担当者が素早く関連条文を特定し、リスク判断を下せるようサポートします。",
      "rating": 4.3, "ratingCount": 28, "certified": true, "difficulty": "中",
      "department": "法務・コンプライアンス本部",
      "effect": "法令調査工数を55%削減。コンプライアンスリスクの見落としを防止。",
      "testimonials": [{"role":"法務担当","text":"条文の引用と解釈が瞬時にできます。"},{"role":"コンプライアンス部長","text":"改正法の影響範囲を素早く把握できるようになりました。"}],
      "useCases": ["契約審査での法令確認","新規事業の規制リスク調査","法改正の業務影響分析"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["e-Gov","LegalForce","総務省法令データ提供システム"],"performance":"法令データベース横断検索を10秒以内","customizable":false},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"多要素認証（MFA）","dataHandling":"検索クエリはログ保存なし","compliance":["弁護士法との併用ガイドライン準拠"]},
      "support": {"channel":"専用サポート電話","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/legal1/800/450",
        "https://picsum.photos/seed/legal2/800/450",
        "https://picsum.photos/seed/legal3/800/450"
      ]
    },
    {
      "id": 22, "title": "営業提案書生成エージェント", "category": "sales",
      "views": 1280, "uniqueViews": 432, "likes": 10, "published": "2026-04-18",
      "owner": "青木 浩二", "description": "顧客情報・ニーズをもとに、説得力のある営業提案書を自動生成。過去の成功事例・ROI試算も自動挿入し、受注確度を高めます。",
      "rating": 4.6, "ratingCount": 68, "certified": true, "difficulty": "低",
      "department": "営業本部",
      "effect": "提案書作成工数を70%削減。受注率を15%向上。",
      "testimonials": [{"role":"営業部長","text":"ベテランと同じ品質の提案書を若手でも出せるようになりました。"},{"role":"営業担当","text":"顧客ごとのカスタマイズが素早くできます。"}],
      "useCases": ["新規顧客向け提案書の自動生成","既存顧客へのアップセル提案","ROI試算付き提案資料の作成"],
      "tech": {"model":"GPT-4o","integrations":["Salesforce","HubSpot","PowerPoint","Excel"],"performance":"A4 8ページを3分で生成","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"顧客情報は暗号化送信","compliance":["顧客情報管理規程準拠"]},
      "support": {"channel":"専用Teamsチャネル","sla":"翌営業日以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/salesai1/800/450",
        "https://picsum.photos/seed/salesai2/800/450",
        "https://picsum.photos/seed/salesai3/800/450"
      ]
    },
    {
      "id": 23, "title": "顧客ニーズ分析AI", "category": "sales",
      "views": 900, "uniqueViews": 296, "likes": 6, "published": "2026-03-14",
      "owner": "池田 さおり", "description": "顧客との会話ログ・メール・アンケートを解析し、潜在ニーズ・課題・関心領域を自動抽出。パーソナライズされたアプローチ戦略を提案します。",
      "rating": 4.4, "ratingCount": 41, "certified": false, "difficulty": "中",
      "department": "営業本部",
      "effect": "顧客分析工数を50%削減。クロスセル成功率が20%向上。",
      "testimonials": [{"role":"アカウントマネージャー","text":"顧客の本音を引き出すヒントが得られます。"},{"role":"CRM担当","text":"顧客データが活きた情報になりました。"}],
      "useCases": ["顧客面談の事前準備支援","提案テーマの優先順位付け","解約リスク顧客の早期検出"],
      "tech": {"model":"GPT-4o","integrations":["Salesforce","HubSpot","Zendesk","SurveyMonkey"],"performance":"1000件の会話ログを20分で分析","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"個人情報は自動マスキング","compliance":["個人情報保護法準拠","顧客情報管理規程準拠"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/crm1/800/450",
        "https://picsum.photos/seed/crm2/800/450",
        "https://picsum.photos/seed/crm3/800/450"
      ]
    },
    {
      "id": 24, "title": "商談サポートエージェント", "category": "sales",
      "views": 720, "uniqueViews": 228, "likes": 5, "published": "2026-02-05",
      "owner": "藤田 健", "description": "商談前の準備から議事録作成、フォローアップメールまでを一気通貫でサポート。商談後即座に次のアクションを提案します。",
      "rating": 4.3, "ratingCount": 32, "certified": false, "difficulty": "低",
      "department": "営業本部",
      "effect": "商談準備時間を60%削減。成約までのリードタイムを短縮。",
      "testimonials": [{"role":"営業担当","text":"商談後すぐに議事録とネクストアクションが届きます。"},{"role":"SalesOps","text":"商談の質が標準化されました。"}],
      "useCases": ["商談前の企業・担当者リサーチ","商談中のリアルタイム支援","フォローアップメールの自動作成"],
      "tech": {"model":"GPT-4o + Whisper","integrations":["Zoom","Teams","Salesforce","Calendar"],"performance":"60分商談を5分でサマリー","customizable":true},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"録音データは商談後削除","compliance":["録音同意取得フロー内蔵"]},
      "support": {"channel":"メールサポート","sla":"翌営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/deal1/800/450",
        "https://picsum.photos/seed/deal2/800/450",
        "https://picsum.photos/seed/deal3/800/450"
      ]
    },
    {
      "id": 25, "title": "契約書レビューAI", "category": "review",
      "views": 1100, "uniqueViews": 376, "likes": 8, "published": "2026-04-25",
      "owner": "吉田 明子", "description": "契約書を自動解析し、不利な条項・抜け漏れ・リスクポイントをハイライト。修正案も自動生成し、法務レビューの時間を大幅に短縮します。",
      "rating": 4.7, "ratingCount": 63, "certified": true, "difficulty": "中",
      "department": "法務・コンプライアンス本部",
      "effect": "契約書レビュー時間を65%削減。契約リスクの見落としを90%防止。",
      "testimonials": [{"role":"法務部長","text":"契約書の初回チェックが完全自動化されました。"},{"role":"事業担当","text":"法務に依頼する前にリスクを確認できるので助かります。"}],
      "useCases": ["NDA・秘密保持契約のレビュー","業務委託契約の自動チェック","修正条項の自動提案"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["DocuSign","Adobe Sign","Google Docs","Word"],"performance":"A4 20ページを3分でレビュー","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"多要素認証（MFA）","dataHandling":"契約書は解析後即時削除","compliance":["弁護士法准拠ガイドライン","機密情報取扱規程"]},
      "support": {"channel":"専用サポート電話","sla":"4時間以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/contract1/800/450",
        "https://picsum.photos/seed/contract2/800/450",
        "https://picsum.photos/seed/contract3/800/450",
        "https://picsum.photos/seed/contract4/800/450"
      ]
    },
    {
      "id": 26, "title": "セキュリティ診断エージェント", "category": "review",
      "views": 860, "uniqueViews": 278, "likes": 6, "published": "2026-03-02",
      "owner": "川口 誠", "description": "コード・設定ファイル・インフラ構成をスキャンし、セキュリティ脆弱性を自動検出。CVSSスコアと修正優先度をレポート形式で提示します。",
      "rating": 4.5, "ratingCount": 47, "certified": true, "difficulty": "高",
      "department": "情報セキュリティ本部",
      "effect": "脆弱性検出率を従来比40%向上。対応工数を35%削減。",
      "testimonials": [{"role":"セキュリティエンジニア","text":"OWASP Top 10の網羅的チェックが自動化されました。"},{"role":"CISO","text":"セキュリティリスクの定量把握が格段に向上しました。"}],
      "useCases": ["アプリケーションの脆弱性スキャン","インフラ設定のセキュリティチェック","依存ライブラリの既知脆弱性検出"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["GitHub","GitLab","Snyk","OWASP ZAP"],"performance":"1万行コードを5分でスキャン","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0 + MFA","dataHandling":"コードはスキャン後即時削除","compliance":["SOC2 Type II","ISO 27001準拠"]},
      "support": {"channel":"専用緊急連絡先（24/7）","sla":"1時間以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/security1/800/450",
        "https://picsum.photos/seed/security2/800/450",
        "https://picsum.photos/seed/security3/800/450"
      ]
    },
    {
      "id": 27, "title": "コンプライアンスチェックAI", "category": "review",
      "views": 680, "uniqueViews": 214, "likes": 4, "published": "2026-02-18",
      "owner": "野口 恵美", "description": "業務文書・マニュアル・公開情報をスキャンし、コンプライアンス違反リスクを自動検出。改善提案と根拠条文を併記したレポートを生成します。",
      "rating": 4.3, "ratingCount": 25, "certified": true, "difficulty": "中",
      "department": "法務・コンプライアンス本部",
      "effect": "コンプライアンス違反リスクの見落としを75%削減。監査対応工数を40%削減。",
      "testimonials": [{"role":"内部監査担当","text":"監査前のプレチェックに欠かせないツールです。"},{"role":"コンプライアンス担当","text":"根拠条文まで示してくれるので説明責任を果たしやすくなりました。"}],
      "useCases": ["社内規程・マニュアルのコンプライアンスチェック","広告・PR文書の表現チェック","個人情報取扱状況の定期監査"],
      "tech": {"model":"Claude 3.5 Sonnet","integrations":["SharePoint","Confluence","Teams"],"performance":"A4 100ページを10分でスキャン","customizable":false},
      "api": {"available":false,"docUrl":"#"},
      "security": {"auth":"Active Directory","dataHandling":"社内データは社内処理","compliance":["個人情報保護法","各種業法対応ルールセット内蔵"]},
      "support": {"channel":"メールサポート","sla":"2営業日以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/compliance1/800/450",
        "https://picsum.photos/seed/compliance2/800/450",
        "https://picsum.photos/seed/compliance3/800/450"
      ]
    },
    {
      "id": 28, "title": "テストケース自動生成エージェント", "category": "test",
      "views": 960, "uniqueViews": 316, "likes": 7, "published": "2026-04-03",
      "owner": "上田 修", "description": "仕様書・コードからテストケースを自動生成。境界値・異常系・セキュリティテストまで網羅的なテスト設計を支援します。",
      "rating": 4.5, "ratingCount": 51, "certified": false, "difficulty": "低",
      "department": "開発・SE本部",
      "effect": "テスト設計工数を55%削減。テストカバレッジを平均30%向上。",
      "testimonials": [{"role":"QAエンジニア","text":"境界値テストの網羅的な生成が素晴らしいです。"},{"role":"テストマネージャー","text":"テストケースの品質が均一化されました。"}],
      "useCases": ["単体テストケースの自動生成","結合テスト観点の抽出","回帰テストスイートの自動更新"],
      "tech": {"model":"GPT-4o","integrations":["Jira","TestRail","GitHub","VS Code"],"performance":"仕様書10ページから100件のテストケースを5分で生成","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"OAuth 2.0","dataHandling":"仕様書は処理後削除","compliance":["ISO/IEC 29119テスト規格準拠"]},
      "support": {"channel":"GitHubイシュー","sla":"48時間以内"},
      "pick": false,
      "images": [
        "https://picsum.photos/seed/testcase1/800/450",
        "https://picsum.photos/seed/testcase2/800/450",
        "https://picsum.photos/seed/testcase3/800/450"
      ]
    },
    {
      "id": 29, "title": "社内ヘルプデスクAI", "category": "service",
      "views": 1480, "uniqueViews": 512, "likes": 12, "published": "2026-05-08",
      "owner": "坂本 結", "description": "社内FAQデータベースと連携し、IT・HR・経理に関する問い合わせに24時間自動対応。解決できない場合は担当者へシームレスにエスカレーション。",
      "rating": 4.6, "ratingCount": 76, "certified": true, "difficulty": "低",
      "department": "情報システム本部",
      "effect": "ヘルプデスク問い合わせの70%を自動解決。担当者の対応工数を50%削減。",
      "testimonials": [{"role":"IT担当","text":"夜間・休日の問い合わせが完全自動化されました。"},{"role":"社員","text":"すぐに回答が得られるのでストレスがなくなりました。"}],
      "useCases": ["IT機器・システム障害の初期対応","人事・福利厚生の問い合わせ対応","経費精算・申請手続きの案内"],
      "tech": {"model":"GPT-4o","integrations":["Teams","Slack","ServiceNow","社内Wiki"],"performance":"平均応答時間 2秒","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"SSO / SAML","dataHandling":"会話ログは30日後自動削除","compliance":["個人情報保護法準拠","社内情報セキュリティポリシー準拠"]},
      "support": {"channel":"専用サポートチャネル","sla":"4時間以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/helpdesk1/800/450",
        "https://picsum.photos/seed/helpdesk2/800/450",
        "https://picsum.photos/seed/helpdesk3/800/450"
      ]
    },
    {
      "id": 30, "title": "社内ナレッジ検索エージェント", "category": "knowledge",
      "views": 1140, "uniqueViews": 389, "likes": 9, "published": "2026-05-15",
      "owner": "原田 隆二", "description": "社内ドキュメント・過去案件・ノウハウをAIが横断検索。質問を自然言語で入力するだけで、関連資料と担当者を即座にリコメンドします。",
      "rating": 4.7, "ratingCount": 82, "certified": true, "difficulty": "低",
      "department": "知識管理・DX推進本部",
      "effect": "情報検索時間を80%削減。ナレッジの再活用率が3倍に向上。",
      "testimonials": [{"role":"コンサルタント","text":"過去案件のナレッジを瞬時に引き出せます。"},{"role":"新入社員","text":"誰に聞けばいいかわからない時に非常に助かります。"}],
      "useCases": ["過去案件・提案書の横断検索","社内エキスパートの特定","業務マニュアル・手順書の瞬時検索"],
      "tech": {"model":"Claude 3.5 Sonnet + RAG","integrations":["SharePoint","Confluence","Google Drive","Notion"],"performance":"100万ドキュメントを3秒以内で検索","customizable":true},
      "api": {"available":true,"docUrl":"#"},
      "security": {"auth":"Active Directory","dataHandling":"権限ベースのアクセス制御","compliance":["情報分類ポリシー準拠","アクセス監査ログ保持"]},
      "support": {"channel":"専用Slackチャネル","sla":"翌営業日以内"},
      "pick": true,
      "images": [
        "https://picsum.photos/seed/knowledge1/800/450",
        "https://picsum.photos/seed/knowledge2/800/450",
        "https://picsum.photos/seed/knowledge3/800/450",
        "https://picsum.photos/seed/knowledge4/800/450"
      ]
    }
  ]
};
