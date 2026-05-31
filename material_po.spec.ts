import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillColumnInput,
    fillFilterInput,
    login,
    navigateToSection,
    resetFilter,
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Material PO layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Material PO Dashboard functionality', async ({ page }) => {
        // Check nevigation to Store/Material PO page
        await navigateToSection(page, 'Store', 'Material PO');
        // Verify that Material PO page loaded
        await page.waitForURL(/\/store\/material-po/, { timeout: TEST_TIME['1min'] });
        await expect(page.getByText('Material PO', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Store/Material PO
        const pageHeader = page.getByRole('heading', { name: 'Store/Material PO' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test Name');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Supplier Input
        await fillFilterInput(filterPanel, 'Test Supplier', 0);
        // Indent Sheet input
        await fillFilterInput(filterPanel, 'true', 1);
        // File Name Input
        await fillFilterInput(filterPanel, 'test_file.pdf', 2);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 3);
        // Creator input
        await fillFilterInput(filterPanel, 'Admin', 4);
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
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['5min'] });

        await sortTableByColumn(
            page,
            table,
            'ID',
            'Ascending', // or 'Descending'
            TEST_TIME['5min']
        );
        // Action Button and its options
        // Locate first row in table body
        const first_Row = table.locator('tbody tr').first();
        await expect(first_Row).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);

        //Fill the Requested Quantity
        await fillColumnInput({
            page,
            columnName: 'Requested Quantity',
            inputLocator: 'xpath=//input[contains(@id,"requested_quantity") and contains(@id,".0.")]',
            value: '50',
        });

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });

    test('should verify Material PO Section functionality', async ({ page }) => {
        // Check nevigation to Store/Material PO page
        await navigateToSection(page, 'Store', 'Material PO');
        // Verify that Material PO page loaded
        await page.waitForURL(/\/store\/material-po/, { timeout: TEST_TIME['1min'] });
        await expect(page.getByText('Material PO', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the page header Store/Material PO
        const pageHeader = page.getByRole('heading', { name: 'Store/Material PO' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Material PO Info page to load
        const addMaterialPOTitle = page.getByText('Material PO Info', { exact: true });
        await expect(addMaterialPOTitle).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Check Supplier Dropdown
        await selectDropdown(page, 'Bolly', '[role="combobox"]:nth(0)');
        // Check Summary Dropdown
        await selectDropdown(page, 'S26-108-Karle HK', '[role="combobox"]:nth(1)');
        // Check PO Type Dropdown
        await selectDropdown(page, 'Import', '[role="combobox"]:nth(2)');
        // Check the Indent option
        await page.getByRole('switch', { name: 'Indent Sheet' }).click();

        //Fill the Requested Quantity
        await fillColumnInput({
            page,
            columnName: 'Requested Quantity',
            inputLocator: 'xpath=//input[contains(@id,"requested_quantity") and contains(@id,".0.")]',
            value: '50',
        });

        await fillColumnInput({
            page,
            columnName: 'Requested Quantity',
            inputLocator: 'xpath=//input[contains(@id,"requested_quantity") and contains(@id,".1.")]',
            value: '50',
        });

        await fillColumnInput({
            page,
            columnName: 'Requested Quantity',
            inputLocator: 'xpath=//input[contains(@id,"requested_quantity") and contains(@id,".2.")]',
            value: '50',
        });
        await fillColumnInput({
            page,
            columnName: 'Requested Quantity',
            inputLocator: 'xpath=//input[contains(@id,"requested_quantity") and contains(@id,".3.")]',
            value: '50',
        });

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });
});
