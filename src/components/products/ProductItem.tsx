

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

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { FC } from 'react';
import { IProduct } from '../../models';

export interface IProps {
  product: IProduct
  editProduct?: (product: IProduct) => { payload: IProduct; type: "products/setEditProduct"; }
}

const ProductItem: FC<IProps> = ({ product, editProduct }) => {
  const { name, createdAt, description, image } = product
  return (
    <Card sx={{ width: 345, margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0]}
          </Avatar>
        }
        action={
          editProduct && (
            <IconButton onClick={() => editProduct(product)} aria-label="edit">
              <EditIcon />
            </IconButton>
          )
        }
        title={name}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"
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
  );
}

export default ProductItem;