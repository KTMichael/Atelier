import React, { useState, useEffect } from 'react';
import { item, ratingCnt, star } from './OverallRatings.jsx';


const StarRatingsBar = ({ item, ratingCnt, star, setStarFilter }) => {

  const filterByStars = (e) => {
    e.stopPropagation();
    setStarFilter(filter => {
      return filter === star ? null : star;
    });
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',   flexdirection: 'row', padding: '-45px', margin:'-10px'}}>
      <span className="starRating" onClick={filterByStars}>{`${star} Stars`}</span>
      <div style={{ height: 20, width: '40%', backgroundColor: "grey", borderRadius: 50, margin: 50 }}>
        <div style={{ height: '100%', width: `${item / ratingCnt * 100}%`, backgroundColor: 'green', borderRadius: 50}}>
        </div>
      </div>
    </div>
  );
};

export default StarRatingsBar;