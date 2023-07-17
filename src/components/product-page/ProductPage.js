import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import { fetchPatients } from './ProductService';
import Constants from '../../utils/constants';
/**
 * @name ProductPage
 * @description fetches patients from API and displays patients as patient cards
 * @return component
 */
const ProductPage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, []);

  return (
    <div>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div className={styles.app}>
        {patients.map((patient) => (
          <div key={patient.id}>
            <ProductCard patient={patient} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
