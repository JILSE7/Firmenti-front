import { ICategory } from "./category.model";
import { IUser } from "./user.model";

export interface IProduct {
  id          : string;
  name        : string;
  description : string;
  image       : string;
  userId      : string;
  categoryId  : string;
  createdAt   : string;
  user?       : IUser
  category?    : ICategory 
} 