import { FC } from "react"
import ProductItem from "./ProductItem";
import { IProduct } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteProductThunk, setEditProduct } from "../../redux/slices";
import { Typography } from "@mui/material";

export interface IProps {
  products    : IProduct[];
}

const ProductList: FC<IProps> = ({products}) => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const editProduct = (product: IProduct) => dispatch(setEditProduct(product));
  const deleteProduct = (productId: string, userId:string) => dispatch(deleteProductThunk({productId, userId}));

  return (
    <div className="product_list">
      {
        products.length > 0 ? (
          products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              editProduct={editProduct}
              deleteProduct={deleteProduct} 
              showEditIcon={product.userId === user?.id}
            />
          ))
        ) : (<Typography variant="h5" textAlign="center" sx={{mt: 5}} gutterBottom color={"#1976d2"}> Sin productos registrados :c </Typography>)
      }
    </div>
  )
}

export default ProductList