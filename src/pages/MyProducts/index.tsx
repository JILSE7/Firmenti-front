
import { Typography } from "@mui/material"
import ResponsiveAppBar from "../../components/layout/navbar";
import { ModalProduct, ProductList } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useFetchAndLoad from "../../hooks/useFetch";
import { IApiResponse } from "../../interfaces";
import { IProduct } from "../../models";
import { getProductByUserService } from "../../services/api.services";
import { setMyProducts } from "../../redux/slices";
import { toast } from "sonner";
import { useEffect } from "react";

const MyProductsPage = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  
  const { callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const myProducts = useSelector((state: RootState) => state.products.myProducts)

  const getMyProducts = async () => {
    toast.message("Obteniendo mis productos");
    const {data: products} = await callEndpoint<IApiResponse<IProduct[]>>(getProductByUserService(user?.id!));
    dispatch(setMyProducts(products));
  }


  useEffect(() => {
    getMyProducts();
  }, []);
  

  return (
    <div className="global_container">
      <ResponsiveAppBar />
      <Typography variant="h5" textAlign="center" sx={{mt: 5}} gutterBottom color={"#1976d2"}> Mis productos </Typography>
      <div className="product_list_container">
        <ProductList products={myProducts} />
      </div>
      <ModalProduct  />
    </div>
  )
}

export default MyProductsPage