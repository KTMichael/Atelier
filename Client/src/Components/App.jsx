import React, { useState } from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QA from './QA/index.jsx';
import RatingsandReviews from './ratings/RatingsandReviews.jsx';

import MainRelatedFeature from './relatedItems/mainRelatedFeature.jsx';
// import API from '../../../Data/APICalls.js';
import testData from '../../../Data/testData.js';

const App = () => {
  const [productInfo, setProductInfo] = useState(testData.testListProducts);
  return (
    <>
      <div id='Title'>Atelier</div>
      <div id="ProductDetailMain" className='MainComponent'>
        <ProductDetail />
      </div>
      <div id="MainRelatedFeatureMain" className='MainComponent'>
        <MainRelatedFeature />
      </div>
      <div id="QAMain" className='MainComponent'>
        <QA />
      </div>
      <div id="RatingsandReviewsMain">
        <RatingsandReviews />
      </div>
    </>
  )
}

export default App;