import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillColumnInput,
    //deleteFirstRow,
    fillFilterInput,
    login,
    resetFilter,
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Production layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Production Section functionality', async ({ page }) => {
        // Nevigate to Commercial/Production page
        await clickMenuAndOption(page, 'Commercial', 'Production');

        // Check the page header Commercial/Production
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Production' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Black');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // ID input
        await fillFilterInput(filterPanel, 'PL25-78', 0);
        // pACKING lIST eNTRY ID input
        await fillFilterInput(filterPanel, 'RBR-251020-1 313 2009 3-SEPIA', 1);
        // Date input
        await fillFilterInput(filterPanel, '15 Feb, 2026', 2);
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
        // Delete the first row in the table
        // await deleteFirstRow(page, 'table');
    });
    test('should verify Production Dashboard functionality', async ({ page }) => {
        // Nevigate to Commercial/Production page
        await clickMenuAndOption(page, 'Commercial', 'Production');
        // Check the page header Commercial/Production
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Production' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });

        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'ID', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Add Export Document Info page to load
        const updateTitle = page.getByText('Export Document Info', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });

        //Fill the Quantity
        await fillColumnInput({
            page,
            columnName: '41',
            inputLocator: 'xpath=//input[contains(@id,"41") and contains(@id,".0.")]',
            value: '50',
        });
        //Fill the Quantity
        await fillColumnInput({
            page,
            columnName: '42',
            inputLocator: 'xpath=//input[contains(@id,"42") and contains(@id,".0.")]',
            value: '50',
        });
        //Fill the Quantity
        await fillColumnInput({
            page,
            columnName: '43',
            inputLocator: 'xpath=//input[contains(@id,"43") and contains(@id,".0.")]',
            value: '50',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add new Production Document functionality', async ({ page }) => {
        // Nevigate to Commercial/Production page
        await clickMenuAndOption(page, 'Commercial', 'Production');
        // Check the page header Commercial/Production
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Production' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add production Info page to load
        const addPageTitle = page.getByText('Production Info', { exact: true });
        await expect(addPageTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Packing List Dropdown
        await selectDropdown(page, 'S26-105-RBR Group', '[role="combobox"]:nth(0)');
        // Production Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        //Fill the Quantity
        await fillColumnInput({
            page,
            columnName: '26',
            inputLocator: 'xpath=//input[contains(@id,"26") and contains(@id,".0.")]',
            value: '50',
        });
        await fillColumnInput({
            page,
            columnName: '27',
            inputLocator: 'xpath=//input[contains(@id,"27") and contains(@id,".0.")]',
            value: '50',
        });
        await fillColumnInput({
            page,
            columnName: '26',
            inputLocator: 'xpath=//input[contains(@id,"26") and contains(@id,".1.")]',
            value: '50',
        });
        await fillColumnInput({
            page,
            columnName: '27',
            inputLocator: 'xpath=//input[contains(@id,"27") and contains(@id,".1.")]',
            value: '50',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
