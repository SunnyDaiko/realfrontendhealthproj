import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Typography } from '@material-ui/core';
import { useCart } from './CartContext';
import styles from './OrderItem.module.css';
import { toPrice } from './ReviewOrderWidgetService';
/**
 * @name OrderItem
 * @description Displays an order row
 * @param {*} props product
 * @return component
 */
const OrderItem = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputFocus, setInputFocus] = useState(true);
  const { dispatch } = useCart();
  const inputRef = useRef(null);
  const thisProduct = product; // Necessary duplicate object to avoid no param re-assign ines-lint
  /**
   * Resets the thisProduct quantity to 1
   * and updates the state of products.
   */
  const resetProductQuantity = () => {
    thisProduct.quantity += 1;
    dispatch({ type: 'update' });
  };

  useEffect(() => {
    if (
      thisProduct.quantity === 0
      && inputRef.current !== document.activeElement
      && !inputFocus) {
      setShowModal(true);
    }
  }, [thisProduct, inputFocus]);

  /**
   * Deletes item from cart.
   */
  const onDelete = () => {
    dispatch({
      type: 'delete',
      product: {
        id: thisProduct.id,
        title: thisProduct.title,
        price: thisProduct.price,
        description: thisProduct.description,
        image: thisProduct.image,
        quantity: 0
      }
    });
  };
  /**
   * Increases or decreases the quantity of the thisProduct and
   * updates the state of the products object.
   * @param {*} e The event that triggered the function call
   */
  const handleQuantityChange = (e) => {
    const currentValue = parseInt(e.target.value, 10);
    const prevValue = parseInt(e.target.dataset.prevValue, 10) || thisProduct.quantity;
    if (!Number.isNaN(currentValue)) {
      if (currentValue > prevValue) {
        const quantityDiff = currentValue - prevValue;
        thisProduct.quantity += quantityDiff;
      } else if (currentValue < prevValue) {
        const newQuantity = Math.max(currentValue, 0);
        thisProduct.quantity = newQuantity;
      }

      e.target.dataset.prevValue = currentValue.toString();
      dispatch({ type: 'update' });
    }
  };

  return (
    <div className={styles.orderItem}>
      <div className={styles.image}>
        <img src={thisProduct.image} alt={thisProduct.description} />
      </div>
      <div className={styles.item}>
        <p className={styles.itemTitle}>{thisProduct.title}</p>
        <p>{thisProduct.description}</p>
        <label htmlFor="quantity">
          Qty
          <input
            className={styles.inputQuantity}
            type="number"
            id="quantity"
            value={`${thisProduct.quantity}`}
            onChange={(e) => handleQuantityChange(e)}
            step="1"
            min="0"
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            ref={inputRef}
            width="2em"
          />
        </label>
      </div>
      {showModal && (
      <Modal
        open={showModal}
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            setShowModal(false);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalContainer}>
          <Box className={styles.modalContent}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              This product is about to be removed from your cart.
            </Typography>
            <div className={styles.buttonContainer}>
              <Button
                className={styles.cancelButton}
                onClick={() => { resetProductQuantity(); setShowModal(false); }}
              >
                Cancel
              </Button>
              <Button
                className={styles.proceedButton}
                onClick={() => { onDelete(); setShowModal(false); }}
              >
                Proceed
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      )}
      <div className={styles.price}>
        <IconButton className={styles.trashCan} aria-label="delete from shopping cart" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <p>{toPrice(product.quantity * product.price)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
