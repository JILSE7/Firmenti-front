

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { FC, useCallback, useState } from 'react';
import { IProduct } from '../../models';
import { Box, Button, Popover } from '@mui/material';
import DeleteDialog from './DeleteDialog';

export interface IProps {
  product: IProduct
  showEditIcon: boolean;
  editProduct: (product: IProduct) => { payload: IProduct; type: "products/setEditProduct"; }
  deleteProduct: (productId: string, userId:string) => any
}

const ProductItem: FC<IProps> = ({ product, editProduct, showEditIcon, deleteProduct }) => {
  const { name, createdAt, description, image, user, category } = product;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
  
  const handleClose =  useCallback(() => setAnchorEl(null), []);

  const handleDialog = useCallback((isOpen: boolean) => setIsOpenDialog(isOpen), []);

  const handleDelete = () => {
    deleteProduct(product.id, product.userId);
    handleDialog(false);
  }

  return (
    <>
    <Card sx={{ width: 345, margin: 5 }} data-testid="product-card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user?.name[0] ?? 's/n'}
          </Avatar>
        }
        action={
          showEditIcon && editProduct && (
            <>
              <Button data-testid="options-btn" aria-describedby={id} variant="text" onClick={handleClick}>
                <MoreVertIcon />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{display: 'flex', flexDirection: 'column', padding: 1}}>
                  <Button data-testid="edit-btn" onClick={() => editProduct(product)} variant="outlined" sx={{marginBottom: 2}} color='warning'>
                    <EditIcon />
                  </Button>
                  
                  <Button onClick={() => handleDialog(true)}  variant="outlined" color='error'>
                    <DeleteIcon />
                  </Button>
                </Box>
              </Popover>
            </>
          )
        }
        title={name}
        subheader={category?.name}
      />
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>

    <DeleteDialog 
      handleDelete={handleDelete}
      handleDialog={handleDialog}
      isOpen={isOpenDialog}
      productName={product.name}
    />
    </>
  );
}

export default ProductItem;