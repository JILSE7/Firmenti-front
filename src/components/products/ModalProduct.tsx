import { FC, useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import ProductForm from './ProductForm';
import FloatingActionButton from './FAB';
import { IProduct } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleProductModal, setCategories } from '../../redux/slices';
import useFetchAndLoad from '../../hooks/useFetch';
import { IApiResponse } from '../../interfaces';
import { ICategory } from '../../models/category.model';
import { getCategoriesService } from '../../services/auth.services';

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
  const { callEndpoint } = useFetchAndLoad();
  const { isModalOpen, editProduct } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch<AppDispatch>();
  const handleOpenModal = (openModal: boolean) => dispatch(handleProductModal(openModal));

  const getCategories = async () => {
    const {data: categories} = await callEndpoint<IApiResponse<ICategory[]>>(getCategoriesService());
    dispatch(setCategories(categories))
  }

  useEffect(() => {getCategories()} , [])
  

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => handleOpenModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, color: "black" }}>
          <h2 id="parent-modal-title">{editProduct ? `Editando producto (${editProduct.name})` : "Nuevo Producto"}</h2>

          <ProductForm closeModal={handleOpenModal}/>
        </Box>
      </Modal>
      <FloatingActionButton handleOpenModal={handleOpenModal} />
    </>
  )
}

export default ModalProduct