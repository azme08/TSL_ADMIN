import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    clickToggleByHeader,
    closeFilterPanel,
    fillColumnInput,
    fillFilterInput,
    getActionsCell,
    getFirstRowCellByHeader,
    login,
    resetFilter,
    selectDropdownOption,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

const sizesToClick = ['26', '27'];
const indentListToClick = ['Knife', 'Ink', 'Foam'];
const extraInfoToClick = ['HS Code', 'Upper'];

test.describe('Summary layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Dashboard of Summary functionality', async ({ page }) => {
        // Nevigate to Order/Summary page
        await clickMenuAndOption(page, 'Order', 'Summary');
        // Verify that page loaded
        await page.waitForURL(/\/order\/summary/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the page header Order/Summary
        const pageHeader = page.getByRole('heading', { name: 'Order/Summary' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check & Clear the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Karle HK');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Buyer Input
        await fillFilterInput(filterPanel, 'Karle HK', 0);
        // Summary Type Input
        await fillFilterInput(filterPanel, 'CMT', 1);
        // Confirm Order Input
        await fillFilterInput(filterPanel, 'True', 2);
        // Sill Signed Input
        await fillFilterInput(filterPanel, 'True', 3);
        // Cut Off Date Input
        await fillFilterInput(filterPanel, '2024-01-01', 4);
        // Required Material Input
        await fillFilterInput(filterPanel, '5000', 5);
        // Total Carton Input
        await fillFilterInput(filterPanel, '100', 6);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 7);
        //Creator Input
        await fillFilterInput(filterPanel, 'Admin', 8);
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
    test('should verify Information of Order Summary functionality', async ({ page }) => {
        // Nevigate to Order/Summary page
        await clickMenuAndOption(page, 'Order', 'Summary');
        // Verify that page loaded
        await page.waitForURL(/\/order\/summary/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the page header Order/Summary
        const pageHeader = page.getByRole('heading', { name: 'Order/Summary' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for information page to load
        const addTitle = page.getByText('Information', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Click "Ready for Costing" check box
        const readyForCostingCheckbox = page.getByRole('checkbox', { name: 'Ready for Costing' });
        await expect(readyForCostingCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await readyForCostingCheckbox.click();
        // Check Buyer Drop down
        const buyerDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(1);
        await buyerDropdown.click();
        // Select an option
        const buyerPLOption = page.getByRole('option', { name: 'Karle HK', exact: true });
        await buyerPLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerPLOption.click();
        // Click "Order Confirmed" check box
        const orderConfirmedCheckbox = page.getByRole('checkbox', { name: 'Order Confirmed' });
        await expect(orderConfirmedCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderConfirmedCheckbox.click();

        // Click "Sill Signed" check box
        const stillSignedCheckbox = page.getByRole('checkbox', { name: 'Sill Signed' });
        await expect(stillSignedCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await stillSignedCheckbox.click();
    });
    test('should verify Table of Summary functionality', async ({ page }) => {
        // Nevigate to Order/Summary page
        await clickMenuAndOption(page, 'Order', 'Summary');
        // Verify that page loaded
        await page.waitForURL(/\/order\/summary/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the page header Order/Summary
        const pageHeader = page.getByRole('heading', { name: 'Order/Summary' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for information page to load
        const addTitle = page.getByText('Information', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['5min'] });
        // First dropdown inside Information section = Buyer
        const buyerDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(1);
        await buyerDropdown.click();
        // Select an option
        const buyerPLOption = page.getByRole('option', { name: 'Karle HK', exact: true });
        await buyerPLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerPLOption.click();
        // Click "Extra Info" title
        const extraInfoTitle = page.getByRole('heading', { name: 'Extra Info' });
        await expect(extraInfoTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Find the grid containing extra info buttons
        for (const extraInfo of extraInfoToClick) {
            // Locate the label that contains the indent  list
            const extraInfoLabel = page.locator('label', { hasText: extraInfo });

            // Make sure at least one match exists
            const count = await extraInfoLabel.count();
            if (count === 0) {
                console.log(`Extra Info ${extraInfo} not found`);
                continue;
            }
            // Click the label to toggle the hidden checkbox button
            await extraInfoLabel.click();

            console.log(`Clicked indent list: ${extraInfo}`);
        }

        // Click "Size" title
        const sizeTitle = page.getByRole('heading', { name: 'Size' });
        await expect(sizeTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Find the grid containing size buttons
        for (const size of sizesToClick) {
            // Locate the label that contains the size text
            const sizeLabel = page.locator('label', { hasText: size });

            // Make sure at least one match exists
            const count = await sizeLabel.count();
            if (count === 0) {
                console.log(`Size ${size} not found`);
                continue;
            }

            // Click the label to toggle the hidden checkbox button
            await sizeLabel.first().click();

            console.log(`Clicked size: ${size}`);
        }
        // Check the "New" button
        const newPLButton = page.getByRole('button', { name: 'New' });
        await expect(newPLButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newPLButton.click();

        // Check header "Logo"
        /* const logoDetails = page.getByText('Product Image', { exact: true });
        await expect(logoDetails).toBeVisible({ timeout: 10000 });

        const logoheaders = logoDetails.locator(USER_FIELD.PL_HEADER);
        // Find 'Logo' column index
        const logodetailsIndex = await logoheaders
            .allTextContents()
            .then((texts) => texts.findIndex((t) => t.trim() === 'Product Image'));
        expect(logodetailsIndex).toBeGreaterThan(-1);

        const table = page.locator('table');
        const logoUpload = table.locator('tbody tr').first();
        await expect(logoUpload).toBeVisible();

        const logoCell = logoUpload.locator('td').nth(logodetailsIndex);
        await expect(logoCell).toBeVisible();

        //click the logo cell
        await logoCell.click();*/

        // Check header "CTN No"
        const ctninputs = await getFirstRowCellByHeader(
            page,
            'Style No. & Color',
            USER_FIELD.PL_HEADER,
            USER_FIELD.PL_CELL_FINDER
        );
        // Wait & fill
        await ctninputs.nth(0).waitFor({ state: 'visible' });
        await ctninputs.nth(0).fill('1');
        await ctninputs.nth(1).fill('Black');
        await ctninputs.nth(2).fill('Karle HK');

        await expect(ctninputs.nth(0)).toHaveValue('1');
        await expect(ctninputs.nth(1)).toHaveValue('Black');
        await expect(ctninputs.nth(2)).toHaveValue('Karle HK');
        // Fill the Input
        await fillColumnInput({
            page,
            columnName: 'HS Code',
            inputLocator: 'xpath=//input[contains(@id,"hs_code") and contains(@id,".0.")]',
            value: '1234',
        });
        // Fill the Input
        await fillColumnInput({
            page,
            columnName: 'Upper',
            inputLocator: 'xpath=//input[contains(@id,"upper") and contains(@id,".0.")]',
            value: '10',
        });
        // Fill the Input
        await fillColumnInput({
            page,
            columnName: '26',
            inputLocator: 'xpath=//input[contains(@id,"26") and contains(@id,".0.")]',
            value: '5',
        });
        // Fill the Input
        await fillColumnInput({
            page,
            columnName: '27',
            inputLocator: 'xpath=//input[contains(@id,"27") and contains(@id,".0.")]',
            value: '5',
        });
        //Fill the Pair Per Carton column
        await fillColumnInput({
            page,
            columnName: 'Pair Per Carton',
            inputLocator: 'xpath=//input[contains(@id,"pair_per_carton") and contains(@id,".0.")]',
            value: '10',
        });
        // Production Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();

        // Find "Actions" column index
        const actionsCell = await getActionsCell(page, 0);
        // Locate Copy button
        const copyButton = actionsCell.locator(USER_FIELD.PL_COPY_BUTTON).first();
        await expect(copyButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await copyButton.click({ force: true });

        //check delete button
        const dlactionsCell = await getActionsCell(page, 0);

        // find DELETE button
        let deleteButton = dlactionsCell.locator(USER_FIELD.PL_ACTIONS_DELETE);
        if (!(await deleteButton.count())) {
            const icons = dlactionsCell.locator(USER_FIELD.PL_DELETE_BUTTON);
            deleteButton = icons.last();
        }
        // Click Delete
        await expect(deleteButton).toBeVisible();
        await deleteButton.click({ force: true });

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify Cost Sheet of Summary functionality', async ({ page }) => {
        // Nevigate to Order/Summary page
        await clickMenuAndOption(page, 'Order', 'Summary');
        // Verify that page loaded
        await page.waitForURL(/\/order\/summary/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the page header Order/Summary
        const pageHeader = page.getByRole('heading', { name: 'Order/Summary' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for information page to load
        const addTitle = page.getByText('Information', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Click "Ready for Costing" check box
        const readyForCostingCheckbox = page.getByRole('checkbox', { name: 'Ready for Costing' });
        await expect(readyForCostingCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await readyForCostingCheckbox.click();
        // Click "Indent List" title
        const indentTitle = page.getByRole('heading', { name: 'Indent List' });
        await expect(indentTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Find the grid containing indent list buttons
        for (const indentList of indentListToClick) {
            // Locate the label that contains the indent  list
            const indentListLabel = page.locator('label', { hasText: indentList });

            // Make sure at least one match exists
            const count = await indentListLabel.count();
            if (count === 0) {
                console.log(`Indent List ${indentList} not found`);
                continue;
            }

            // Click the label to toggle the hidden checkbox button
            await indentListLabel.first().click();

            console.log(`Clicked indent list: ${indentList}`);
        }

        // Check the "New" button
        const newPLButton = page.getByRole('button', { name: 'New' });
        await expect(newPLButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newPLButton.click();

        // Check header "Article No"
        await fillColumnInput({
            page,
            columnName: 'Article No',
            inputLocator: USER_FIELD.PL_ARTICLE_NO,
            value: '12345678',
        });

        // Check "Design Image 1" header
        /* const designImage1Header = page.getByRole('columnheader', { name: 'Design Image 1' });
        await expect(designImage1Header).toBeVisible({ timeout: TEST_TIME['30sec'] });

        const table = page.locator('table').nth(1);

        // Get all headers in this table
        const headers = table.locator('thead th');
        const headerTexts = await headers.allTextContents();
        console.log('Table headers:', headerTexts);

        // Find the index of "Design Image 1"
        const designIndex = headerTexts.findIndex((t) => t.trim() === 'Design Image 1');
        expect(designIndex).toBeGreaterThan(-1);

        // Get the first row in tbody
         const firstRow = table.locator('tbody tr').first();
        await expect(firstRow).toBeVisible({ timeout: TEST_TIME['30sec'] });

        // Get the cell under "Design Image 1" column
        const designCell = firstRow.locator('td').nth(designIndex);
        await expect(designCell).toBeVisible({ timeout: TEST_TIME['30sec'] });

        // Click the visible upload box

        const uploadBox = designCell.locator('text=Click to upload or drag and drop');
        await expect(uploadBox).toBeVisible({ timeout: TEST_TIME['30sec'] });
        await uploadBox.click();

        // ----------------------------------------------------

        // Check "Design Image 2" header
        const designImage1Header = page.getByRole('columnheader', { name: 'Design Image 2' });
        await expect(designImage1Header).toBeVisible({ timeout: TEST_TIME['30sec'] });

        const table = page.locator('table').nth(1);

        // Get all headers in this table
        const headers = table.locator('thead th');
        const headerTexts = await headers.allTextContents();
        console.log('Table headers:', headerTexts);

        // Find the index of "Design Image 2"
        const designIndex = headerTexts.findIndex((t) => t.trim() === 'Design Image 2');
        expect(designIndex).toBeGreaterThan(-1);

        // Get the first row in tbody
        const firstRow = table.locator('tbody tr').first();
        await expect(firstRow).toBeVisible({ timeout: TEST_TIME['30sec'] });

        // Get the cell under "Design Image 2" column
        const designCell = firstRow.locator('td').nth(designIndex);
        await expect(designCell).toBeVisible({ timeout: TEST_TIME['30sec'] });

        // Click the visible upload box

        const uploadBox = designCell.locator('text=Click to upload or drag and drop');
        await expect(uploadBox).toBeVisible({ timeout: TEST_TIME['30sec'] });
        await uploadBox.click(); */

        // ----------------------------------------------------
        // Check header "Unit Price (USD)"
        await fillColumnInput({
            page,
            columnName: 'Unit Price (USD)',
            inputLocator: USER_FIELD.PL_UNITPRICE,
            value: '120.21',
        });
        // Check header "CMT"
        await fillColumnInput({
            page,
            columnName: 'CMT',
            inputLocator: USER_FIELD.PL_CMT_HEADER,
            value: '10',
        });
        // Check header "B2B Material Per Prs"
        await fillColumnInput({
            page,
            columnName: 'B2B Material Per Prs',
            inputLocator: USER_FIELD.PL_B2B__MATERIAL,
            value: '10',
        });
        // Check header "EQP Per Prs"
        await fillColumnInput({
            page,
            columnName: 'EQP Per Prs',
            inputLocator: USER_FIELD.PL_EQP_PERPRS,
            value: '10',
        });
        // Check header "Knife Value"
        await fillColumnInput({
            page,
            columnName: 'Knife Value',
            inputLocator: USER_FIELD.PL_KINFE_VALUE,
            value: '10',
        });
        // Check header "Chemical Lamination Value"
        /* await fillColumnInput({
            page,
            columnName: 'Chemical Lamination Value',
            inputLocator: USER_FIELD.PL_CHEMICAL_VALUE,
            value: '10',
        });
        // Check header "Carton Value"
        await fillColumnInput({
            page,
            columnName: 'Carton Value',
            inputLocator: USER_FIELD.PL_CARTON_VALUE,
            value: '10',
        });*/
        // Check header "Foam Value"
        await fillColumnInput({
            page,
            columnName: 'Foam Value',
            inputLocator: USER_FIELD.PL_FOAM_VALUE,
            value: '10',
        });
        // Check header "Ink Value"
        await fillColumnInput({
            page,
            columnName: 'Ink Value',
            inputLocator: USER_FIELD.PL_INK_VALUE,
            value: '10',
        });
        // Check header "Commercial Value"
        /*await fillColumnInput({
            page,
            columnName: 'Commercial Value',
            inputLocator: USER_FIELD.PL_COMMERCIAL_VALUE,
            value: '10',
        });
        // Check header "Trail Materials & Courier Cost"
        await fillColumnInput({
            page,
            columnName: 'Trail Materials & Courier Cost',
            inputLocator: USER_FIELD.PL_TMCC,
            value: '10',
        });
        // Check header "Filler Tissue Value"
        await fillColumnInput({
            page,
            columnName: 'Filler Tissue Value',
            inputLocator: USER_FIELD.PL_FILTER_TISSUE_VALUE,
            value: '10',
        });
        // Check header "Polythene Value"
        await fillColumnInput({
            page,
            columnName: 'Polythene Value',
            inputLocator: USER_FIELD.PL_POLYTHENE_VALUE,
            value: '10',
        });
        // Check header "Miscellaneous Value"
        await fillColumnInput({
            page,
            columnName: 'Miscellaneous Value',
            inputLocator: USER_FIELD.PL_MISCELLANEOUS_VALUE,
            value: '10',
        });*/
        // Check header "Incentive Percentage"
        await fillColumnInput({
            page,
            columnName: 'Incentive Percentage',
            inputLocator: USER_FIELD.PL_INCENTIVE_PERCENTAGE,
            value: '10',
        });
        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify Material Required of Order Summary functionality', async ({ page }) => {
        // Nevigate to Order/Summary page
        await clickMenuAndOption(page, 'Order', 'Summary');
        // Check the page header Order/Summary
        const pageHeader = page.getByRole('heading', { name: 'Order/Summary' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the table header "Required Material"
        await clickToggleByHeader(table, 'Required Material', 0);

        await expect(page.getByRole('heading', { name: 'Information' }).nth(1)).toBeVisible({
            timeout: TEST_TIME['5min'],
        });

        // Locate the Extra Percentage
        const extraPercentageInput = page.locator('input[name="extra_percentage"]');

        // Fill it with a value
        await extraPercentageInput.fill('15');
        await expect(extraPercentageInput).toHaveValue('15');

        //-------------------------------------------
        // Locate the "Required Material Entry" section (title could be inside or outside table)
        const section = page.locator('text=Required Material Entry').first();
        await expect(section).toBeVisible({ timeout: 60000 });
        // Check the "New" button
        const newButtonx = page.getByRole('button', { name: 'New' });
        await expect(newButtonx).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newButtonx.click();

        // Check the table header "Material"
        const materialHeader = page.getByRole('columnheader', { name: 'Category' });
        await expect(materialHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check Material Dropdown
        await selectDropdownOption(page, 0, 'LEATHER');
        // Check Category Dropdown
        await selectDropdownOption(page, 1, 'Material 2');
        // Check Color Dropdown
        await selectDropdownOption(page, 2, 'No Color');
        // Check Size Dropdown
        await selectDropdownOption(page, 3, '1.5 mm');
        // Check Unit Dropdown
        await selectDropdownOption(page, 4, 'Inch');

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });
});
