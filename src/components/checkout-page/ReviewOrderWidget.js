import React from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = () => {
  const {
    state: { products }
  } = useCart();

  return (
    <>
      {(products.length > 0 ? (
        <>
          {products.map((product) => (
            <div key={product.title}>
              <OrderItem
                product={product}
              />
            </div>
          ))}
          <hr />
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal</p>
            </div>
            <div className={styles.price}>
              <p>{getSubtotal(products)}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Your shopping cart is empty. Please add your favorite items to get started!</p>
      ))}
    </>
  );
};

export default ReviewOrderWidget;
