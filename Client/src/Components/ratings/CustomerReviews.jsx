import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import { overallStarRating } from './RatingsandReviews.jsx'
const CustomerReviews = ({ overallStarRating }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let ratingCount = 0;
    Object.keys(overallStarRating).forEach((starValue) => {
      ratingCount += Number(overallStarRating[starValue]);
    });
    setCount(ratingCount);
  }, [overallStarRating]);
  return (
    <div id='CustomerReviews' >
      <h3 id="customerReviewsTitle"> Customer Reviews</h3>
      <div>
        <div id="sortReviewsBy">
          <label>  {`${count} reviews, sorted by`} </label>
          <select>
            <option value="SortOn">Sort On</option>
            <option value="Relevant">Relevant</option>
            <option value="Newest">Newest</option>
            <option value="Helpful">Helpful</option>
          </select>
        </div>
        <br />        <br />
        <div id="reviewTile">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <StarRating />
            <span>Username, Date</span>
          </div>
          <br />        <br />
          <span>Review Summary</span>
          <p>Review Body</p>
          <button>Helpful</button>  <button>Yes</button>  <button>No</button>  <button>Report</button>
        </div>
        <div id="reviewTile">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <StarRating />
            <span>Username, Date</span>
          </div>
          <br />        <br />
          <span>Review Summary</span>
          <p>Review Body</p>
          <button >Helpful</button>  < button >Yes</button>  <button >No</button>  <button >Report</button>
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews;