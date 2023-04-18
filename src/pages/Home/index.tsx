
import ResponsiveAppBar from "../../components/layout/navbar"
import useFetchAndLoad from "../../hooks/useFetch"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { setCategories, setProducts } from "../../redux/slices"
import { IApiResponse } from "../../interfaces"
import { ICategory } from "../../models/category.model"
import { IProduct } from "../../models"
import { RootState } from "../../redux/store"
import { useEffect } from "react"
import { getCategoriesService, getProductService } from "../../services/api.services"
import { ProductList } from "../../components"
import ModalProduct from "../../components/modals/ModalProduct"
import { Typography } from "@mui/material"


const HomePage = () => {
  const { callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products)
  
  const getProducts = async () => {
    toast.message("Obteniendo productos")
    const {data: products} = await callEndpoint<IApiResponse<IProduct[]>>(getProductService());
    dispatch(setProducts(products))
  }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <div className="global_container">
      <ResponsiveAppBar />
      <Typography variant="h5" textAlign="center" sx={{mt: 5}} gutterBottom color={"#1976d2"}> Todos los productos </Typography>
      <div className="product_list_container">
        <ProductList products={products.data} />
      </div>

      <ModalProduct  />      
    </div>
  )
}

export default HomePage;