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

test.describe('bANK layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Bank Section functionality', async ({ page }) => {
        // Nevigate to Commercial/Bank page
        await clickMenuAndOption(page, 'Commercial', 'Bank');

        // Check the page header Commercial/Bank
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Bank' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test Bank');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Bank Name Input
        await fillFilterInput(filterPanel, 'Test Bank', 0);
        // SWIFT Code Input
        await fillFilterInput(filterPanel, 'TESTSWIFT', 1);
        // Account Number Input
        await fillFilterInput(filterPanel, '123456789', 2);
        // Beneficiary Name Input
        await fillFilterInput(filterPanel, 'Test Beneficiary', 3);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 4);
        // Creator Input
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
    });
    test('should verify Bank Dashboard functionality', async ({ page }) => {
        // Nevigate to Commercial/Bank page
        await clickMenuAndOption(page, 'Commercial', 'Bank');
        // Check the page header Commercial/Bank
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Bank' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Bank Name', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Bank page
        const updateTitle = page.getByText('Update Bank', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Bank Name field
        await fillInputByLabel(page, /bank name/i, 'Test Bank');
        //Fill SWIFT Code field
        await fillInputByLabel(page, /swift code/i, 'TESTSWIFT');
        //Fill Account Number field
        await fillInputByLabel(page, /account number/i, '123456789');
        //Fill Beneficiary Name field
        await fillInputByLabel(page, /beneficiary name/i, 'Test Beneficiary');
        // Bank Address field
        await fillInputByLabel(page, /bank address/i, 'Test Bank Address');
        // Beneficiary address field
        await fillInputByLabel(page, /beneficiary address/i, 'Test Beneficiary Address');
        //Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });

    test('should verify add Bank functionality', async ({ page }) => {
        // Nevigate to Commercial/Bank page
        await clickMenuAndOption(page, 'Commercial', 'Bank');
        // Check the page header Commercial/Bank
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Bank' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Bank page to load
        const addTitle = page.getByText('Add Bank', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Bank Name field
        await fillInputByLabel(page, /bank name/i, 'IFIC Bank');
        //Fill SWIFT Code field
        await fillInputByLabel(page, /swift code/i, 'TESTSWIFT');
        //Fill Account Number field
        await fillInputByLabel(page, /account number/i, '123456789');
        //Fill Beneficiary Name field
        await fillInputByLabel(page, /beneficiary name/i, 'Test Beneficiary');
        // Bank Address field
        await fillInputByLabel(page, /bank address/i, 'Test Bank Address');
        // Beneficiary address field
        await fillInputByLabel(page, /beneficiary address/i, 'Test Beneficiary Address');
        //Fill Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
