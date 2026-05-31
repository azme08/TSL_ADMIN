import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    deleteFirstRow,
    fillFilterInput,
    fillInputByLabel,
    login,
    navigateMenu,
    resetFilter,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../../utils';

test.describe('Unit layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Unit Section functionality', async ({ page }) => {
        // Check nevigation to Store/Unit page
        await navigateMenu(page, 'Store', 'Library', 'Unit');
        // Check the page header Store/Unit
        const pageHeader = page.getByRole('heading', { name: 'Store/Unit' });
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
        // Name input
        await fillFilterInput(filterPanel, 'feet', 0);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 1);
        // Created By input
        await fillFilterInput(filterPanel, 'Admin', 2);
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
        await deleteFirstRow(page, 'table');
    });
    test('should verify Unit Dashboard functionality', async ({ page }) => {
        // Check nevigation to Store/Unit page
        await navigateMenu(page, 'Store', 'Library', 'Unit');
        // Check the page header Store/Unit
        const pageHeader = page.getByRole('heading', { name: 'Store/Unit' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check Color Table
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            USER_FIELD.BUYER_TABLE_HEADER,
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Unit Info page to load
        const updateTitle = page.getByText('Update Unit', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'Pairs');
        //Fill "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Unit functionality', async ({ page }) => {
        // Check nevigation to Store/Unit page
        await navigateMenu(page, 'Store', 'Library', 'Unit');
        // Check the page header Store/Unit
        const pageHeader = page.getByRole('heading', { name: 'Store/Unit' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Unit Info page to load
        const addPageTitle = page.getByText('Add Unit', { exact: true });
        await expect(addPageTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'cm');
        //Fill "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
