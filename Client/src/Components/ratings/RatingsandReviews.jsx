import React, { useState } from 'react';
import CustomerReviews from './CustomerReviews.jsx';
import OverallRatings from './OverallRatings.jsx';
import ReviewForm from './ReviewForm.jsx';
import AddReview from './AddReview.jsx';
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
          <div id="CustomerReviews"style={{ display: 'flex', flexDirection: 'row' }}>
            <div id="btn">
              <button type="button" onClick={() => setMoreReviews(moreReviews + 2)}>MORE REVIEWS</button>
            </div>
            <AddReview />

          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsandReviews;