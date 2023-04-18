import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { FC } from 'react';


interface IProps {
    id?: string,
    isOpen: boolean;
    productName: string;
    handleDialog: (isOpen: boolean) => void
    handleDelete: (param?: any) => void
}


const DeleteDialog: FC<IProps> = ({isOpen, handleDelete, handleDialog, productName, id}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`¿Esta seguro de eliminar el producto "${productName}"?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta accion es irreversible
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='warning' onClick={() => handleDialog(false)}>Cancelar</Button>
        <Button color='error' onClick={() => handleDelete(id)} autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog