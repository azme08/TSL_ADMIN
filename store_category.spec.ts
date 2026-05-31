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

test.describe('Categrory layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Category Section functionality', async ({ page }) => {
        // Check nevigation to Store/Category page
        await navigateMenu(page, 'Store', 'Library', 'Color');
        // Check the page header Store/Category
        const pageHeader = page.getByRole('heading', { name: 'Store/Category' });
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
        await fillFilterInput(filterPanel, 'Accessories', 0);
        // Remarks input
        await fillFilterInput(filterPanel, 'Category Remarks', 1);
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
    test('should verify Category Table Section functionality', async ({ page }) => {
        // Check nevigation to Store/Category page
        await navigateMenu(page, 'Store', 'Library', 'Color');
        // Check the page header Store/Category
        const pageHeader = page.getByRole('heading', { name: 'Store/Category' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check Table
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
        // Wait for Update Category page to load
        const addTitle = page.getByText('Update Category', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'Chemical');
        //Fill "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Material functionality', async ({ page }) => {
        // Check nevigation to Store/Category page
        await navigateMenu(page, 'Store', 'Library', 'Color');
        // Check the page header Store/Category
        const pageHeader = page.getByRole('heading', { name: 'Store/Category' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Category Info page to load
        const addCategoryTitle = page.getByText('Add Category', { exact: true });
        await expect(addCategoryTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'Packing');
        //Fill "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
