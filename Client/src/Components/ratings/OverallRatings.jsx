import React, { useState } from 'react';
import StarRating from './StarRating.jsx';

const OverallRatings = ({
  rating = 2, rec = 90, fit = 4, length = 5, quality = 3, comfort = 4,
}) => {
  //   const totalReviews = (ratings) => {
  //     let ratingCount = 0;
  //     Object.keys(ratings).forEach((starValue) => {
  //       ratingCount += Number(ratings[starValue]);
  //     });
  //     return ratingCount;
  //   };
  //   const Stars = ({ stars }) => {
  //     let rating = 0;
  //     if (!stars) { return <div />; }
  //     if (typeof stars === 'object') {
  //       rating = avgStars(stars);
  //     } else {
  //       rating = stars;
  //     }
  //   const avgStars = (ratings) => {
  //     let ratingCount = 0;
  //     let totalStars = 0;
  //     if (!ratings) { return null; }
  //     Object.keys(ratings).forEach((starValue) => {
  //       ratingCount += Number(ratings[starValue]);
  //       totalStars += Number(starValue) * Number(ratings[starValue]);
  //     });
  //     if (ratingCount === 0) { return null; }
  //     return totalStars / ratingCount;
  //   };
  return (
    <div id='OverallRatingsMain' >
      <h1> Overall Ratings</h1>
      <span id="OverallRatingInt" />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <h1 id="ratingInt">{rating ? rating.toFixed(1) : rating}</h1>
          <div><StarRating stars={rating} /></div>
        </div>
        <div>
          Recommended:
          {` ${rec} %`}
        </div>
        <div>
          <label>Size</label>

          <br /> <label>Comfort</label>

        </div>

      </div>
    </div>
  )
}

export default OverallRatings;