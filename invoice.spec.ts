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
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Invoice layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Invoice Section functionality', async ({ page }) => {
        // Nevigate to Commercial/Invoice page
        await clickMenuAndOption(page, 'Commercial', 'Invoice');

        // Check the page header Commercial/Invoice
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Invoice' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'IV-110');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Invoice No Input
        await fillFilterInput(filterPanel, 'IV-110', 0);
        // Currency Input
        await fillFilterInput(filterPanel, 'USD', 1);
        // Value Input
        await fillFilterInput(filterPanel, '1000', 2);
        // File Name Input
        await fillFilterInput(filterPanel, 'invoice_110.pdf', 3);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 4);
        // Creator Input
        await fillFilterInput(filterPanel, 'Admin', 5);
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
        // Delete the first row in the table
        // await deleteFirstRow(page, 'table');
    });
    test('should verify Invoice Dashboard functionality', async ({ page }) => {
        // Nevigate to Commercial/Invoice page
        await clickMenuAndOption(page, 'Commercial', 'Invoice');

        // Check the page header Commercial/Invoice
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Invoice' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Invoice No', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Invoice page
        const updateTitle = page.getByText('Update Invoice', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Invoice No field
        await fillInputByLabel(page, /invoice no/i, 'IV-111');
        // Currency Dropdown
        await selectDropdown(page, 'EU (E)', '[role="combobox"]:nth(1)');
        //Fill Value field
        await fillInputByLabel(page, /value/i, '1000');
        //Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Invoice functionality', async ({ page }) => {
        // Nevigate to Commercial/Invoice page
        await clickMenuAndOption(page, 'Commercial', 'Invoice');
        // Check the page header Commercial/Invoice
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Invoice' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Invoice page to load
        const addTitle = page.getByText('Add Invoice', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Invoice No field
        await fillInputByLabel(page, /invoice no/i, 'IV-112');
        // Invoice Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Currency Dropdown
        await selectDropdown(page, 'EU (E)', '[role="combobox"]:nth(1)');
        //Fill Value field
        await fillInputByLabel(page, /value/i, '1500');
        //Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
