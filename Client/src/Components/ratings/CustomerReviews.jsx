import React, { useState } from 'react';
import StarRating from './StarRating.jsx'
const CustomerReviews = () => {

  return (
    <div id='CustomerReviews' >
      <h3 id="customerReviewsTitle"> Customer Reviews</h3>

      <div>
        <div id="sortReviewsBy">
          <label>  39 reviews, sorted by </label>
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
          <button>Helpful</button>  <button>Yes</button>  <button>No</button>  <button>Report</button>
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews;