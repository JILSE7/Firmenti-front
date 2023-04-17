import axios from "axios";
import { loadAbort } from "../utilities"
import { IUserAuth } from "../models/user.model";
import { IAuth, IProduct } from "../models";
import { IApiResponse } from "../interfaces";
import { ICategory } from "../models/category.model";
import { IProductState } from "../components/products/ProductForm";


export const loginService = ({email, password}: IAuth) => {
  const controller = loadAbort();

  return {
    call: axios.post<IApiResponse<IUserAuth>>("http://localhost:5001/api/auth/login", {email, password}, {
      signal: controller.signal
    }),
    controller
  };
  
}

export const verifyTokenService = async() => {
  const response = await axios.post<IApiResponse<IUserAuth>>("http://localhost:5001/api/auth/renew", {
      headers: {
        'Content-Type': 'application/json', 
      }
  });

  return response
}


export const getProductService = () => {
  const controller = loadAbort();

  return {
    call: axios.get<IApiResponse<IProduct[]>>("http://localhost:5001/api/product/", {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json', 
      }
    }),
    controller
  };
  
}


export const postProductService = (product: FormData) => {
  const response = axios.post<IApiResponse<ICategory[]>>("http://localhost:5001/api/product/", product, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
  });

  return response
}


export const putProductService = (product: FormData, id: string) => {
  const response = axios.put<IApiResponse<ICategory[]>>(`http://localhost:5001/api/product/${id}`, product, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
  });

  return response
  
}


export const getCategoriesService = () => {
  const controller = loadAbort();

  return {
    call: axios.get<IApiResponse<ICategory[]>>("http://localhost:5001/api/category/", {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json', 
      }
    }),
    controller
  };
  
}
