import json
from pathlib import Path

p = Path(r"c:\Users\kmori13616\OneDrive - 株式会社ベイカレント\HTC\AA4H\aa4h-forest-rangers\data\test.json")
obj = json.loads(p.read_text(encoding='utf-8'))

# helper generators
owner_template = lambda i, theme: {
    "mapping_id": 40000 + i,
    "ownership_type": "Owner",
    "is_owner": 1,
    "id": 2000 + i,
    "full_name": f"User {i} {theme}",
    "email_id": f"user{i}.{theme.replace(' ','').lower()}@example.com",
    "inactive": False,
    "is_verified": True
}

creator_template = lambda i, theme: {
    "id": 3000 + i,
    "first_name": f"Creator{i}",
    "last_name": theme.split()[0] if theme else "Team",
    "full_name": f"Creator{i} {theme}",
    "email_id": f"creator{i}@example.com",
    "inactive": False,
    "is_verified": True
}

moderator_template = lambda i: {
    "id": 500 + i,
    "first_name": f"Mod{i}",
    "last_name": "Sato",
    "full_name": f"Mod{i} Sato",
    "email_id": f"mod{i}@example.com",
    "inactive": False,
    "is_listener": False,
    "status": None
}

capability_template = lambda i, c_name, title: {
    "id": 100 + i,
    "c_name": c_name,
    "title": title,
    "is_exclusive": False,
    "is_featured": False,
    "capability_type": {"id": 38, "c_name": "technology", "title": "Technology"},
    "sub_capabilities": [],
    "sub_capabilities_count": 0,
    "translations": [{"id": 100 + i, "capability_id": 100 + i, "title": title, "language_code": "ja"}],
    "parent": None,
    "mapping_id": 60000 + i
}

stats_template = lambda views: {
    "view_count": views,
    "unique_view_count": max(1, views - 1),
    "download_count": 0,
    "unique_download_count": 0,
    "open_download_count": 0,
    "in_moderation_download_count": 0,
    "published_download_count": 0,
    "like_count": 0,
    "dislike_count": 0,
    "comment_count": 0,
    "open_comment_count": 0,
    "in_moderation_comment_count": 0,
    "published_comment_count": 0,
    "utilization_report_count": 0
}

# themes mapping to simplified capability names
themes = [
    "資料・文書作成",
    "開発・コード支援",
    "データ分析・診断",
    "情報収集・調査",
    "営業・顧問対応",
    "レビュー・チェック",
    "テスト・品質保証",
    "サービス・プロダクト",
    "ナレッジ・業務支援"
]

for idx, asset in enumerate(obj.get('assets', []), start=1):
    theme = themes[(idx - 1) % len(themes)]
    # owners
    if not asset.get('owners'):
        asset['owners'] = [owner_template(idx, theme)]
    # creator
    if not asset.get('creator') or asset.get('creator') == {}:
        asset['creator'] = creator_template(idx, theme)
    # moderators
    if not asset.get('moderators'):
        asset['moderators'] = [moderator_template(idx), moderator_template(idx+1)]
    # capabilities
    if not asset.get('capabilities'):
        # pick a capability based on theme
        c_name = 'ai-agent' if '開発' in theme or 'AI' in theme or '開発' in theme else 'template'
        asset['capabilities'] = [capability_template(idx, c_name, theme + " 向けAIエージェント")]
    # stats
    if not asset.get('stats') or asset.get('stats') == {}:
        asset['stats'] = stats_template(views=10 + (idx % 5) * 3)

# write back to a new file to be safe
out = p.with_name('test_filled.json')
out.write_text(json.dumps(obj, ensure_ascii=False, indent=4), encoding='utf-8')
print('WROTE', out)
