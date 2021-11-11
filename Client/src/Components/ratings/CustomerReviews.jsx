import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import { overallStarRating } from './RatingsandReviews.jsx';
import { productId } from './RatingsandReviews.jsx';
import  IndividualRatings  from './IndividualRatings.jsx';
import _ from 'lodash';

const CustomerReviews = ({ overallStarRating, productId, starFilter }) => {
  const [count, setCount] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [filteredReviewsByStar, setFilteredReviewsByStar] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState(null);

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
    if (productId !== 0) {
    axios.get(`/reviews`, { params: { product_id: productId } })
      .then(response => {
        setUserReviews(response.data.results);
      })
      .catch(error => console.log(error))
    }
  }, [productId])

  const onFilterChange = (e) => {
    var currentReviews = starFilter !== null ? filteredReviewsByStar : userReviews;
    switch(e.target.value) {
      case 'Relevant':
        let sortByRelevance = _.orderBy(currentReviews, review => {
          return review.recommend;
        }, ['desc']);
        setFilteredReviews(sortByRelevance);
        setFilter('Relevant');
        return;
      case 'Helpful':
        let sortedByHelp = _.orderBy(currentReviews, review => {
          return review.helpfuln
        }, ['desc']);
        setFilteredReviews(sortedByHelp);
        setFilter('Helpful');
        return;
      case 'Newest':
        let sortedByDate = _.orderBy(currentReviews, review => {
          return review.date;
        }, ['desc']);
        setFilteredReviews(sortedByDate);
        setFilter('Newest');
        return;
      default:
        setFilteredReviews(currentReviews);
        setFilter(null);
        return;
    }
  }

  const displayReviews = () => {
    var reviews = [];
    if ( filter ) {
      reviews = filteredReviews;
    } else {
      if ( filteredReviewsByStar.length > 0  && starFilter !== null ) {
        reviews = filteredReviewsByStar;
      } else {
        reviews = userReviews;
      }
    }
    return reviews.map((review, idx) => <IndividualRatings review={review} key={review.review_id}  productId={productId}/>);
  }

  return (
    <div id='CustomerReviews' >
      <h3 id="customerReviewsTitle"> Customer Reviews</h3>
      <div>
        <div id="sortReviewsBy">
          <label>  {`${count} reviews, sorted by`} </label>
          <select className="reviewSort" onChange={onFilterChange}>
            <option value="SortOn">Sort On</option>
            <option value="Relevant">Relevant</option>
            <option value="Newest">Newest</option>
            <option value="Helpful">Helpful</option>
          </select>
        </div>
    <br/> <br/>
        <div>
          {displayReviews()}
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews;