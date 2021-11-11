import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import ReviewForm from './ReviewForm.jsx';
import { overallStarRating, productId, productName } from './RatingsandReviews.jsx';
import  IndividualRatings  from './IndividualRatings.jsx';
import _ from 'lodash';

const CustomerReviews = ({ overallStarRating, productId, starFilter, productName }) => {
  const [count, setCount] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [filteredReviewsByStar, setFilteredReviewsByStar] = useState([]);
  const [showingReviews, setShowingReviews,] = useState(2);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    let ratingCount = 0;
    Object.keys(overallStarRating).forEach((starValue) => {
      ratingCount += Number(overallStarRating[starValue]);
    });
    setCount(ratingCount);

    if (starFilter) {
      var filteredReviews = _.filter(userReviews, review => {
        return starFilter.indexOf(review.rating) >= 0;
      });
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
    switch (e.target.value) {
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
    if (filter) {
      reviews = filteredReviews;
    } else {
      if (filteredReviewsByStar.length > 0 && starFilter.length > 0) {
        reviews = filteredReviewsByStar;
      } else {
        reviews = userReviews;
      }
    }
    return reviews.map((review, idx) => <IndividualRatings review={review} key={review.review_id} productId={productId} />);
  }

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
          <select className="reviewSort" onChange={onFilterChange}>
            <option value="SortOn">Sort On</option>
            <option value="Relevant">Relevant</option>
            <option value="Newest">Newest</option>
            <option value="Helpful">Helpful</option>
          </select>
        </div>
        <br /> <br />
        <div>
          {displayReviews()}
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