import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TOKEN } from '../../../../config.js';
import StarRating from './StarRating.jsx';
import { overallStarRating } from './RatingsandReviews.jsx';
import { productId } from './RatingsandReviews.jsx';
import  IndividualRatings  from './IndividualRatings.jsx';

const CustomerReviews = ({ overallStarRating, productId, starFilter }) => {
  const [count, setCount] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [filteredReviewsByStar, setFilteredReviewsByStar] = useState([]);

  useEffect(() => {
    let ratingCount = 0;
    Object.keys(overallStarRating).forEach((starValue) => {
      ratingCount += Number(overallStarRating[starValue]);
    });
    setCount(ratingCount);

    if ( starFilter ) {
      var filteredReviews = _.filter(userReviews, { rating: starFilter} );
      setFilteredReviewsByStar(filteredReviews);
    }
  }, [overallStarRating, starFilter]);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${productId}`,
          {
            headers: { Authorization: `${TOKEN}` }
          })
          .then(response => {
            setUserReviews(response.data.results);
          })
          .catch(error => console.log(error))

  }, [productId])


  return (
    <div id='CustomerReviews' >
      <h3 id="customerReviewsTitle"> Customer Reviews</h3>
      <div>
        <div id="sortReviewsBy">
          <label>  {`${count} reviews, sorted by`} </label>
          <select className="reviewSort">
            <option value="SortOn">Sort On</option>
            <option value="Relevant">Relevant</option>
            <option value="Newest">Newest</option>
            <option value="Helpful">Helpful</option>
          </select>
        </div>
    <br/> <br/>
        <div>
          { filteredReviewsByStar.length > 0  && starFilter !== null ?
            filteredReviewsByStar.map((review, idx) => <IndividualRatings review={review} key={review.review_id}  productId={productId}/>) :

            userReviews.map((review, idx) => <IndividualRatings review={review} key={review.review_id}  productId={productId}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews;