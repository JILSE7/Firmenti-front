import { FC } from 'react';
import { Box, Modal } from '@mui/material';
import { IProduct } from '../../models';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { handleProductModal } from '../../redux/slices';

import FloatingActionButton from '../products/FAB';
import ProductForm from '../products/ProductForm';
import { useCategories } from '../../hooks/useCategories';

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
  editProduct?: IProduct
}

const ModalProduct: FC<IProps> = () => {
  const { isModalOpen, editProduct } = useSelector((state: RootState) => state.products);
  const { dispatch } = useCategories(false)
  
  const handleOpenModal = (openModal: boolean) => dispatch(handleProductModal(openModal));
  
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => handleOpenModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, color: "black" }}>
          <h2 data-testid="modal-title" id="parent-modal-title">{editProduct ? `Editando producto (${editProduct.name})` : "Nuevo Producto"}</h2>

          <ProductForm closeModal={handleOpenModal}/>
        </Box>
      </Modal>
      <FloatingActionButton handleOpenModal={handleOpenModal} />
    </>
  )
}

export default ModalProduct