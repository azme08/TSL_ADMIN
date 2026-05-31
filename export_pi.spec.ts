import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillColumnInput,
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

test.describe('Export PI layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });
    test('should verify Export PI Section functionality', async ({ page }) => {
        // Nevigate to Commercial/Export PI page
        await clickMenuAndOption(page, 'Commercial', 'Export Pi');

        // Check the page header Commercial/Export PI
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Export PI' });
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
        // Packing List No Input
        await fillFilterInput(filterPanel, 'PL25-78-RBR Group', 0);
        // Date input
        await fillFilterInput(filterPanel, '15 Feb, 2026', 1);
        // Latest Shipment Date input
        await fillFilterInput(filterPanel, '20 Feb, 2026', 2);
        // Destination input
        await fillFilterInput(filterPanel, 'New York', 3);
        // Packing Input
        await fillFilterInput(filterPanel, 'Cardboard Carton', 4);
        // Shipping marks input
        await fillFilterInput(filterPanel, 'Star Mark', 5);
        // Port of Loading input
        await fillFilterInput(filterPanel, 'Shanghai', 6);
        // Port of Discharge input
        await fillFilterInput(filterPanel, 'Los Angeles', 7);
        // Partial Shipment input
        await fillFilterInput(filterPanel, 'false', 8);
        // Transshipment input
        await fillFilterInput(filterPanel, 'false', 9);
        // BL Clause input
        await fillFilterInput(filterPanel, ' Test Input', 10);
        // Document input
        await fillFilterInput(filterPanel, 'Test Document', 11);
        // Tolerance input
        await fillFilterInput(filterPanel, '5%', 12);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 13);
        // Creator input
        await fillFilterInput(filterPanel, 'Admin', 14);
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
    test('should verify Export PI Dashboard functionality', async ({ page }) => {
        // Nevigate to Commercial/Export PI page
        await clickMenuAndOption(page, 'Commercial', 'Export Pi');

        // Check the page header Commercial/Export PI
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Export PI' });
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
        const addTitle = page.getByText('Export Document Info', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Wait for Add Export PI Entries page to load
        const PageTitle = page.getByText('Export PI Entries', { exact: true });
        await expect(PageTitle).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Fill the HS Code
        await fillColumnInput({
            page,
            columnName: 'HS Code',
            inputLocator: 'xpath=//input[contains(@id,"hs_code") and contains(@id,".0.")]',
            value: '1234567890',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add new Export Pi Document functionality', async ({ page }) => {
        // Nevigate to Commercial/Export Pi page
        await clickMenuAndOption(page, 'Commercial', 'Export Pi');
        // Check the page header Commercial/Export PI
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Export Pi' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Export Document Info page to load
        const addPageTitle = page.getByText('Export Document Info', { exact: true });
        await expect(addPageTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Export Document Info
        // Order Summary Dropdown
        await selectDropdown(page, 'S26-108-Karle HK', '[role="combobox"]:nth(0)');
        // Fill BL Clause field
        await fillInputByLabel(page, /bl clause/i, 'Test BL Clause');
        // Fill Documents field
        await fillInputByLabel(page, /documents/i, 'Test Documents');
        // Fill Tolerance field
        await fillInputByLabel(page, /tolerance/i, '10');
        // Bank Dropdown
        await selectDropdown(page, 'Janata Bank', '[role="combobox"]:nth(1)');
        // Fill Invoice Number field
        await selectDropdown(page, 'IV-110', '[role="combobox"]:nth(2)');
        // Fill Sales Contact/Master LC Number field
        await selectDropdown(page, 'LC-113 (1)', '[role="combobox"]:nth(3)');
        // Fill Purchase Order Number field
        await fillInputByLabel(page, /purchase order number/i, 'PO-54321');
        // Payment Terms field
        await fillInputByLabel(page, /payment terms/i, 'Test Payment Terms');
        // Export Details
        // Fill Export Registration Number field
        await fillInputByLabel(page, /export registration number/i, 'ER-98765');
        // Fill Bin Number field
        await fillInputByLabel(page, /bin number/i, 'BIN-12345');
        // Fill EXP Number field
        await fillInputByLabel(page, /exp number/i, 'EXP-54321');
        // Fill Origin of Goods field
        await fillInputByLabel(page, /origin of goods/i, 'Test Origin');
        // Shipment Information
        // Fill Shipper Name field
        await fillInputByLabel(page, /shipper name/i, 'Test Shipper');
        // Fill Shipper Address field
        await fillInputByLabel(page, /shipper address/i, '123 Test Street, Test City');
        // fILL Shipper Email field
        await fillInputByLabel(page, /shipper email/i, 'test@ts.com');
        // Fill Shipper Phone field
        await fillInputByLabel(page, /shipper phone/i, '12345-678900');
        // Fill Mode of Shipment field
        await fillInputByLabel(page, /mode of shipment/i, 'Air');
        // Fill Shipment From field
        await fillInputByLabel(page, /shipment from/i, 'Test City');
        // Fill Shipping Mark field
        await fillInputByLabel(page, /shipping mark/i, 'Test Marks');
        // Fill Port of Loading field
        await fillInputByLabel(page, /port of loading/i, 'Test Port');
        // Fill Port of Discharge field
        await fillInputByLabel(page, /port of discharge/i, 'Test Port');
        // Fill Partial Shipment field
        await fillInputByLabel(page, /partial shipment/i, 'false');
        // Fill Transshipment field
        await fillInputByLabel(page, /transshipment/i, 'false');
        // Fill Country of Destination field
        await fillInputByLabel(page, /country of destination/i, 'Test Country');
        // Fill BL Number field
        await fillInputByLabel(page, /bl number/i, 'BL-12345');
        // Fill Vessel Name and Number field
        await fillInputByLabel(page, /vessel name and number/i, 'Test Vessel');
        // Applicant Information
        // Fill Applicant Name field
        await fillInputByLabel(page, /applicant name/i, 'Test Applicant');
        // Applicant Bank Dropdown
        await fillInputByLabel(page, /applicant bank/i, 'Janata Bank');
        // Delivery Information
        // Click "Export Form Received" check box
        const Checkbox = page.getByRole('checkbox', { name: 'Export Form Received' });
        await expect(Checkbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await Checkbox.click();
        // Click Delivery Complete check box
        const deliveryCheckbox = page.getByRole('checkbox', { name: 'Delivery Complete' });
        await expect(deliveryCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await deliveryCheckbox.click();
    });
    test('should verify add new Export PI Entries functionality', async ({ page }) => {
        // Nevigate to Commercial/Export Pi page
        await clickMenuAndOption(page, 'Commercial', 'Export Pi');
        // Check the page header Commercial/Export PI
        const pageHeader = page.getByRole('heading', { name: 'Commercial/Export Pi' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Export Document Info page to load
        const addPageTitle = page.getByText('Export Document Info', { exact: true });
        await expect(addPageTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Export Document Info
        // Order Summary Dropdown
        await selectDropdown(page, 'S26-105-RBR Group', '[role="combobox"]:nth(0)');
        // Wait for Add Export PI Entries page to load
        const PageTitle = page.getByText('Export PI Entries', { exact: true });
        await expect(PageTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' }).nth(0);
        await expect(newButton).toBeVisible();
        await newButton.click();
        // Summary Entry Dropdown
        await selectDropdown(page, '1-Red-Red', '[role="combobox"]:nth(4)');
        // Fill the HS Code
        await fillColumnInput({
            page,
            columnName: 'HS Code',
            inputLocator: 'xpath=//input[contains(@id,"hs_code") and contains(@id,".0.")]',
            value: '1234567890',
        });
        // Wait for Add Party Bank Entries page to load
        const PageTitlex = page.getByText('Party Bank Entries', { exact: true });
        await expect(PageTitlex).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        const newButtonx = page.getByRole('button', { name: 'New' }).nth(1);
        await expect(newButtonx).toBeVisible();
        await newButtonx.click();
        // Fill the Party Name
        await fillColumnInput({
            page,
            columnName: 'Notify Party Name',
            inputLocator: 'xpath=//input[contains(@id,"notify_party_name") and contains(@id,".0.")]',
            value: 'ABC Notify Party',
        });
        // Notify Party Address
        await fillColumnInput({
            page,
            columnName: 'Notify Party Address',
            inputLocator: 'xpath=//textarea[contains(@id,"notify_party_address")]',
            value: 'ABC Notify Party Address',
        });
        // Fill Consignee Bank Input
        await fillColumnInput({
            page,
            columnName: 'Consignee Bank Name',
            inputLocator: 'xpath=//input[contains(@id,"consignee_bank_name")]',
            value: 'ABC Consignee Bank',
        });
        // Fill Consignee Bank Address
        await fillColumnInput({
            page,
            columnName: 'Consignee Bank Address',
            inputLocator: 'xpath=//textarea[contains(@id,"consignee_bank_address")]',
            value: 'ABC Consignee Bank Address',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
