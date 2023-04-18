import axios from "axios";
import { loadAbort } from "../utilities"
import { IUserAuth, RegisterUser } from "../models/user.model";
import { IAuth, IProduct } from "../models";
import { IApiResponse } from "../interfaces";
import { ICategory } from "../models/category.model";

const LOCAL_URL = "http://localhost:5001/api"


export const registerService = (newUser: RegisterUser) => {
  const controller = loadAbort();

  return {
    call: axios.post<IApiResponse<IUserAuth>>(`${LOCAL_URL}/user`, newUser, {
      signal: controller.signal
    }),
    controller
  };
}

export const loginService = (auth: IAuth) => {
  const controller = loadAbort();

  return {
    call: axios.post<IApiResponse<IUserAuth>>(`${LOCAL_URL}/auth/login`, auth, {
      signal: controller.signal
    }),
    controller
  };
}

export const verifyTokenService = async() => {
  const response = await axios.post<IApiResponse<IUserAuth>>(`${LOCAL_URL}/auth/renew`, {
      headers: {
        'Content-Type': 'application/json', 
      }
  });

  return response;
}


export const getProductService = () => {
  const controller = loadAbort();

  return {
    call: axios.get<IApiResponse<IProduct[]>>(`${LOCAL_URL}/product/`, {
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
    call: axios.get<IApiResponse<IProduct[]>>(`${LOCAL_URL}/product/me/${id}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json', 
      }
    }),
    controller
  };
}


export const postProductService = (product: FormData) => {
  const response = axios.post<IApiResponse<IProduct[]>>(`${LOCAL_URL}/product/`, product, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
  });

  return response
}


export const putProductService = (product: FormData, id: string) => {
  const response = axios.put<IApiResponse<IProduct[]>>(`${LOCAL_URL}/product/${id}`, product, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
  });

  return response;
}

export const deleteProductService = (productId: string) => {
  const response = axios.delete<IApiResponse<IProduct>>(`${LOCAL_URL}/product/${productId}`);

  return response;
}


export const getCategoriesService = () => {
  const controller = loadAbort();

  return {
    call: axios.get<IApiResponse<ICategory[]>>(`${LOCAL_URL}/category/`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json', 
      }
    }),
    controller
  };
  
}


export const createCategoryService = (categoryName: string) => {
  const response = axios.post<IApiResponse<ICategory>>(`${LOCAL_URL}/category/`, {name: categoryName});

  return response;
  
}

export const putCategoryService = (category: ICategory) => {
  const response = axios.put<IApiResponse<ICategory>>(`${LOCAL_URL}/category/${category.id}`, category);

  return response;
  
}

export const deleteCategoryService = (categoryId: string) => {
  const response = axios.delete<IApiResponse<any>>(`${LOCAL_URL}/category/${categoryId}`);

  return response;
  
}
