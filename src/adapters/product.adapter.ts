import { IProduct } from "../models";

export const createProductAdapter = (product: any) => ({
  name: product.name,
  description: product.description,
  categoryId: product.categoryId,
  userId: product.userId 
});