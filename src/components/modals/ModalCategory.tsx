
import { FC} from 'react';
import { Box, Modal } from '@mui/material';
import { IProduct } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleCategoryModal, handleProductModal } from '../../redux/slices';
import CategoryForm from '../../pages/Categories/components/CategoryForm';
import FloatingActionButton from '../products/FAB';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  heigth: 1600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export interface IProps {
  editCategory?: IProduct
}

const ModalCategory: FC<IProps> = () => {
  
  const { isModalOpen, editCategory } = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch<AppDispatch>();
  const handleOpenModal = (openModal: boolean) => dispatch(handleCategoryModal(openModal));
  
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => handleOpenModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, color: "black" }}>
          <h2 data-testid="modal-title" id="parent-modal-title">{editCategory ? `Editando categoria (${editCategory?.name})` : "Nuevo Categoria"}</h2>

          <CategoryForm closeModal={handleOpenModal}/>
        </Box>
      </Modal>
      <FloatingActionButton handleOpenModal={handleOpenModal} />
    </>
  )
}

export default ModalCategory
