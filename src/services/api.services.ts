import axios from "axios";
import { loadAbort } from "../utilities"
import { IUserAuth, RegisterUser } from "../models/user.model";
import { IAuth, IProduct } from "../models";
import { IApiResponse } from "../interfaces";
import { ICategory } from "../models/category.model";


export const registerService = (newUser: RegisterUser) => {
  const controller = loadAbort();

  return {
    call: axios.post<IApiResponse<IUserAuth>>("http://localhost:5001/api/user", newUser, {
      signal: controller.signal
    }),
    controller
  };
}

export const loginService = (auth: IAuth) => {
  const controller = loadAbort();

  return {
    call: axios.post<IApiResponse<IUserAuth>>("http://localhost:5001/api/auth/login", auth, {
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

  return response;
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

export const getProductByUserService = (id: string) => {
  const controller = loadAbort();

  return {
    call: axios.get<IApiResponse<IProduct[]>>(`http://localhost:5001/api/product/me/${id}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json', 
      }
    }),
    controller
  };
}


export const postProductService = (product: FormData) => {
  const response = axios.post<IApiResponse<IProduct[]>>("http://localhost:5001/api/product/", product, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
  });

  return response
}


export const putProductService = (product: FormData, id: string) => {
  const response = axios.put<IApiResponse<IProduct[]>>(`http://localhost:5001/api/product/${id}`, product, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
  });

  return response;
}

export const deleteProductService = (productId: string) => {
  const response = axios.delete<IApiResponse<IProduct>>(`http://localhost:5001/api/product/${productId}`);

  return response;
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


export const createCategoryService = (categoryName: string) => {
  const response = axios.post<IApiResponse<ICategory>>(`http://localhost:5001/api/category/`, {name: categoryName});

  return response;
  
}

export const putCategoryService = (category: ICategory) => {
  const response = axios.put<IApiResponse<ICategory>>(`http://localhost:5001/api/category/${category.id}`, category);

  return response;
  
}

export const deleteCategoryService = (categoryId: string) => {
  const response = axios.delete<IApiResponse<any>>(`http://localhost:5001/api/category/${categoryId}`);

  return response;
  
}
