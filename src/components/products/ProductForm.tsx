import React, { ChangeEvent, FC, FormEvent, useCallback, useRef, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { IProduct } from '../../models';
import { toast } from 'sonner';
import { createProductThunk, editProductThunk } from '../../redux/slices';

interface IProps {
  closeModal:  (openModal: boolean) => { payload: boolean; type: "products/handleProductModal";}
}

export interface IProductState {
  id?: string;
  name        : string;
  description : string;
  categoryId  : string;
  userId      : string;
  image?      : string;
}

const initialState: IProductState = {
  categoryId: '',
  description: '',
  name: '',
  userId: ''
}

const ProductForm: FC<IProps> = ({closeModal}) => {

  const {categories, auth, products} = useSelector((state: RootState) => state);
  const {editProduct} = products;
  const dispatch = useDispatch<AppDispatch>()
  
  const [productState, setProductState] = useState<IProductState>(editProduct ? {...editProduct}: {...initialState, userId:auth.user?.id!})
  const uploadInputRef = useRef<File | null>(null);


  const handleFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    uploadInputRef.current = selectedFiles[0]
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setProductState((state) => ({ ...state, [e.target.name]: e.target.value }))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editProduct) {
      return dispatch(editProductThunk({data: productState, file: uploadInputRef.current!, cb: closeModal}))
    }

    if (!uploadInputRef.current) return toast.error("Seleccione una imagen")   

    dispatch(createProductThunk({data: productState, file: uploadInputRef.current!, cb: closeModal}))
    
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center' }}>
      <TextField
        required
        id="outlined-required"
        label="Nombre del producto"
        autoComplete='off'
        variant='standard'
        name='name'
        onChange={handleChange}
        value={productState.name}
        data-testid="input-product-name"
      />
      <TextField
        required
        id="outlined-required"
        label="Descripción"
        autoComplete='off'
        variant='standard'
        name='description'
        multiline
        onChange={handleChange}
        value={productState.description}
      />

      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          Imagen
        </label>
        <input id="fileSelector" onChange={handleFile} accept="image/*" multiple type="file" />
      </Stack>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          name='categoryId'
          value={productState.categoryId}
          onChange={(e) => setProductState((state) => ({...state, categoryId: e.target.value}))}
        >
          {
            categories.data.map((category) => (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>))
          }
        </Select>
      </FormControl>

      <Button type="submit" variant="outlined">{editProduct ? "Actualizar" : "Crear"} Producto</Button>
    </form>
  )
}

export default ProductForm