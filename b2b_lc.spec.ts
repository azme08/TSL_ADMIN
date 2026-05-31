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

test.describe('B2B layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify B2B LC Section functionality', async ({ page }) => {
        // Nevigate to Commercial/B2B LC page
        await clickMenuAndOption(page, 'Commercial', 'B2B LC');

        // Check the page header Commercial/B2B LC
        const pageHeader = page.getByRole('heading', { name: 'Commercial/B2B LC' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'B2B-1');
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
        await fillFilterInput(filterPanel, 'B2B-1', 0);
        // Type Input
        await fillFilterInput(filterPanel, 'Sales Contract', 1);
        // Mater Lc Number Input
        await fillFilterInput(filterPanel, 'LC-110', 2);
        // Total LC Value Input
        await fillFilterInput(filterPanel, '10000', 3);
        // File Name Input
        await fillFilterInput(filterPanel, 'b2b_lc_1.pdf', 4);
        // Value Input
        await fillFilterInput(filterPanel, '5000', 5);
        // Currency Input
        await fillFilterInput(filterPanel, 'USD', 6);
        // Opening Date Input
        await fillFilterInput(filterPanel, '2024-02-01', 7);
        // Bank Name Input
        await fillFilterInput(filterPanel, 'Test Bank', 8);
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
    test('should verify Dashboard B2B LC functionality', async ({ page }) => {
        // Nevigate to Commercial/B2B LC page
        await clickMenuAndOption(page, 'Commercial', 'B2B LC');

        // Check the page header Commercial/B2B LC
        const pageHeader = page.getByRole('heading', { name: 'Commercial/B2B LC' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'LC Number', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update B2B LC page to load
        const updateTitle = page.getByText('Update B2B LC', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Type Dropdown
        await selectDropdown(page, 'Sales Contract', '[role="combobox"]:nth(1)');
        // Number Dropdown
        await selectDropdown(page, 'LC-111 (1)', '[role="combobox"]:nth(2)');
        // Fill Total LC Value
        await fillInputByLabel(page, /total lc value/i, '5000');
        // Supplier Dropdown
        await selectDropdown(page, 'Bolly', '[role="combobox"]:nth(3)');
        // Fill LC Number
        await fillInputByLabel(page, /lc number/i, 'B2B-2');
        // Currecny Dropdown
        await selectDropdown(page, 'RP (Rp)', '[role="combobox"]:nth(4)');
        // Bank Dropdown
        await selectDropdown(page, 'City Bank', '[role="combobox"]:nth(5)');
        // Click Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add B2B LC functionality', async ({ page }) => {
        // Nevigate to Commercial/B2B LC page
        await clickMenuAndOption(page, 'Commercial', 'B2B LC');

        // Check the page header Commercial/B2B LC
        const pageHeader = page.getByRole('heading', { name: 'Commercial/B2B LC' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add B2B LC page to load
        const addTitle = page.getByText('Add B2B LC', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Type Dropdown
        await selectDropdown(page, 'Sales Contract', '[role="combobox"]:nth(1)');
        // Number Dropdown
        await selectDropdown(page, 'LC-111 (1)', '[role="combobox"]:nth(2)');
        // Fill Total LC Value
        await fillInputByLabel(page, /total lc value/i, '5000');
        // Supplier Dropdown
        await selectDropdown(page, 'Nike', '[role="combobox"]:nth(3)');
        // Fill LC Number
        await fillInputByLabel(page, /lc number/i, 'B2B-3');
        // Opening Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Currecny Dropdown
        await selectDropdown(page, 'EU (E)', '[role="combobox"]:nth(4)');
        // Check the Indent option
        await page.getByRole('switch', { name: 'At Sight' }).click();
        // Bank Dropdown
        await selectDropdown(page, 'Janata Bank', '[role="combobox"]:nth(5)');
        // Click Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
