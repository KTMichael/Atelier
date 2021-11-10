import React, { useState, useEffect } from 'react';
import CustomerReviews from './CustomerReviews.jsx';
import OverallRatings from './OverallRatings.jsx';
import ReviewForm from './ReviewForm.jsx';
import axios from 'axios';
import { TOKEN } from '../../../../config.js';

const RatingsandReviews = () => {
  const [moreReviews, setMoreReviews] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');
  const [overallStarRating, setOverallStarRating] = useState({});
  const [overallRecommended, setOverallRecommended] = useState({});
  const [overallCharacteristics, setOverallCharacteristics] = useState({});



  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`,
      { headers: { Authorization: `${TOKEN}` } })
      .then(response => {
        setProductId(response.data[0].id);
        setProductName(response.data[0].name);
        let product_id = response.data[0].id;
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta/?product_id=${product_id}`,
          {
            headers: { Authorization: `${TOKEN}` }
          })
          .then(response => {
            // console.log('response', response.data)
            setOverallCharacteristics(response.data.characteristics)
            setOverallRecommended(response.data.recommended)
            setOverallStarRating(response.data.ratings)
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
          <OverallRatings overallRecommended={overallRecommended} overallCharacteristics={overallCharacteristics} overallStarRating={overallStarRating} />
        </div>
        <div id="CustomerReviewsMain">
          <CustomerReviews overallStarRating={overallStarRating} productId={productId}/>
          <div id="CustomerReviews" style={{ display: 'flex', flexDirection: 'row' }}>
            <div id="btn">
              <button className="btn" onClick={() => setMoreReviews(moreReviews + 2)}>MORE REVIEWS</button>
            </div>
            <ReviewForm productId={productId} productName={productName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsandReviews;