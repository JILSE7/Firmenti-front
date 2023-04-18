
import { useCallback, useState } from "react";
import { ModalCategory } from "../../../components/modals";
import DeleteDialog from "../../../components/products/DeleteDialog";
import TableCategory from "../../../components/tables/TableCategory";
import { deleteCategoryThunk, setDelete } from "../../../redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { ICategory } from "../../../models/category.model";


const CategoryList = () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const {deleteCategory} = useSelector((state: RootState) => state.categories)
  
  const dispatch = useDispatch<AppDispatch>()

  const handleDialog = useCallback((isOpen: boolean) => setIsOpenDialog(isOpen), []);
  
  const setDeleteCategory = (category: ICategory | null) => {
    handleDialog(true)
    dispatch(setDelete(category))
  }

  const handleDelete = useCallback((categoryId: string) => {
    dispatch(deleteCategoryThunk(categoryId))
    handleDialog(false);
  }, [])
  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: "center" }}>
      <div style={{ width: '50vw', display: 'flex', justifyContent: "center", marginBottom: 40 }}>
        <TableCategory setDeleteCategory={setDeleteCategory}/>
        <DeleteDialog
          handleDelete={handleDelete}
          handleDialog={handleDialog}
          isOpen={isOpenDialog}
          productName={deleteCategory?.name! ?? 'N/A'}
          id={deleteCategory?.id}
        />
      </div>
      <ModalCategory />
    </div>
  )
}

export default CategoryList

