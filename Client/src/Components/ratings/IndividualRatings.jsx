import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { review } from './CustomerReviews.jsx';
import moment from 'moment';


const IndividualRatings = (review) => {
  const date = moment(review.review.date).format('MMMM DD, YYYY');

  return (
    <div id="reviewTile">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <StarRatings
          rating={review.review.rating}
          starRatedColor='gold'
          numberOfStars={5}
          starDimension='25px'
          starSpacing='2px'
        />
        <span>{`${review.review.reviewer_name}, ${date}`}</span>
      </div>
      <br />        <br />
      <div className="revSum">{review.review.summary}</div>
      <p>{review.review.body}</p>
      <button >Helpful</button>  < button >Yes</button>  <button >No</button>  <button >Report</button>
    </div>

  )

}

export default IndividualRatings;