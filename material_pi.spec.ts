import { expect, test } from '@playwright/test';

import {
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillColumnInput,
    fillFilterInput,
    login,
    resetFilter,
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Material PI layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify new Material PI functionality', async ({ page }) => {
        // Nevigate to Store/Material PI page
        await clickMenuAndOption(page, 'Store', 'Material PI');
        // Check the page header Store/Material PI
        const pageHeader = page.getByRole('heading', { name: 'Store/Material PI' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Material PI page to load
        const addMaterialPITitle = page.getByText('Material PI Info', { exact: true });
        await expect(addMaterialPITitle).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Material PO Dropdown
        await selectDropdown(page, 'MP26-44', '[role="combobox"]:nth(0)');
        // B2B LC Dropdown
        await selectDropdown(page, 'B2B-3-163', '[role="combobox"]:nth(1)');
        // Invoice Dropdown
        await selectDropdown(page, 'IV-110', '[role="combobox"]:nth(2)');
        // Currency Dropdown
        await selectDropdown(page, 'EU (E)', '[role="combobox"]:nth(3)');
        // Fill the Received Quantity
        await fillColumnInput({
            page,
            columnName: 'Received Quantity',
            inputLocator: 'xpath=//input[contains(@id,"received_quantity") and contains(@id,".0.")]',
            value: '10',
        });
        // Fill the Unit Price
        await fillColumnInput({
            page,
            columnName: 'Unit Price',
            inputLocator: 'xpath=//input[contains(@id,"unit_price") and contains(@id,".0.")]',
            value: '1.2',
        });
        // Fill thr Second Row
        // Fill the Received Quantity
        await fillColumnInput({
            page,
            columnName: 'Received Quantity',
            inputLocator: 'xpath=//input[contains(@id,"received_quantity") and contains(@id,".1.")]',
            value: '10',
        });
        // Fill the Unit Price
        await fillColumnInput({
            page,
            columnName: 'Unit Price',
            inputLocator: 'xpath=//input[contains(@id,"unit_price") and contains(@id,".1.")]',
            value: '1.2',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });
    test('should verify Material PI Dashboard functionality', async ({ page }) => {
        // Nevigate to Store/Material PI page
        await clickMenuAndOption(page, 'Store', 'Material PI');
        // Check the page header Store/Material PI
        const pageHeader = page.getByRole('heading', { name: 'Store/Material PI' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
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
        await fillFilterInput(filterPanel, 'Adidas', 0);
        // B2B LC No Input
        await fillFilterInput(filterPanel, 'B2B-1', 1);
        // Invoice No Input
        await fillFilterInput(filterPanel, 'IV-1', 2);
        // File No Input
        await fillFilterInput(filterPanel, 'MP26-36', 3);
        // Currency Input
        await fillFilterInput(filterPanel, 'Euro', 4);
        // Conversion Rate Input
        await fillFilterInput(filterPanel, '120', 5);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 6);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 7);
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
        await fillColumnInput({
            page,
            columnName: 'Received Quantity',
            inputLocator: 'xpath=//input[contains(@id,"received_quantity") and contains(@id,".1.")]',
            value: '50',
        });
        await fillColumnInput({
            page,
            columnName: 'Unit Price',
            inputLocator: 'xpath=//input[contains(@id,"unit_price") and contains(@id,".1.")]',
            value: '1.5',
        });

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });
});
