import React, { useState } from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QA from './QA/index.jsx';
import RatingsandReviews from './ratings/RatingsandReviews.jsx';
import MainRelatedFeature from './relatedItems/mainRelatedFeature.jsx';

const App = () => {
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