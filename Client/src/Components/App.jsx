import React, { useState } from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QA from './QA.jsx';
import RatingsandReviews from './ratings/RatingsandReviews.jsx';
import MainRelatedFeature from './relatedItems/mainRelatedFeature.jsx';
// import API from '../../../Data/APICalls.js';
import testData from '../../../Data/testData.js';

const App = () => {
  const [productInfo, setProductInfo] = useState(testData.testListProducts);

  return (

    <div>
      {console.log(productInfo)}
      <ProductDetail />
      <QA />
      <MainRelatedFeature />
      <RatingsandReviews />
    </div >
  )

}

export default App;