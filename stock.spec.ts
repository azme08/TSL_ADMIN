import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    login,
    resetFilter,
    selectDropdownInModal,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Stock layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Stock Interface functionality', async ({ page }) => {
        // Nevigate to Store/Stock page
        await clickMenuAndOption(page, 'Store', 'Stock');
        // Check the page header Store/Stock
        const pageHeader = page.getByRole('heading', { name: 'Store/Stock' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Material 1');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Name Category input
        await fillFilterInput(filterPanel, 'CHEMICAL', 0);
        // Nmae input
        await fillFilterInput(filterPanel, 'Test Name', 1);
        // Color input
        await fillFilterInput(filterPanel, 'Test Color', 2);
        // Size input
        await fillFilterInput(filterPanel, 'Test Size', 3);
        // Unit input
        await fillFilterInput(filterPanel, 'Test Unit', 4);
        // Quantity input
        await fillFilterInput(filterPanel, '100', 5);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 6);
        //Creator input
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
        // Delete the first row in the table
        // await deleteFirstRow(page, 'table');
    });

    test('should verify Stock Data Table functionality', async ({ page }) => {
        // Nevigate to Store/Stock page
        await clickMenuAndOption(page, 'Store', 'Stock');
        // Check the page header Store/Stock
        const pageHeader = page.getByRole('heading', { name: 'Store/Stock' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check Stock Table
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Category', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        //Verify action button functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Stock page to load
        const updateStockTitle = page.getByText('Update Stock', { exact: true });
        await expect(updateStockTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Fill Material Name
        await selectDropdownInModal(page, 'Material', 'Material 2');
        // Fill Category
        await selectDropdownInModal(page, 'Category', 'LEATHER');
        //Fill Color
        await selectDropdownInModal(page, 'Color', 'RED');
        // Fill Size
        await selectDropdownInModal(page, 'Size', '1.5 mm');
        // Fill Unit
        await selectDropdownInModal(page, 'Unit', 'Inch');
        // Fill Remaks
        await page.getByRole('textbox', { name: 'Remarks' }).fill('Test Remarks1');

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });

    test('should verify Add Stock Section functionality', async ({ page }) => {
        // Nevigate to Store/Stock page
        await clickMenuAndOption(page, 'Store', 'Stock');
        // Check the page header Store/Stock
        const pageHeader = page.getByRole('heading', { name: 'Store/Stock' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Material 1');
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Stock Info page to load
        const addStockTitle = page.getByText('Add Stock', { exact: true });
        await expect(addStockTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Fill Material Name
        await selectDropdownInModal(page, 'Material', 'Material 1');
        // Fill Category
        await selectDropdownInModal(page, 'Category', 'CHEMICAL');
        //Fill Color
        await selectDropdownInModal(page, 'Color', 'RED');
        // Fill Size
        await selectDropdownInModal(page, 'Size', '1.5 mm');
        // Fill Unit
        await selectDropdownInModal(page, 'Unit', 'Yard');
        // Fill Remaks
        await page.getByRole('textbox', { name: 'Remarks' }).fill('Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
