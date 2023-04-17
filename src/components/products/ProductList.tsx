import { FC } from "react"
import ProductItem from "./ProductItem";
import { IProduct } from "../../models";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setEditProduct } from "../../redux/slices";

export interface IProps {
  products    : IProduct[]
}

const ProductList: FC<IProps> = ({products}) => {
  const dispatch = useDispatch<AppDispatch>();
  const editProduct = (product: IProduct) => dispatch(setEditProduct(product))
  return (
    <div className="product_list">
      {
        products.map(product => (
          <ProductItem key={product.id} product={product} editProduct={editProduct} />
        ))
      }
    </div>
  )
}

export default ProductList