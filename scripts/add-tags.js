"use strict";
const fs   = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/test.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// tag → asset IDs
const tagMap = {
  "Excel対応":  [7004, 7022, 7040, 8025, 8036, 8000, 8018],
  "Outlook連携":[8016, 8029, 8047],
  "API連携":    [7038, 8026, 8001, 8010, 8018, 8000],
  "CI/CD対応":  [8004, 8008, 8017, 8031, 8039, 8049],
  "ノーコード": [8040, 8015, 8024, 8005],
  "チャットBot":[8006, 8042, 8010],
  "CRM連携":    [8002, 8011, 8029, 8038, 8047],
  "ダッシュボード":[7040, 8000, 8009, 8018, 8027, 8041],
  "自動通知":   [8001, 8010, 8027, 8028, 8037, 8046],
  "テンプレート":[7000, 7004, 7012, 7018, 7022, 7032, 7036, 7046, 7052, 7054],
};

// invert: assetId → [tags]
const assetTags = {};
Object.entries(tagMap).forEach(([tag, ids]) => {
  ids.forEach(id => {
    if (!assetTags[id]) assetTags[id] = [];
    assetTags[id].push(tag);
  });
});

let updated = 0;
data.assets.forEach(a => {
  a.tags = assetTags[a.id] || [];
  if (a.tags.length) updated++;
});

console.log(`Tagged ${updated} / ${data.assets.length} assets`);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), "utf8");

// regenerate test.js
const jsPath = path.join(__dirname, "../data/test.js");
fs.writeFileSync(jsPath, "window.ASSETS_DATA = " + JSON.stringify(data) + ";", "utf8");
console.log("test.js regenerated. Done.");
