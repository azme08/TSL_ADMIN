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

test.describe('Material layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Material Section functionality', async ({ page }) => {
        // Check nevigation to Store/Material page
        await navigateMenu(page, 'Store', 'Library', 'Material');
        // Check the page header Store/Material
        const pageHeader = page.getByRole('heading', { name: 'Store/Material' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test Material');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Name input
        await fillFilterInput(filterPanel, 'Material 1', 0);
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

    test('should verify Material Table Section functionality', async ({ page }) => {
        // Check nevigation to Store/Material page
        await navigateMenu(page, 'Store', 'Library', 'Material');
        // Check the page header Store/Material
        const pageHeader = page.getByRole('heading', { name: 'Store/Material' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check Material Table
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            USER_FIELD.BUYER_TABLE_HEADER,
            'Ascending', // or 'Descending'
            TEST_TIME['5min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['5min']);
        // Wait for update Material Info page to load
        const updateTitle = page.getByText('Update Material', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['5min'] });
        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'Ink');
        //Fill "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });
    test('should verify add Material functionality', async ({ page }) => {
        // Check nevigation to Store/Material page
        await navigateMenu(page, 'Store', 'Library', 'Material');
        // Check the page header Store/Material
        const pageHeader = page.getByRole('heading', { name: 'Store/Material' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['5min']);
        // Wait for Add Material Info page to load
        const addTitle = page.getByText('Add Material', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['5min'] });
        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'Bolly');
        //Fill "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });
});
