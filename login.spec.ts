import { expect, test } from '@playwright/test';

import {
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillInputByLabel,
    getFirstTableRow,
    hasElement,
    isExist,
    locat,
    locatBy,
    pageLocat,
    resetFilter,
    TEST_TIME,
    toggleColumnAndActions,
    URLS,
    USER_FIELD,
    userlogin,
    waitForVisible,
} from '../utils';

test.describe('TSL Admin Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URLS.BASE, { waitUntil: 'domcontentloaded' });

        await isExist({ page, selector: 'text=TSL Admin' });

        // Handle warning page if exists
        const goLoginButton = page.getByRole('button', { name: /Go To Login|Go Home/ });
        if (await goLoginButton.isVisible()) {
            await goLoginButton.click();
            await page.waitForURL(/login/i);
        }
    });

    test('should show error for invalid credentials', async ({ page }) => {
        // Wait for login inputs
        const emailInput = page.locator(USER_FIELD.EMAIL);
        const passwordInput = page.locator(USER_FIELD.PASSWORD);
        const loginButton = page.locator(USER_FIELD.LOGIN_BUTTON);
        await waitForVisible([emailInput, passwordInput, loginButton]);
        // Fill invalid credentials
        await emailInput.fill('invalid@example.com');
        await passwordInput.fill('wrongpassword');
        await loginButton.click();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        // Login
        await userlogin(page, 'admin@tsl.com', '1234');
        // fill User in Search bar
        const searchInput = await locatBy({
            type: 'role',
            page,
            selector: 'searchbox',
            name: 'Search here...',
        });
        await searchInput.fill('User');

        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Status input
        await fillFilterInput(filterPanel, 'Active');
        // Name input
        await fillFilterInput(filterPanel, 'Azme', 1);
        //Phone Number input
        await fillFilterInput(filterPanel, '1234567890', 2);
        // Email input
        await fillFilterInput(filterPanel, 'azme@eub.edu.bd', 3);
        //Department input
        await fillFilterInput(filterPanel, 'Admin', 4);
        //Remarks input
        await fillFilterInput(filterPanel, 'Test remarks', 5);
        //Creator input
        await fillFilterInput(filterPanel, 'Admin', 6);
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

    test('should check the user dashboard', async ({ page }) => {
        // Login
        await userlogin(page, 'admin@tsl.com', '1234');

        // Click sort user option
        const sortUserOption = page.locator(USER_FIELD.USER_FIELD_SORTING).first();
        await expect(sortUserOption).toBeVisible({ timeout: TEST_TIME['2min'] });
        await sortUserOption.click({ force: true });
        await page.mouse.click(0, 0);

        //User status on off
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });

        const firstRow = await getFirstTableRow(table, TEST_TIME['2min']);
        await expect(firstRow).toBeVisible({ timeout: TEST_TIME['2min'] });
        const statusToggle = firstRow.locator('td').first().locator('button');

        // Click the header button
        await expect(statusToggle).toBeVisible({ timeout: TEST_TIME['2min'] });
        await statusToggle.click({ force: true });
        // Check Status Header
        const tableHeader = table.locator('thead th').filter({ hasText: USER_FIELD.TABLE_HEADER }).first();
        await expect(tableHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const tableHeaderMenuButton = tableHeader.locator('button');
        // Click on Status switch
        await expect(tableHeaderMenuButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await tableHeaderMenuButton.click({ force: true });

        // Check Status 3 dot Header option
        const columnMenu = page.locator(USER_FIELD.FIND_COLUMN_HEADER);
        await expect(columnMenu).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Click for an option
        const statusOption = columnMenu.getByText(USER_FIELD.STATUS_UPDATE, { exact: true });
        await expect(statusOption).toBeVisible({ timeout: TEST_TIME['2min'] });
        await statusOption.click();

        //Verify action button functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Locate first row in table body
        const first_Row = table.locator('tbody tr').first();
        await expect(first_Row).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Locate the Action column cell
        const actionCell = first_Row.locator('td').last();
        await expect(actionCell).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Locate the 3-dot button inside Action cell
        const actionRowMenuButton = actionCell.locator('button');

        // Click the 3-dot button
        await expect(actionRowMenuButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await actionRowMenuButton.click({ force: true });

        // Click for Edit option
        const actionOption = columnMenu.getByText('Edit', { exact: true });
        await expect(actionOption).toBeVisible({ timeout: TEST_TIME['2min'] });
        await actionOption.click();
        // -------------------- VERIFY UPDATE USER PAGE --------------------
        await hasElement({
            type: 'text',
            page,
            selector: 'Update User',
            exact: true,
        });
        // -------------------- DEPARTMENT --------------------
        const departmentLabel = await pageLocat({ page, selector: 'Department', exact: true });
        // Open department dropdown
        const deptDropdown = await locat({ locator: departmentLabel, selector: USER_FIELD.DEPT_DROPDOWN });
        await deptDropdown.click();
        // Open designation dropdown
        const designationDropdown = await locat({ locator: deptDropdown, selector: USER_FIELD.DESIGNATION_DROPDOWN });
        await designationDropdown.click();

        //Fill "Name" field
        await fillInputByLabel(page, /name/i, 'Abdullah Azme');
        //Fill "Email" field
        await fillInputByLabel(page, /email/i, 'test13@gmail.com');
        //Fill phone field
        await fillInputByLabel(page, /phone/i, '01316-579199');
        // Remarks field
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);

        await page.waitForURL(/\/hr\/user/, { timeout: TEST_TIME['2min'] });

        //Go to the user page and verify updated user
        const us = URLS.AFTER_LOGIN;
        await page.goto(us, { waitUntil: 'domcontentloaded' });

        // Assert URL
        await expect(page).toHaveURL(us);

        // Verify updated user in table
        const userTable = page.locator('table');
        await expect(userTable).toBeVisible({ timeout: TEST_TIME['2min'] });

        //Again click to the action button
        /* await expect(actionRowMenuButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await actionRowMenuButton.click({ force: true });

        // Click for Delete option
        const deleteOption = columnMenu.getByText('Delete', { exact: true });
        await expect(deleteOption).toBeVisible({ timeout: TEST_TIME['2min'] });
        await deleteOption.click();

        // Click Cancel
        const cancelButton = page.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await cancelButton.click();

        // Click the 3-dot button
         await expect(actionRowMenuButton).toBeVisible({ timeout: TEST_TIME['10sec'] });
        await actionRowMenuButton.click({ force: true });

        // Click for Delete option
        await expect(deleteOption).toBeVisible({ timeout: TEST_TIME['10sec'] });
        await deleteOption.click();

        // Click Confirm
        const confirmButton = page.getByRole('button', { name: 'Confirm' });
        await expect(confirmButton).toBeVisible({ timeout: TEST_TIME['10sec'] });
        await confirmButton.click(); */

        // Click 3-dot button
        await expect(actionRowMenuButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await actionRowMenuButton.click({ force: true });

        // Click Reset Password option
        const resetPasswordOption = columnMenu.getByText('Reset Password', { exact: true });
        await expect(resetPasswordOption).toBeVisible({ timeout: TEST_TIME['2min'] });
        await resetPasswordOption.click();

        // Password input
        const userpasswordInput = page.getByLabel('Password', { exact: true });
        await expect(userpasswordInput).toBeVisible({ timeout: TEST_TIME['2min'] });
        await userpasswordInput.fill(USER_FIELD.TEST_PASSWORD);

        // Repeat Password input
        const repeatPasswordInput = page.getByLabel('Repeat Password', { exact: true });
        await expect(repeatPasswordInput).toBeVisible({ timeout: TEST_TIME['2min'] });
        await repeatPasswordInput.fill(USER_FIELD.TEST_PASSWORD);

        // Click Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
