import React, { useState } from 'react';
import CustomerReviews from './CustomerReviews.jsx';
import OverallRatings from './OverallRatings.jsx';
import ReviewForm from './ReviewForm.jsx';
import testData from '../../../../Data/testData.js';


const RatingsandReviews = () => {
  return (

    <div id="RatingsandReviews" >
      <h1> Ratings & Reviews</h1>
      <div id="RRComp">
        <div id="OverallRatings">
          <OverallRatings />
        </div>
        <div id="CustomerReviews">
          <CustomerReviews />
        </div>
      </div>
      <div id="ReviewForm">
        <ReviewForm />
      </div>
    </div>
  )
}

export default RatingsandReviews;