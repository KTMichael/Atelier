import React, { useState, useEffect } from 'react';
import CustomerReviews from './CustomerReviews.jsx';
import OverallRatings from './OverallRatings.jsx';
import ReviewForm from './ReviewForm.jsx';
import testData from '../../../../Data/testData.js';
import axios from 'axios';
import { TOKEN } from '../../../../config.js';

const RatingsandReviews = () => {
  const [moreReviews, setMoreReviews] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');


  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`,
      { headers: { Authorization: `${TOKEN}` } })
      .then(response => {
        setProductId(response.data[1].id);
        setProductName(response.data[1].name);
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta/?product_id=${productId}`,
          {
            headers: { Authorization: `${TOKEN}` }
          })
          .then(response => {
            setMoreReviews(response.data)
          })
          .catch(error => console.log(error))
      });
  }, []);

  return (
    <div id="RatingsandReviews" >
      <div id="RRTitle">
        <h1> Ratings & Reviews</h1>
      </div>
      <div id="RRComp">
        <div id="OverallRatings">
          <OverallRatings />
        </div>
        <div id="CustomerReviewsMain">
          <CustomerReviews />
          <div id="CustomerReviews" style={{ display: 'flex', flexDirection: 'row' }}>
            <div id="btn">
              <button type="button" onClick={() => setMoreReviews(moreReviews + 2)}>MORE REVIEWS</button>
            </div>
            <ReviewForm productId={productId} productName={productName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsandReviews;