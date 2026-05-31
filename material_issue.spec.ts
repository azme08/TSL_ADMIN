import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
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

test.describe('Material Issue layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Dashboard of Material Issue functionality', async ({ page }) => {
        // Nevigate to Store/Material Issue page
        await clickMenuAndOption(page, 'Store', 'Material Issue');
        // Check the page header Store/Material PO
        const pageHeader = page.getByRole('heading', { name: 'Store/Material Issue' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'RMH26-8');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 0);
        // Created By input
        await fillFilterInput(filterPanel, 'Admin', 1);
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
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Add Supplier Info page to load
        const updateTitle = page.getByText('Information', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill the Transfer Quantity
        await fillColumnInput({
            page,
            columnName: 'Transfer',
            inputLocator: 'xpath=//input[contains(@id,"transfer") and contains(@id,".0.")]',
            value: '5',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify Material Issue functionality', async ({ page }) => {
        // Nevigate to Store/Material Issue page
        await clickMenuAndOption(page, 'Store', 'Material Issue');
        // Check the page header Store/Material PO
        const pageHeader = page.getByRole('heading', { name: 'Store/Material Issue' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for material issue Info page to load
        const addMaterialIssueTitle = page.getByText('Information', { exact: true });
        await expect(addMaterialIssueTitle).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Check Summary Drop down
        await selectDropdown(page, 'S26-105-RBR Group', '[role="combobox"]:nth(0)');
        //Fill the Transfer Quantity
        await fillColumnInput({
            page,
            columnName: 'Transfer',
            inputLocator: 'xpath=//input[contains(@id,"transfer") and contains(@id,".0.")]',
            value: '5',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
