/**
 * To manage single Product and show product details each other.
 */
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './salesApi';
import CardForProduct from './CardForProduct';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title='Prouct Details'
      description='View Product'
      className='container-fluid'
    >
      <h2 className='mb-4'>Single Product</h2>
      <div className='row'>{JSON.stringify(product)}</div>
    </Layout>
  );
};

export default Product;
