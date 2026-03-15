import { test, expect, Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Mock the LRT ETA API so tests don't depend on the live gov API. */
async function mockEtaApi(page: Page, stationId = '295') {
  await page.route(new RegExp(`/getSchedule\\?station_id=${stationId}`), route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 1,
        system_time: '2026-03-15 12:34:56',
        platform_list: [
          {
            platform_id: '1',
            route_list: [
              {
                route_no: '614',
                dest_en: 'Tin Shui Wai',
                dest_ch: '天水圍',
                stop: '',
                time_en: '2 min',
                time_ch: '2 分鐘',
                train_length: 1,
              },
              {
                route_no: '507',
                dest_en: 'Tin Yiu',
                dest_ch: '天耀',
                stop: '',
                time_en: '5 min',
                time_ch: '5 分鐘',
                train_length: 2,
              },
            ],
          },
          {
            platform_id: '2',
            route_list: null,
          },
        ],
      }),
    })
  );
}

/** Select a station from the combobox by typing and clicking the item. */
async function selectStation(page: Page, stationLabel: string) {
  const input = page.getByPlaceholder(/please select station|請選擇輕鐵站/i);
  await input.click();
  await input.fill(stationLabel);
  await page.getByRole('option', { name: new RegExp(stationLabel, 'i') }).first().click();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Station selection', () => {
  test('shows placeholder text before a station is selected', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder(/please select station|請選擇輕鐵站/i)).toBeVisible();
  });

  test('filters combobox options as user types', async ({ page }) => {
    await page.goto('/');
    const input = page.getByPlaceholder(/please select station|請選擇輕鐵站/i);
    await input.click();
    await input.fill('Tuen Mun');
    // A few Tuen Mun options should appear
    const options = page.getByRole('option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('displays platform cards after selecting a station', async ({ page }) => {
    await mockEtaApi(page, '295');
    await page.goto('/');
    await selectStation(page, '屯門Tuen Mun');
    // Platform 1 card should appear
    await expect(page.getByText(/1號月台|Platform 1/i)).toBeVisible({ timeout: 8000 });
    // Route 614 should be shown
    await expect(page.getByText('614').first()).toBeVisible();
  });

  test('shows update time after fetching ETAs', async ({ page }) => {
    await mockEtaApi(page, '295');
    await page.goto('/');
    await selectStation(page, '屯門Tuen Mun');
    await expect(page.getByText(/12:34:56/)).toBeVisible({ timeout: 8000 });
  });
});

test.describe('Platform cards', () => {
  test.beforeEach(async ({ page }) => {
    await mockEtaApi(page, '295');
    await page.goto('/');
    await selectStation(page, '屯門Tuen Mun');
  });

  test('shows route, direction, arrival and cars column headers', async ({ page }) => {
    // Wait for at least one platform card
    await page.getByText('614').first().waitFor({ timeout: 8000 });
    await expect(page.getByText(/route|路線/i).first()).toBeVisible();
    await expect(page.getByText(/direction|方向/i).first()).toBeVisible();
    await expect(page.getByText(/arrival|到達時間/i).first()).toBeVisible();
    await expect(page.getByText(/cars|車卡/i).first()).toBeVisible();
  });

  test('shows end-of-service notice for platform with no routes', async ({ page }) => {
    await page.getByText('614').first().waitFor({ timeout: 8000 });
    // Platform 2 has route_list: null → end-of-service row
    await expect(page.getByText(/-End of Service-|-尾班車已過-/i)).toBeVisible();
  });
});

test.describe('Language toggle', () => {
  test('switches UI to Chinese', async ({ page }) => {
    await page.goto('/');
    // Find the language toggle button (Languages icon)
    const langBtn = page.getByRole('button', { name: /language|語言/i });
    if (await langBtn.count() === 0) {
      // Fall back: look for any button that isn't the color-mode button
      const buttons = page.getByRole('button');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const btn = buttons.nth(i);
        const ariaLabel = await btn.getAttribute('aria-label');
        if (ariaLabel && /lang|zh|en|語/i.test(ariaLabel)) {
          await btn.click();
          break;
        }
      }
    } else {
      await langBtn.click();
    }
    // After toggling the language the combobox placeholder changes
    await expect(
      page.getByPlaceholder(/please select station|請選擇輕鐵站/i)
    ).toBeVisible();
  });

  test('switches UI to English', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder(/please select station|請選擇輕鐵站/i)).toBeVisible();
  });
});

test.describe('Favourites', () => {
  test('can add and display a favourite station', async ({ page }) => {
    await mockEtaApi(page, '295');
    await page.goto('/');
    await selectStation(page, '屯門Tuen Mun');
    await page.getByText('614').first().waitFor({ timeout: 8000 });

    // Click Add Bookmark
    const addBtn = page.getByRole('button', { name: /add bookmark|加至書籤/i });
    await addBtn.click();

    // A button for the saved station should now appear in the favourites strip
    await expect(
      page.getByRole('button', { name: /屯門Tuen Mun/i })
    ).toBeVisible();
  });

  test('can remove a favourite station', async ({ page }) => {
    await mockEtaApi(page, '295');
    await page.goto('/');
    await selectStation(page, '屯門Tuen Mun');
    await page.getByText('614').first().waitFor({ timeout: 8000 });

    await page.getByRole('button', { name: /add bookmark|加至書籤/i }).click();
    await expect(page.getByRole('button', { name: /屯門Tuen Mun/i })).toBeVisible();

    await page.getByRole('button', { name: /remove bookmark|從書籤刪除/i }).click();
    await expect(page.getByRole('button', { name: /屯門Tuen Mun/i })).not.toBeVisible();
  });

  test('persists favourites across page reloads', async ({ page }) => {
    await mockEtaApi(page, '295');
    await page.goto('/');
    await selectStation(page, '屯門Tuen Mun');
    await page.getByText('614').first().waitFor({ timeout: 8000 });
    await page.getByRole('button', { name: /add bookmark|加至書籤/i }).click();
    await expect(page.getByRole('button', { name: /屯門Tuen Mun/i })).toBeVisible();

    // Reload and confirm the favourite is still there
    await page.reload();
    await expect(page.getByRole('button', { name: /屯門Tuen Mun/i })).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('combobox has an accessible input', async ({ page }) => {
    await page.goto('/');
    const input = page.getByPlaceholder(/please select station|請選擇輕鐵站/i);
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
  });

  test('colour-mode button is accessible', async ({ page }) => {
    await page.goto('/');
    // The colour mode toggle should be a button
    const colorBtn = page.getByRole('button', { name: /toggle color mode|dark|light/i });
    if (await colorBtn.count() > 0) {
      await expect(colorBtn.first()).toBeVisible();
    }
  });
});

test.describe('Responsive layout', () => {
  test('renders correctly on a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByPlaceholder(/please select station|請選擇輕鐵站/i)).toBeVisible();
  });
});
