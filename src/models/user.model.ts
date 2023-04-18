import { IProduct } from "./product.model";

export interface  IUser {
  id        : string;   
  email     : string;   
  name      : string;
  phone     : string;
  createdAt : Date;
  updatedAt : Date;
}

export interface IUserAuth extends IUser {
  products: IProduct[]
  accessToken: string
}

export interface RegisterUser {
  email     : string;   
  name      : string;
  phone     : string;
  password  : string;
}