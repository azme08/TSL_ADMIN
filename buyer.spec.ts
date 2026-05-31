import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
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

test.describe('Buyer layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Buyer page functionality', async ({ page }) => {
        // Nevigate to Order/Buyer Issue page
        await clickMenuAndOption(page, 'Order', 'Buyer');
        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Buyer' });
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
        // Name Name input
        await fillFilterInput(filterPanel, 'ABC', 0);
        // Address input
        await fillFilterInput(filterPanel, 'Test Address', 1);
        // Contact Input
        await fillFilterInput(filterPanel, '01313887756', 2);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 3);
        // Created By input
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
    });
    test('should verify Buyer page Dashboard functionality', async ({ page }) => {
        // Nevigate to Order/Buyer Issue page
        await clickMenuAndOption(page, 'Order', 'Buyer');
        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Buyer' });
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
        // Wait for Update Buyer page to load
        const addBuyerTitle = page.getByText('Update Buyer', { exact: true });
        await expect(addBuyerTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Buyer "Name" field
        await fillInputByLabel(page, /name/i, 'Nike');
        //Fill Buyer "Address" field
        await fillInputByLabel(page, /address/i, 'Test Address');
        //Fill Buyer "Contact Information" field
        await fillInputByLabel(page, /contact information/i, '01313887756');
        //Fill Buyer "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Buyer functionality', async ({ page }) => {
        // Nevigate to Order/Buyer page
        await clickMenuAndOption(page, 'Order', 'Buyer');
        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Buyer' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click New button
        const newButton = page.getByRole('button', { name: 'New' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await newButton.click();
        // Wait for Add Buyer page to load
        const addBuyerTitle = page.getByText('Add Buyer', { exact: true });
        await expect(addBuyerTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Buyer "Name" field
        await fillInputByLabel(page, /name/i, 'Soccer');
        //Fill Buyer "Address" field
        await fillInputByLabel(page, /address/i, 'Test Address');
        //Fill Buyer "Contact Information" field
        await fillInputByLabel(page, /contact information/i, '01313887756');
        //Fill Buyer "Remarks" field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
