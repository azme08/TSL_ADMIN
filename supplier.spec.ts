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

test.describe('Supplier layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Supplier Interface functionality', async ({ page }) => {
        // Nevigate to Store/Supplier page
        await clickMenuAndOption(page, 'Store', 'Supplier');
        // Check the page header Store/Supplier
        const pageHeader = page.getByRole('heading', { name: 'Store/Supplier' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test Name');
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
        await fillFilterInput(filterPanel, 'Adidas', 0);
        // Contact Person input
        await fillFilterInput(filterPanel, 'Testing Person', 1);
        // Phone number input
        await fillFilterInput(filterPanel, '01313887756', 2);
        // Address input
        await fillFilterInput(filterPanel, 'Test Address', 3);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 4);
        // Created By input
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
    test('should verify Supplier Data Table functionality', async ({ page }) => {
        // Nevigate to Store/Supplier page
        await clickMenuAndOption(page, 'Store', 'Supplier');
        // Check the page header Store/Stock
        const pageHeader = page.getByRole('heading', { name: 'Store/Supplier' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Name', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Supplier page to load
        const updateSupplierTitle = page.getByText('Update Supplier', { exact: true });
        await expect(updateSupplierTitle).toBeVisible({ timeout: TEST_TIME['2min'] });

        //Fill Supplier "Name" field
        await fillInputByLabel(page, /name/i, 'Nike');
        //Fill "Contact Number" field
        await fillInputByLabel(page, /contact person/i, 'Test Contact');
        // Fill the "Phone Number" field
        await fillInputByLabel(page, /phone/i, '01313887756');
        // Fill the "Address" field
        await fillInputByLabel(page, /address/i, 'Test Address');
        // Fill the "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });

    test('should verify Add Supplier functionality', async ({ page }) => {
        // Nevigate to Store/Supplier page
        await clickMenuAndOption(page, 'Store', 'Supplier');
        // Check the page header Store/Supplier
        const pageHeader = page.getByRole('heading', { name: 'Store/Supplier' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Supplier Info page to load
        const addTitle = page.getByText('Add Supplier', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Supplier "Name" field
        await fillInputByLabel(page, /name/i, 'Bolly');
        //Fill "Contact Number" field
        await fillInputByLabel(page, /contact person/i, 'Joe Doe');
        // Fill the "Phone Number" field
        await fillInputByLabel(page, /phone/i, '01313887756');
        // Fill the "Address" field
        await fillInputByLabel(page, /address/i, 'Yongkong rd, China');
        // Fill the "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'New Supplier');

        // Click Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
