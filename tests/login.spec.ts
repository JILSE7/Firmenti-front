import { test, expect } from '@playwright/test';

const LOCAL_URL = "http://localhost:5173/login"

test.describe("Test in login page", () => {

  test("Should render login page", async({page}) => {
    await page.goto(LOCAL_URL)
    const title = await page.getByText(/Products App/);

    await expect(title).toBeVisible();
  })

  test("Should show error message when the user credentials are invalids", async({page}) => {
    await page.goto(LOCAL_URL)
  
  
    const title = await page.getByText(/Products App/)
    await expect(title).toBeVisible();
  
    //Fill the input name
    const inputPassword = await page.getByTestId("input-password");
    await expect(inputPassword).toBeInViewport();
    inputPassword.fill("123456")
    await expect(inputPassword).toHaveValue("123456");
  
    //Fill the password input
    const inputEmail = await page.getByTestId("input-email");
    await expect(inputEmail).toBeInViewport();
    inputEmail.fill("said@gamil.com")
    await expect(inputEmail).toHaveValue("said@gamil.com");
  
  
    //submit
    await page.getByTestId('button-submit').click();
  
    const sonnerInit = await page.getByText(/Iniciando sesión/)
    const sonnerBadUser = await page.getByText(/Usuario no encontrado/)
    await expect(sonnerInit).toBeVisible();
    await expect(sonnerBadUser).toBeVisible();
  
  })

  test("Should show a welcome message when the user credentials are valids and should be in home page", async({page}) => {
    await page.goto(LOCAL_URL)
  
  
    const title = await page.getByText(/Products App/);
    await expect(title).toBeVisible();
  
    //Fill the input name
    const inputPassword = await page.getByTestId("input-password");
    await expect(inputPassword).toBeInViewport();
    inputPassword.fill("123456")
    await expect(inputPassword).toHaveValue("123456");
  
    //Fill the password input
    const inputEmail = await page.getByTestId("input-email");
    await expect(inputEmail).toBeInViewport();
    inputEmail.fill("saidnnnn@gmail.com")
    await expect(inputEmail).toHaveValue("saidnnnn@gmail.com");
  
  
    //submit
    await page.getByTestId('button-submit').click();
  
    const sonnerInit = await page.getByText(/Iniciando sesión/)
    const sonnerUser = await page.getByText(/Bienvenido/)
    await expect(sonnerInit).toBeVisible();
    await expect(sonnerUser).toBeVisible();


    const myProductsBtn = await page.getByTestId("button/myProducts");
    await expect(myProductsBtn).toBeVisible();
    await expect(myProductsBtn).toHaveText("Mis Productos");
  });
})