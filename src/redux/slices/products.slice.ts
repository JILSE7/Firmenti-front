import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../../models"
import { deleteProductService, getProductByUserService, getProductService, postProductService, putProductService } from "../../services/api.services"
import { toast } from "sonner";
import { IProductState } from "../../components/products/ProductForm";
import { createProductAdapter } from "../../adapters";


export interface IProductStore {
  count: number,
  data: IProduct[],
  myProducts: IProduct[],
  editProduct: IProduct | null,
  isLoading: boolean,
  isModalOpen: boolean
}

const initialState: IProductStore = {
  count: 0,
  data: [],
  myProducts: [],
  editProduct: null,
  isLoading: false,
  isModalOpen: false
}


export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (payload: { data: IProductState, file: File, cb: (openModal: boolean) => { payload: boolean; type: "products/handleProductModal"; } }, { dispatch }) => {
    try {
      const {data, cb, file} = payload

      dispatch(loadingProducts());

      const formData = new FormData();
      
      formData.append("file", file);

      //User data
      formData.append("productData", JSON.stringify(createProductAdapter(data)));

      toast.message("Creando nuevo producto......")

      const { data: { ok } } = await postProductService(formData);

      if (!ok) toast.error("Hubo un error al crear el producto")

      toast.message("Se ha añadido un nuevo producto")

      const { data: { data: products } } = await getProductService().call;

      dispatch(setProducts(products))
    
      cb(false)

    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }
)

export const editProductThunk = createAsyncThunk(
  'products/editProduct',
  async ({data, file, cb}: { data: IProductState, file: File, cb: (openModal: boolean) => { payload: boolean; type: "products/handleProductModal"; } }, { dispatch }) => {
    try {

      dispatch(loadingProducts());

      const formData = new FormData();

      if (file) formData.append("file", file);
  
      //User data
      formData.append("productData", JSON.stringify(createProductAdapter(data)));

      toast.message("Editando producto......")

      const { data: { ok } } = await putProductService(formData, data.id!);

      if (!ok) toast.error("Hubo un error al actualizar el producto")

      toast.message(`Se ha actualizado el producto ${data.name}`)

      const { data: { data: products } } = await getProductService().call;

      const { data: { data: myProducts } } = await getProductByUserService(data.userId).call;

      dispatch(setProducts(products));

      dispatch(setMyProducts(myProducts))

      cb(false);

    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }
)


export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async ({productId, userId}: {productId: string, userId: string}, { dispatch }) => {
    try {

      dispatch(loadingProducts());

      toast.message("eliminando producto......")

      const { data: { ok, msg } } = await deleteProductService(productId);
      
      if (!ok) toast.error("Hubo un error al eliminar el producto")

      toast.message(msg)

      const { data: { data: products } } = await getProductService().call;

      const { data: { data: myProducts } } = await getProductByUserService(userId).call;

      dispatch(setProducts(products));

      dispatch(setMyProducts(myProducts))

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
    setMyProducts: (state, action: PayloadAction<IProduct[]>) => {
      return {
        ...state,
        myProducts: action.payload,
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
      return {
        ...state,
        isModalOpen: action.payload,
        editProduct: !action.payload ? null : state.editProduct
      }
    }
  },
});


export const { setProducts, loadingProducts, setEditProduct, handleProductModal, setMyProducts } = productSlice.actions;