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
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Master LC layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Master LC Section functionality', async ({ page }) => {
        // Nevigate to Commercial/Master LC page
        await clickMenuAndOption(page, 'Commercial', 'Master LC');

        // Check the page header Commercial/Master LC
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Master LC' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'IV-110');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // LC Number Input
        await fillFilterInput(filterPanel, 'LC-110', 0);
        // Total LC Value Input
        await fillFilterInput(filterPanel, '10000', 1);
        // LC Type Input
        await fillFilterInput(filterPanel, 'Sales Contract', 2);
        // File Name Input
        await fillFilterInput(filterPanel, 'lc_110.pdf', 3);
        // Value Input
        await fillFilterInput(filterPanel, '10000', 4);
        // Currency Input
        await fillFilterInput(filterPanel, 'USD', 5);
        // LC Date Input
        await fillFilterInput(filterPanel, '2024-01-01', 6);
        // Bank Name Input
        await fillFilterInput(filterPanel, 'Test Bank', 7);
        // Payment Terms Input
        await fillFilterInput(filterPanel, 'Test Payment Terms', 8);
        // At Sight Input
        await fillFilterInput(filterPanel, 'Yes', 9);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 10);
        // Creator Input
        await fillFilterInput(filterPanel, 'Admin', 11);
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
    test('should verify Dashboard Master LC  functionality', async ({ page }) => {
        // Nevigate to Commercial/Master LC page
        await clickMenuAndOption(page, 'Commercial', 'Master LC');

        // Check the page header Commercial/Master LC
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Master LC' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Summary ID', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Master LC Info page to load
        const updateTitle = page.getByText('Update Master LC', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Type Dropdown
        await selectDropdown(page, 'Sales Contract', '[role="combobox"]:nth(2)');
        //Fill Total LC Value field
        await fillInputByLabel(page, /total lc value/i, '200');
        //Fill LC Number field
        await fillInputByLabel(page, /lc number/i, 'LC-111');
        // Currency Dropdown
        await selectDropdown(page, 'RP (Rp)', '[role="combobox"]:nth(3)');
        // Fill Payment Terms field
        await fillInputByLabel(page, /payment terms/i, 'Test Payment Terms Updated');
        // Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks Updated');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Master LC  functionality', async ({ page }) => {
        // Nevigate to Commercial/Master LC page
        await clickMenuAndOption(page, 'Commercial', 'Master LC');
        // Check the page header Commercial/Master LC
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Master LC' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Master LC Info page to load
        const addTitle = page.getByText('Add Master LC', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Summary field
        await selectDropdown(page, 'S26-108-Karle HK', '[role="combobox"]:nth(1)');
        // Type Dropdown
        await selectDropdown(page, 'Sales Contract', '[role="combobox"]:nth(2)');
        //Fill Total LC Value field
        await fillInputByLabel(page, /total lc value/i, '200');
        //Fill LC Number field
        await fillInputByLabel(page, /lc number/i, 'LC-113');
        // Production Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Currency Dropdown
        await selectDropdown(page, 'RP (Rp)', '[role="combobox"]:nth(3)');
        // Check the Indent option
        await page.getByRole('switch', { name: 'At Sight' }).click();
        //Fill Bank field
        await selectDropdown(page, 'Janata Bank', '[role="combobox"]:nth(4)');
        // Fill Payment Terms field
        await fillInputByLabel(page, /payment terms/i, 'Test Payment Terms');
        // Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
