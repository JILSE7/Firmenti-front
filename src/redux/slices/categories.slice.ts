import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../models/category.model";
import { createCategoryService, deleteCategoryService, getCategoriesService, putCategoryService } from "../../services/api.services";
import { toast } from "sonner";

export interface ICategoryStore {
  data         : ICategory[]
  count        : number,
  editCategory : ICategory | null
  isModalOpen  : boolean
};

const initialState: ICategoryStore = {
  data: [],
  count: 0,
  editCategory: null,
  isModalOpen: false
};


export const createCategoryThunk = createAsyncThunk(
  'products/createProduct',
  async (payload: { categoryName: string, cb: (openModal: boolean) => { payload: boolean; type: "categories/handleCategoryModal"; } }, { dispatch }) => {
    try {
      const {categoryName, cb} = payload      

      toast.message("Creando nuevo producto......")

      const { data: { ok, msg } } = await createCategoryService(categoryName);

      if (!ok) toast.error( msg ?? "Hubo un error al crear el producto")

      toast.message(msg)

      const { data: { data: categories } } = await getCategoriesService().call;

      dispatch(setCategories(categories));
    
      cb(false)
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }
)


export const editCategoryThunk = createAsyncThunk(
  'category/editCategory',
  async ({category, cb}: {category: ICategory, cb: (openModal: boolean) => { payload: boolean; type: "categories/handleCategoryModal"; }} , { dispatch }) => {
    try {
      toast.message("Actualizando categoria")
      
      const { data: { ok, msg } } = await putCategoryService(category);

      if (!ok) toast.error(msg ?? "Hubo un error al actualizar la categoria")

      toast.message(msg)

      const { data: { data: categories } } = await getCategoriesService().call;

      dispatch(setCategories(categories));

      cb(false);

    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }
)

export const deleteCategoryThunk = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId: string , { dispatch }) => {
    try {
      toast.message("Actualizando categoria")
      
      const { data: { ok, msg } } = await deleteCategoryService(categoryId);

      if (!ok) toast.error(msg ?? "Hubo un error al eliminar la categoria")

      toast.message(msg)

      const { data: { data: categories } } = await getCategoriesService().call;

      dispatch(setCategories(categories));

    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.error)
    }

  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      return {
        ...state,
        data: action.payload,
        count: action.payload.length
      }
    },
    setEditCategory: (state, action: PayloadAction<ICategory>) => {
      return {
        ...state,
        editCategory: action.payload,
        isModalOpen: true,
      }
    },
    handleCategoryModal: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalOpen: action.payload,
        editCategory: !action.payload ? null : state.editCategory
      }
    }
  },
});


export const {setCategories, setEditCategory, handleCategoryModal} = categoriesSlice.actions;