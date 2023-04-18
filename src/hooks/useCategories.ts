import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setCategories } from "../redux/slices";
import useFetchAndLoad from "./useFetch";
import { getCategoriesService } from "../services/api.services";
import { IApiResponse } from "../interfaces";
import { ICategory } from "../models/category.model";
import { toast } from "sonner";


export const useCategories = (showToast: boolean = true) => {
  const { callEndpoint } = useFetchAndLoad();
  const { data: categories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();


  const getCategories = async () => {
    showToast &&  toast.message("Obteniendo categorias")
    const {data: categories} = await callEndpoint<IApiResponse<ICategory[]>>(getCategoriesService());
    dispatch(setCategories(categories))
  };

  useEffect(() => {getCategories()} , [])

  return {
    categories,
    dispatch
  }
}