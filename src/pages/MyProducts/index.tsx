
import { Typography } from "@mui/material"
import ResponsiveAppBar from "../../components/layout/navbar";
import { ModalProduct, ProductList } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyProductsPage = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <div className="global_container">
      <ResponsiveAppBar />
      <Typography variant="h5" textAlign="center" sx={{mt: 5}} gutterBottom color={"#1976d2"}> Mis Productos </Typography>

      <div className="product_list_container">
        <ProductList products={user?.products!} />
      </div>
      <ModalProduct  />
    </div>
  )
}

export default MyProductsPage