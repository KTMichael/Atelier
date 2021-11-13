import React, { useState, useEffect } from 'react';
import RatingsandReviews from './ratings/RatingsandReviews.jsx';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QA from './QA/index.jsx';
import MainRelatedFeature from './relatedItems/mainRelatedFeature.jsx';
import axios from 'axios';

const App = () => {
  const [allProductsData, setAllProductsData] = useState([])
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setAllProductsData(response.data[3])
        setCurrentProduct(response.data[2])
      })
      .catch(error => console.log(error))
  }, []);
  return (
    <>
      <div id='Title'>Atelier</div>
      <div id="ProductDetailMain" className='MainComponent'>
        {currentProduct.id &&
          <ProductDetail currentProduct={currentProduct}/>
        }
      </div>
      <div id="MainRelatedFeatureMain" className='MainComponent'>
        <MainRelatedFeature productId={currentProduct.id} allProductsData={allProductsData} />
      </div>
      <div id="QAMain" className='MainComponent'>
        {currentProduct.id &&
          <QA productId={currentProduct.id} allProductsData={allProductsData} />
        }
      </div>
      <div id="RatingsandReviewsMain">
        {currentProduct.id &&
          <RatingsandReviews productId={currentProduct.id} allProductsData={allProductsData} />
        }
      </div>
    </>
  )
}

export default App;