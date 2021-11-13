import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import ReviewForm from './ReviewForm.jsx';
import { overallStarRating, productId, productName } from './RatingsandReviews.jsx';
import IndividualRatings from './IndividualRatings.jsx';
import _ from 'lodash';

const CustomerReviews = ({ overallStarRating, productId, filters, setFilters, productName }) => {
  const [count, setCount] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [filteredReviewsByStar, setFilteredReviewsByStar] = useState([]);
  const [showingReviews, setShowingReviews] = useState(2);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    let ratingCount = 0;
    Object.keys(overallStarRating).forEach((starValue) => {
      ratingCount += Number(overallStarRating[starValue]);
    });
    setCount(ratingCount);

    filterReviews();
  }, [overallStarRating, filters]);

  useEffect(() => {
    if (productId !== 0) {
      axios.get(`/reviews/`, { params: { product_id: productId, count: 100 } })
        .then(response => {
          console.log(response.data.results)
          setUserReviews(response.data.results);
        })
        .catch(error => console.log(error))
    }
  }, [productId])

  const filterReviews = () => {
    var reviews = [];
    if (filters.stars.length > 0 && filters.sort !== null) {
      var filteredByStars = _.filter(userReviews, review => {
        return filters.stars.indexOf(review.rating) >= 0;
      });
      reviews = [...setReviewsBySort(filteredByStars, filters.sort)];
    } else if (filters.stars.length > 0) {
      reviews = _.filter(userReviews, review => {
        return filters.stars.indexOf(review.rating) >= 0;
      });
    } else if (filters.sort !== null) {
      reviews = [...setReviewsBySort(userReviews, filters.sort)];
    }
    setFilteredReviews(reviews);
  }

  const setReviewsBySort = (reviews, sort) => {
    switch (sort) {
      case 'Relevant':
        let sortByRelevance = _.orderBy(reviews, review => {
          return review.recommend;
        }, ['desc']);
        return sortByRelevance;
      case 'Helpful':
        let sortedByHelp = _.orderBy(reviews, review => {
          return review.helpfuln
        }, ['desc']);
        return sortedByHelp;
      case 'Newest':
        let sortedByDate = _.orderBy(reviews, review => {
          return review.date;
        }, ['desc']);
        return sortedByDate;
      default:
        return [];
    }
  }

  const setSortFilter = (sortFilter) => {
    setFilters(filters => {
      let settings = {
        stars: filters.stars,
        sort: sortFilter
      };
      return settings;
    })
  }

  const onFilterChange = (e) => {
    switch (e.target.value) {
      case 'Relevant':
        setSortFilter('Relevant');
        return;
      case 'Helpful':
        setSortFilter('Helpful');
        return;
      case 'Newest':
        setSortFilter('Newest');
        return;
      default:
        setSortFilter(null);
        return;
    }
  }

  const displayReviews = () => {
    var reviews = [];
    if (filters.sort) {
      reviews = filteredReviews;
    } else {
      if (filteredReviews.length > 0 && filters.stars.length > 0) {
        reviews = filteredReviews;
      } else {
        reviews = userReviews;
      }
    }
    reviews = reviews.slice(0, showingReviews);
    return reviews.map((review, idx) => <IndividualRatings review={review} key={review.review_id} productId={productId} />);
  }

  const MoreReviews = (event) => {
    setShowingReviews(showingReviews + 2)
  }

  const LessReviews = (event) => {
    setShowingReviews(2)
  }

  return (
    <div id='CustomerReviews' >
      <div >
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
        <div style={{ marginTop: '60px' }} className="revs">
          {displayReviews()}
        </div>
        <div id="CustomerReviews" style={{ display: 'flex', flexDirection: 'row' }}>
          <div id="btn">
            {showingReviews < userReviews.length ?
            <button className="btn" onClick={(event) => {
              MoreReviews(event)
            }}>MORE REVIEWS</button>
          : <button className="btn" style={{ display: 'flex', flexDirection: 'row' }} onClick={(event) => {
            LessReviews(event)
          }}>SHOW LESS</button>}
          </div>
          <ReviewForm productId={productId} productName={productName} />
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews;