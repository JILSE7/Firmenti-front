import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { createCategoryThunk, editCategoryThunk } from '../../../redux/slices';

interface IProps {
  closeModal:  (openModal: boolean) => { payload: boolean; type: "categories/handleCategoryModal";}
}

const CategoryForm: FC<IProps> = ({closeModal}) => {

  const {editCategory} = useSelector((state: RootState) => state.categories);
  const [categoryName, setCategoryName] = useState<string>(editCategory ? editCategory.name : '');

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editCategory) {
      return dispatch(editCategoryThunk({category: {name: categoryName, id: editCategory.id}, cb: closeModal}));
    }

    dispatch(createCategoryThunk({categoryName, cb: closeModal}));
    
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center', marginTop: 5 }}>
      <TextField
        required
        id="outlined-required"
        label="Nombre del producto"
        autoComplete='off'
        variant='standard'
        name='name'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
        value={categoryName}
        data-testid="input-product-name"
      />

      <Button type="submit" variant="outlined">{editCategory ? "Actualizar" : "Crear"} Categoria</Button>
    </form>
  )
}

export default CategoryForm