// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:3333';

test.describe('もしかしてサジェスト', () => {
  test('検索結果が0件のとき関連アセットを提案する', async ({ page }) => {
    await page.goto(`${BASE}/b/agents.html`);
    await page.waitForSelector('#grid');

    // ヒットしない語 + タグにある語を組み合わせて0件にする
    await page.fill('#q', 'zzz レポート');
    await page.waitForTimeout(300);

    await expect(page.locator('#result-count')).toHaveText('0');
    await expect(page.locator('#empty')).toBeVisible();
    await expect(page.locator('#suggest-section')).toBeVisible();
    await expect(page.locator('.suggest-head')).toContainText('もしかして');
    await expect(page.locator('.suggest-card')).toHaveCount({ minimum: 1 });
    await expect(page.locator('.suggest-reason').first()).toContainText('レポート');
  });

  test('検索結果があるときサジェストは非表示', async ({ page }) => {
    await page.goto(`${BASE}/b/agents.html`);
    await page.waitForSelector('#grid');

    await page.fill('#q', 'レポート');
    await page.waitForTimeout(300);

    const count = parseInt(await page.locator('#result-count').textContent() || '0');
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('#suggest-section')).toBeHidden();
  });

  test('サジェストカードクリックでモーダルが開く', async ({ page }) => {
    await page.goto(`${BASE}/b/agents.html`);
    await page.waitForSelector('#grid');

    await page.fill('#q', 'zzz レポート');
    await page.waitForTimeout(300);

    await page.locator('.suggest-card').first().click();
    await expect(page.locator('#agent-modal.open, .modal.open')).toBeVisible();
  });
});
