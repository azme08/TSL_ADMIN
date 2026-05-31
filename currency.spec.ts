import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillInputByLabel,
    login,
    resetFilter,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Currency Layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Currency Section functionality', async ({ page }) => {
        // Nevigate to Accounting/Currency page
        await clickMenuAndOption(page, 'Accounting', 'Currency');

        // Check the page header Accounting/Currency
        const pageHeader = page.getByRole('heading', { name: 'Accounting/Currency' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Dollar');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Default input
        await fillFilterInput(filterPanel, 'True', 0);
        // Currency Code input
        await fillFilterInput(filterPanel, 'USD', 1);
        // Currecny Name input
        await fillFilterInput(filterPanel, 'Dollar', 2);
        // Symbol input
        await fillFilterInput(filterPanel, '$', 3);
        // Conversion Rate input
        await fillFilterInput(filterPanel, '1', 4);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 5);
        //Creator input
        await fillFilterInput(filterPanel, 'Admin', 6);
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
        // Toggle Column and Actions
        await toggleColumnAndActions({
            page,
            filterButton,
            toggleSearchSelector: USER_FIELD.TOGGLE_SEARCH,
            togglePanelSelector: USER_FIELD.TOGGLE_PANEL,
            toggleFieldSelector: USER_FIELD.TOGGLE_FIELD_NAME,
            downloadButtonSelector: USER_FIELD.PDF_BUTTON,
            refreshButtonSelector: USER_FIELD.REFRESH_BUTTON,
        });
    });
    test('should verify Dashboard of Currency functionality', async ({ page }) => {
        // Nevigate to Accounting/Currency page
        await clickMenuAndOption(page, 'Accounting', 'Currency');
        // Check the page header Accounting/Currency
        const pageHeader = page.getByRole('heading', { name: 'Accounting/Currency' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Default', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        //Fill Currecny Code field
        await fillInputByLabel(page, /currency code/i, 'RP');
        // Fill Currency Name field
        await fillInputByLabel(page, /currency name/i, 'Rupiah');
        // Fill Symbol field
        await fillInputByLabel(page, /symbol/i, 'Rp');
        // Fill Conversion Rate field
        await fillInputByLabel(page, /conversion rate/i, '1');
        // Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Currency functionality', async ({ page }) => {
        // Nevigate to Accounting/Currency page
        await clickMenuAndOption(page, 'Accounting', 'Currency');
        // Check the page header Accounting/Currency
        const pageHeader = page.getByRole('heading', { name: 'Accounting/Currency' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Currency page to load
        const addBuyerTitle = page.getByText('Add New Currency', { exact: true });
        await expect(addBuyerTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the Default option
        await page.getByRole('switch', { name: 'Default' }).click();
        //Fill Currecny Code field
        await fillInputByLabel(page, /currency code/i, 'R');
        // Fill Currency Name field
        await fillInputByLabel(page, /currency name/i, 'Ringit');
        // Fill Symbol field
        await fillInputByLabel(page, /symbol/i, 'Rg');
        // Fill Conversion Rate field
        await fillInputByLabel(page, /conversion rate/i, '20');
        // Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
