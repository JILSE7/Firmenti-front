
import { ModalCategory } from "../../../components/modals";
import TableCategory from "../../../components/tables/TableCategory";


const CategoryList = () => {
  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: "center" }}>
      <div style={{ width: '50vw', display: 'flex', justifyContent: "center", marginBottom: 40 }}>
        <TableCategory />
      </div>
      <ModalCategory  />
    </div>
  )
}

export default CategoryList

