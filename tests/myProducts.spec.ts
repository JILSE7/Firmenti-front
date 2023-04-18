import { test, expect, Page } from '@playwright/test';

const LOCAL_URL = "http://localhost:5173/login";


const login = async(page: Page) => {
  
  
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
   // const sonnerUser = await page.getByText(/Bienvenido/)
   await expect(sonnerInit).toBeVisible();
   //await expect(sonnerUser).toBeVisible();
}

test.describe("Test in my Products", () => {

  test("Should show my products", async({page}) => {
    await page.goto(LOCAL_URL)

    await login(page)
  
    const myProductsBtn = page.getByTestId("button/myProducts");
    await expect(myProductsBtn).toBeVisible();
    await expect(myProductsBtn).toHaveText("Mis Productos");
    await myProductsBtn.click()
  
    await expect(page.getByText(/Mis productos/)).toBeVisible()
  });
})