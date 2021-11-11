import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import ReviewForm from './ReviewForm.jsx';
import { overallStarRating } from './RatingsandReviews.jsx';
import { productId, productName } from './RatingsandReviews.jsx';
import IndividualRatings from './IndividualRatings.jsx';

const CustomerReviews = ({ overallStarRating, productId, starFilter, productName }) => {
  const [count, setCount] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [filteredReviewsByStar, setFilteredReviewsByStar] = useState([]);
  const [showingReviews, setShowingReviews,] = useState(2);

  useEffect(() => {
    let ratingCount = 0;
    Object.keys(overallStarRating).forEach((starValue) => {
      ratingCount += Number(overallStarRating[starValue]);
    });
    setCount(ratingCount);

    if (starFilter) {
      var filteredReviews = _.filter(userReviews, { rating: starFilter });
      setFilteredReviewsByStar(filteredReviews);
    }
  }, [overallStarRating, starFilter]);

  useEffect(() => {
    if (productId !== 0) {
      axios.get(`/reviews`, { params: { product_id: productId } })
        .then(response => {
          setUserReviews(response.data.results);
        })
        .catch(error => console.log(error))
    }
  }, [productId])


  const MoreReviews = (event) => {
    setShowingReviews(showingReviews + 2)
  }


  const renderedReviews = userReviews.slice(0, showingReviews);
  if (filteredReviewsByStar.length === 0) {
    if (userReviews > 2) {
      if (showingReviews < userReviews.length) {
        MoreReviews()
      } else {
        showMoreButton = null;
      }
    }
  }
  return (
    <div id='CustomerReviews' >
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
        <br /> <br />
        <div className="renderedReviews">
          {filteredReviewsByStar.length > 0 && starFilter !== null ?
            filteredReviewsByStar.map((review, idx) => <IndividualRatings review={review} key={review.review_id} productId={productId} />) :

            renderedReviews.map((review, idx) => <IndividualRatings review={review} key={review.review_id} productId={productId} />)
          }
        </div>
        <div id="CustomerReviews" style={{ display: 'flex', flexDirection: 'row' }}>
          <div id="btn">
            <button className="btn" onClick={(event) => {
              console.log('clicked');
              MoreReviews(event)
            }}>MORE REVIEWS</button>
          </div>
          <ReviewForm productId={productId} productName={productName} />
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews;