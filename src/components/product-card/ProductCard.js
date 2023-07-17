import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReviewIcon from '@material-ui/icons/Star';
import { useCart } from '../checkout-page/CartContext';
import constants from '../../utils/constants';
import Toast from '../toast/Toast';
import ReviewsDialogue from '../dialogue/ReviewsDialogue';

/* @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
*/
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  img: {
    objectFit: 'scale-down',
    objectPosition: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { state, dispatch } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  /**
   * Adds a product to the cart. Increments
   * the quantity if multples are added.
   */
  const onAdd = () => {
    const { products } = state;
    const existingProduct = products.find((p) => p.title === product.name);
    const startingProduct = products.find((p) => p.title === '');

    if (startingProduct) {
      dispatch({ type: 'delete', product: startingProduct });
    }
    if (existingProduct) {
      existingProduct.quantity += 1;
      dispatch({ type: 'update' });
      setShowToast(true);
    } else {
      dispatch({
        type: 'add',
        product: {
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          image: product.imageSrc,
          quantity: 1
        }
      });
    }
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const openReviews = () => {
    setShowReviews(true);
  };

  const closeReviews = () => {
    setShowReviews(false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="demographics" className={classes.avatar}>
            {product.demographic.charAt(0)}
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={product.name}
        subheader={`${product.demographic} ${product.category} ${product.type}`}
      />
      <div aria-label={`${product.demographic} ${product.category} ${product.type}`} role="img">
        <Toast show={showToast} handleClose={closeToast} type="info" message="Added to cart" />
        <CardMedia
          classes={{
            root: classes.media,
            img: classes.img
          }}
          image={product.imageSrc || constants.PLACEHOLDER_IMAGE}
          title={`${product.demographic} ${product.category} ${product.type}`}
        />
      </div>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" component="p">
          Price: $
          {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="add to shopping cart" onClick={onAdd}>
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="review product" onClick={openReviews}>
          <ReviewIcon />
        </IconButton>
      </CardActions>
      <ReviewsDialogue
        product={product}
        classes={classes}
        open={showReviews}
        onClose={closeReviews}
      />
    </Card>
  );
};

export default ProductCard;
