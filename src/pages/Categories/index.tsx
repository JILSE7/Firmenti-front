import { Typography } from "@mui/material"
import ResponsiveAppBar from "../../components/layout/navbar"
import CategoryList from "./components/CategoryList"

export const CategoriesPage = () => {
  return (
    <div className="global_container">
      <ResponsiveAppBar />
      <Typography variant="h5" textAlign="center" sx={{ mt: 5 }} gutterBottom color={"#1976d2"}> Categorias </Typography>

      <CategoryList />


    </div>
  )
}
