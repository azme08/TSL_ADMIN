import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickMenuAndOption,
    clickSaveOrSubmitButton,
    clickToggleByHeader,
    closeFilterPanel,
    deleteFirstRow,
    fillColumnInput,
    fillFilterInput,
    getActionsCell,
    getCellInputs,
    getFirstRowCellByHeader,
    login,
    resetFilter,
    selectDropdownOption,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

const sizesToClick = ['26', '27', '28'];
const indentListToClick = ['Knife', 'Ink', 'Foam'];

test.describe('Packing List layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@tsl.com',
            password: '1234',
        });
    });

    test('should verify Packing List functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const buyerOption = page.getByText('Packing List', { exact: true });
        await expect(buyerOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await buyerOption.click();

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the search bar
        const pageSearchBar = pageHeader.locator(USER_FIELD.USER_SEARCH_BAR);
        await expect(pageSearchBar).toBeVisible({ timeout: TEST_TIME['5min'] });
        await pageSearchBar.fill('Test Name');
        await expect(pageSearchBar).toHaveValue('Test Name');

        // Clear the search bar
        await pageSearchBar.fill('');
        await expect(pageSearchBar).toHaveValue('');

        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newButton.click();
    });

    test('should verify Information Section functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const buyerOption = page.getByText('Packing List', { exact: true });
        await expect(buyerOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await buyerOption.click();

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the search bar
        const pageSearchBar = pageHeader.locator(USER_FIELD.USER_SEARCH_BAR);
        await expect(pageSearchBar).toBeVisible({ timeout: TEST_TIME['5min'] });
        await pageSearchBar.fill('Test Name');
        await expect(pageSearchBar).toHaveValue('Test Name');

        // Clear the search bar
        await pageSearchBar.fill('');
        await expect(pageSearchBar).toHaveValue('');

        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newButton.click();

        // Wait for Add Buyer page to load
        const addBuyerTitle = page.getByText('Information', { exact: true });
        await expect(addBuyerTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Click "Ready for Costing" check box
        const readyForCostingCheckbox = page.getByRole('checkbox', { name: 'Ready for Costing' });
        await expect(readyForCostingCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await readyForCostingCheckbox.click();

        //-----------------------------------------------------------
        // Check Packing List Type
        const buyerTypeDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(0);
        await buyerTypeDropdown.click();
        // Select an option
        const buyerTypePLOption = page.getByRole('option', { name: USER_FIELD.SELECT_PL_TYPE, exact: true });
        await buyerTypePLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerTypePLOption.click();

        //-----------------------------------------------------------
        // Check Buyer Drop down
        const buyerDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(1);
        await buyerDropdown.click();
        // Select an option
        const buyerPLOption = page.getByRole('option', { name: USER_FIELD.SELECT_BUYER_NAME, exact: true });
        await buyerPLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await page.keyboard.press('Enter');

        //-----------------------------------------------------------
        // Order Type Drop down
        const typeDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(2);
        await typeDropdown.click();
        // Select an option
        const typePLOption = page.getByRole('option', { name: USER_FIELD.SELECT_BUYER_TYPE, exact: true });
        await typePLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await page.keyboard.press('Enter');
        //-----------------------------------------------------------
        // Click "Order Confirmed" check box
        const orderConfirmedCheckbox = page.getByRole('checkbox', { name: 'Order Confirmed' });
        await expect(orderConfirmedCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderConfirmedCheckbox.click();

        // Click "Sill Signed" check box
        const stillSignedCheckbox = page.getByRole('checkbox', { name: 'Sill Signed' });
        await expect(stillSignedCheckbox).toBeVisible({ timeout: TEST_TIME['5min'] });
        await stillSignedCheckbox.click();
    });

    test('should verify Packing List Table functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const buyerOption = page.getByText('Packing List', { exact: true });
        await expect(buyerOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await buyerOption.click();

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the search bar
        const pageSearchBar = pageHeader.locator(USER_FIELD.USER_SEARCH_BAR);
        await expect(pageSearchBar).toBeVisible({ timeout: TEST_TIME['5min'] });
        await pageSearchBar.fill('Test Name');
        await expect(pageSearchBar).toHaveValue('Test Name');

        // Clear the search bar
        await pageSearchBar.fill('');
        await expect(pageSearchBar).toHaveValue('');

        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newButton.click();

        // Wait for Add Buyer page to load
        const addBuyerTitle = page.getByText('Information', { exact: true });
        await expect(addBuyerTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check Packing List Type
        const buyerTypeDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(0);
        await buyerTypeDropdown.click();
        // Select an option
        const buyerTypePLOption = page.getByRole('option', { name: USER_FIELD.SELECT_PL_TYPE, exact: true });
        await buyerTypePLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerTypePLOption.click();

        // First dropdown inside Information section = Buyer
        const buyerDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(1);
        await buyerDropdown.click();

        // Select an option
        const buyerPLOption = page.getByRole('option', { name: USER_FIELD.SELECT_BUYER_NAME, exact: true });
        await buyerPLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerPLOption.click();

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

        // Check header "CTN No"
        const ctninputs = await getFirstRowCellByHeader(
            page,
            'CTN No',
            USER_FIELD.PL_HEADER,
            USER_FIELD.PL_CELL_FINDER
        );

        // Wait & fill
        await ctninputs.nth(0).waitFor({ state: 'visible' });
        await ctninputs.nth(0).fill('01');
        await ctninputs.nth(1).fill('1450');

        await expect(ctninputs.nth(0)).toHaveValue('01');
        await expect(ctninputs.nth(1)).toHaveValue('1450');

        //-----------------------------------------------------------

        // Check header "L x W x H (CM)"
        const ctndetailsinputs = await getFirstRowCellByHeader(
            page,
            'L x W x H (CM)',
            USER_FIELD.PL_HEADER,
            USER_FIELD.PL_CELL_FINDER
        );

        // fill L x W x H (CM)
        await ctndetailsinputs.nth(0).waitFor({ state: 'visible' });
        await ctndetailsinputs.nth(0).fill('30');
        await ctndetailsinputs.nth(1).fill('25.5');
        await ctndetailsinputs.nth(2).fill('27');

        await expect(ctndetailsinputs.nth(0)).toHaveValue('30');
        await expect(ctndetailsinputs.nth(1)).toHaveValue('25.5');
        await expect(ctndetailsinputs.nth(2)).toHaveValue('27');

        //--------------------------------------------------------------

        // Check header "Po No, Desc & Logo Name"
        const podetailsinputs = await getFirstRowCellByHeader(
            page,
            'Po No, Desc & Logo Name',
            USER_FIELD.PL_HEADER,
            USER_FIELD.PL_CELL_FINDER
        );
        // fill Po No, Desc & Logo Name
        await podetailsinputs.nth(0).waitFor({ state: 'visible' });
        await podetailsinputs.nth(0).fill('123456');
        await podetailsinputs.nth(1).fill('Test');
        await podetailsinputs.nth(2).fill('Test');

        await expect(podetailsinputs.nth(0)).toHaveValue('123456');
        await expect(podetailsinputs.nth(1)).toHaveValue('Test');
        await expect(podetailsinputs.nth(2)).toHaveValue('Test');

        //--------------------------------------------------------------

        // Check header "Logo"
        /* const logoDetails = page.getByText('Logo', { exact: true });
        await expect(logoDetails).toBeVisible({ timeout: 10000 });

        const logoheaders = logoDetails.locator(USER_FIELD.PL_HEADER);
        // Find 'Logo' column index
        const logodetailsIndex = await logoheaders
            .allTextContents()
            .then((texts) => texts.findIndex((t) => t.trim() === 'Logo'));
        expect(logodetailsIndex).toBeGreaterThan(-1);

        const table = page.locator('table');
        const logoUpload = table.locator('tbody tr').first();
        await expect(logoUpload).toBeVisible();

        const logoCell = logoUpload.locator('td').nth(logodetailsIndex);
        await expect(logoCell).toBeVisible();

        //click the logo cell
        await logoCell.click();*/

        //-----------------------------------------------------------------

        // check "Brand & Order No."
        const brandDetailsInputs = await getFirstRowCellByHeader(
            page,
            'Brand & Order No.',
            USER_FIELD.PL_HEADER,
            USER_FIELD.PL_CELL_FINDER
        );
        // fill Brand & Order No.
        await brandDetailsInputs.nth(0).waitFor({ state: 'visible' });
        await brandDetailsInputs.nth(0).fill('Test');
        await brandDetailsInputs.nth(1).fill('123456');

        await expect(brandDetailsInputs.nth(0)).toHaveValue('Test');
        await expect(brandDetailsInputs.nth(1)).toHaveValue('123456');

        //--------------------------------------------------------------

        // Click "Style No. & Color"
        const styleDetails = page.getByText('Style No. & Color', { exact: true });
        await expect(styleDetails).toBeVisible({ timeout: 10000 });

        const styleheaders = styleDetails.locator(USER_FIELD.PL_HEADER);
        // Find 'Style No. & Color' column index
        const styledetailsIndex = await styleheaders
            .allTextContents()
            .then((texts) => texts.findIndex((t) => t.trim() === 'Style No. & Color'));
        expect(styledetailsIndex).toBeGreaterThan(-1);

        // First row only
        const styledetailsfirstRow = page.locator('table tbody tr').first();
        const styledetailsCell = styledetailsfirstRow.locator('td').nth(styledetailsIndex);
        // Visible inputs only
        const styledetailsinputs = styledetailsCell.locator(USER_FIELD.PL_CELL_FINDER);

        // fill Style No. & Color
        await styledetailsinputs.nth(0).waitFor({ state: 'visible' });
        await styledetailsinputs.nth(0).fill('123456');
        await styledetailsinputs.nth(1).fill('Test');

        await expect(styledetailsinputs.nth(0)).toHaveValue('123456');
        await expect(styledetailsinputs.nth(1)).toHaveValue('Test');

        //--------------------------------------------------------------

        // Find "26" column index
        const inputs26 = await getCellInputs(page, '26');
        await expect(inputs26).toHaveCount(5);

        // Fill "Ratio x Ctn Qty +Ext"

        await inputs26.nth(0).fill('10');
        await inputs26.nth(1).fill('20');
        await inputs26.nth(2).fill('30');

        // Fill "Net & Gross Weight"

        await inputs26.nth(3).fill('5.5');
        await inputs26.nth(4).fill('6.2');

        //--------------------------------------------------------------

        // Find "27" column index
        const inputs27 = await getCellInputs(page, '27');
        await expect(inputs27).toHaveCount(5);

        // Fill "Ratio x Ctn Qty +Ext"
        await inputs27.nth(0).fill('10');
        await inputs27.nth(1).fill('20');
        await inputs27.nth(2).fill('30');

        // Fill "Net & Gross Weight"
        await inputs27.nth(3).fill('5.5');
        await inputs27.nth(4).fill('6.2');

        //--------------------------------------------------------------

        // Find "28" column index
        const inputs28 = await getCellInputs(page, '28');
        await expect(inputs28).toHaveCount(5);

        // Fill "Ratio x Ctn Qty +Ext"
        await inputs28.nth(0).fill('10');
        await inputs28.nth(1).fill('20');
        await inputs28.nth(2).fill('30');

        // Fill "Net & Gross Weight"
        await inputs28.nth(3).fill('5.5');
        await inputs28.nth(4).fill('6.2');

        //--------------------------------------------------------------

        // Find "Actions" column index
        const actionsCell = await getActionsCell(page, 0);
        // Locate Copy button
        const copyButton = actionsCell.locator(USER_FIELD.PL_COPY_BUTTON).first();
        await expect(copyButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await copyButton.click({ force: true });

        //--------------------------------------------------------------

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
        const saveButton = page.getByRole('button', { name: /save|submit/i });
        await expect(saveButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await saveButton.click();
    });

    test('should verify Cost Sheet functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const buyerOption = page.getByText('Packing List', { exact: true });
        await expect(buyerOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await buyerOption.click();

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await newButton.click();

        // Wait for Add Buyer page to load
        const addBuyerTitle = page.getByText('Information', { exact: true });
        await expect(addBuyerTitle).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check Packing List Type
        const buyerTypeDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(0);
        await buyerTypeDropdown.click();
        // Select an option
        const buyerTypePLOption = page.getByRole('option', { name: USER_FIELD.SELECT_PL_TYPE, exact: true });
        await buyerTypePLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerTypePLOption.click();

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
        const saveButton = page.getByRole('button', { name: /save|submit/i });
        await expect(saveButton).toBeVisible({ timeout: TEST_TIME['5min'] });
        await saveButton.click();
    });

    test('should verify Packing List Section functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const buyerOption = page.getByText('Packing List', { exact: true });
        await expect(buyerOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await buyerOption.click();

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['5min'] });

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
        await fillFilterInput(filterPanel, 'Karle HK', 0);
        // Type input
        await fillFilterInput(filterPanel, 'carton_wise_size', 1);
        // Confirm Order input
        await fillFilterInput(filterPanel, 'false', 2);
        // Sill Signed input
        await fillFilterInput(filterPanel, 'false', 3);
        // Cut Of Date input
        await fillFilterInput(filterPanel, '2023-01-01', 4);
        // Required Material input
        await fillFilterInput(filterPanel, '5000', 5);
        // Provide Material input
        await fillFilterInput(filterPanel, '100', 6);
        // Quantity input
        await fillFilterInput(filterPanel, '100', 7);
        // No Of CTN
        await fillFilterInput(filterPanel, '10', 8);
        // Volume input
        await fillFilterInput(filterPanel, '10.5', 9);
        //Net Weight input
        await fillFilterInput(filterPanel, '20.2', 10);
        // Gross Weight input
        await fillFilterInput(filterPanel, '20.5', 11);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 12);
        //Creator input
        await fillFilterInput(filterPanel, 'Admin', 13);

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

        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['5min'] });

        await sortTableByColumn(
            page,
            table,
            'ID',
            'Ascending', // or 'Descending'
            TEST_TIME['5min']
        );
    });

    test('should verify Material Required functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const buyerOption = page.getByText('Packing List', { exact: true });
        await expect(buyerOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await buyerOption.click();

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
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
        const materialHeader = page.getByRole('columnheader', { name: 'Material' });
        await expect(materialHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check Material Dropdown
        await selectDropdownOption(page, 0, 'Material 3');
        // Check Category Dropdown
        await selectDropdownOption(page, 1, 'COPPER');
        // Check Color Dropdown
        await selectDropdownOption(page, 2, 'No Color');
        // Check Size Dropdown
        await selectDropdownOption(page, 3, '1 feet');
        // Check Unit Dropdown
        await selectDropdownOption(page, 4, 'Feet');

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['5min']);
    });

    test('should verify Log functionality', async ({ page }) => {
        const orderSection = page.getByText('Order', { exact: true });
        await expect(orderSection).toBeVisible({ timeout: TEST_TIME['5min'] });
        await orderSection.click();

        // Click the Buyer option under Order
        const selectOption = page.getByText('Log', { exact: true });
        await expect(selectOption).toBeVisible({ timeout: TEST_TIME['5min'] });
        await selectOption.click();

        // Check the page header Store/Stock
        const pageHeader = page.getByRole('heading', { name: 'Log' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Material');

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
        await fillFilterInput(filterPanel, 'Material 2', 0);
        // Category input
        await fillFilterInput(filterPanel, 'THREAD', 1);
        // Color input
        await fillFilterInput(filterPanel, 'RED', 2);
        // Size input
        await fillFilterInput(filterPanel, '1.5 mm', 3);
        // Unit input
        await fillFilterInput(filterPanel, 'Yard', 4);
        // Stock In input
        await fillFilterInput(filterPanel, '5', 5);
        // Received input
        await fillFilterInput(filterPanel, '60', 6);
        // Transferred Out input
        await fillFilterInput(filterPanel, '10', 7);
        // Remarks input
        await fillFilterInput(filterPanel, 'Test Remarks', 8);
        // Creator input
        await fillFilterInput(filterPanel, 'Admin', 9);
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

    test('should verify Provided Material functionality', async ({ page }) => {
        // Nevigate to Packing List page
        await clickMenuAndOption(page, 'Order', 'Packing List');

        // Verify that Buyer page loaded
        await page.waitForURL(/\/order\/packing-list/, { timeout: TEST_TIME['5min'] });
        await expect(page.getByText('Packing List', { exact: true })).toBeVisible({ timeout: TEST_TIME['5min'] });

        // Check the page header Order/Buyer
        const pageHeader = page.getByRole('heading', { name: 'Order/Packing List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['5min'] });
        // Check the table header "Required Material"
        await clickToggleByHeader(table, 'Provided Material', 0);

        await expect(page.getByRole('heading', { name: 'Material Provided for undefined' }).nth(0)).toBeVisible({
            timeout: TEST_TIME['5min'],
        });

        // Check Packing List Type
        const buyerTypeDropdown = page.locator(USER_FIELD.PL_BUYER_DROPDOWN).nth(0);
        await buyerTypeDropdown.click();

        // Select an option
        const buyerTypePLOption = page.getByRole('option', { name: 'All', exact: true });
        await buyerTypePLOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await buyerTypePLOption.click();
    });
});
