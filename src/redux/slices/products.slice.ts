import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../../models"
import { getProductService, postProductService, putProductService } from "../../services/auth.services"
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { IApiResponse } from "../../interfaces";
import { IProductState } from "../../components/products/ProductForm";
import { createProductAdapter } from "../../adapters";


export interface IProductStore {
  data: IProduct[],
  count: number,
  isLoading: boolean,
  editProduct: IProduct | null,
  isModalOpen: boolean
}

const initialState: IProductStore = {
  data: [],
  count: 0,
  isLoading: false,
  editProduct: null,
  isModalOpen: false
}


export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (payload: { data: IProductState, file: File, cb: (openModal: boolean) => { payload: boolean; type: "products/handleProductModal"; } }, { dispatch }) => {
    try {
      dispatch(loadingProducts());
      const formData = new FormData();

      //File input
      formData.append("file", payload.file);

      //User data
      formData.append("productData", JSON.stringify(createProductAdapter(payload.data)));

      toast.message("Creando nuevo producto......")
      const { data: { ok } } = await postProductService(formData);

      if (!ok) toast.error("Hubo un error al crear el producto")
      toast.message("Se ha añadido un nuevo producto")
      const { data: { data: products } } = await getProductService().call;

      dispatch(setProducts(products))
      payload.cb(false)
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }
)

export const editProductThunk = createAsyncThunk(
  'products/editProduct',
  async ({data, file, cb}: { data: IProduct, file: File, cb: (openModal: boolean) => { payload: boolean; type: "products/handleProductModal"; } }, { dispatch }) => {
    try {
      dispatch(loadingProducts());

      const formData = new FormData();

      if (file) {
        //File input
        formData.append("file", file);
      }

      //User data
      formData.append("productData", JSON.stringify(createProductAdapter(data)));


      toast.message("Editando producto......")
      const { data: { ok } } = await putProductService(formData, data.id);

      if (!ok) toast.error("Hubo un error al actualizar el producto")
      toast.message(`Se ha actualizado el producto ${data.name}`)
      const { data: { data: products } } = await getProductService().call;

      dispatch(setProducts(products))
      cb(false)
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      return {
        ...state,
        data: action.payload,
        count: action.payload.length,
      }
    },
    loadingProducts: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    setEditProduct: (state, action: PayloadAction<IProduct>) => {
      return {
        ...state,
        editProduct: action.payload,
        isModalOpen: true,
      }
    },
    handleProductModal: (state, action: PayloadAction<boolean>) => {
      console.log({ modal: action.payload });
      return {
        ...state,
        isModalOpen: action.payload,
        editProduct: !action.payload ? null : state.editProduct
      }
    }
  },
});


export const { setProducts, loadingProducts, setEditProduct, handleProductModal } = productSlice.actions;