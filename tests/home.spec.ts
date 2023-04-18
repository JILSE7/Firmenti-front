import { test, expect, chromium } from '@playwright/test';

const LOCAL_URL = "http://localhost:5173/home"


test.describe("Test in login page", () => {

  test("Shloud not render home page if the user isn´t log in", async({page}) => {
    await page.goto(LOCAL_URL)
    const myProductsBtn = await page.getByTestId("button-myproducts");
    await expect(myProductsBtn).not.toBeVisible();

    const title = await page.getByText(/Products App/);

    await expect(title).toBeVisible();
  });


  test("Sholud be a products card in the page", async({page}) => {
    await page.goto(LOCAL_URL)
    const myProductsBtn = await page.getByTestId("button-myproducts");
    await expect(myProductsBtn).not.toBeVisible();

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

    await expect(myProductsBtn).toBeVisible();

    // const productsCard = page.getByTestId("product-card");
    const products = page.locator('[data-testid="product-card"]:nth-child(1)')
    await expect(products).toHaveText(['sPrueba en test 1Ropa y Hogarhola cara de bola']);

    // console.log({productsCard});
  });


  test("Should open modal when the user clicked FAB", async({page}) => {
    
    await page.goto(LOCAL_URL)
    const myProductsBtn = await page.getByTestId("button-myproducts");
    await expect(myProductsBtn).not.toBeVisible();

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

    await expect(myProductsBtn).toBeVisible();

    const productsCard = page.getByTestId("FAB")
    await expect(productsCard).toBeVisible()

    await productsCard.click()

    const modalTitle = await page.getByTestId("modal-title");
    await expect(modalTitle).toHaveText("Nuevo Producto")
  });


  test("Should open modal edit when the user clicked the options in the card", async({page}) => {
    
    await page.goto(LOCAL_URL)
    const myProductsBtn = await page.getByTestId("button-myproducts");
    await expect(myProductsBtn).not.toBeVisible();

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

    await expect(myProductsBtn).toBeVisible();

    await page.getByTestId('options-btn').click();

    const editBtn = page.getByTestId('edit-btn')

    await expect(editBtn).toBeVisible()

    await editBtn.click()

    const modalTitle = await page.getByTestId("modal-title");

    await expect(modalTitle).toBeVisible();

    await expect(modalTitle).toHaveText(/Editando producto/);

    const inputProductName = await page.getByTestId("input-product-name");
    console.log(await inputProductName.innerHTML());
  });

})