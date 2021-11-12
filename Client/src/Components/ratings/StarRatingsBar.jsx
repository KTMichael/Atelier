import React, { useState, useEffect } from 'react';
import { item, ratingCnt, star } from './OverallRatings.jsx';
import _ from 'lodash';


const StarRatingsBar = ({ item, ratingCnt, star, setFilters }) => {

  const filterByStars = (e) => {
    e.stopPropagation();
    setFilters(filters => {
      var starFilters = [];
      if (filters.stars.length > 0) {
        starFilters = [...filters.stars]
      }

      if (!_.includes(starFilters, star)) {
        starFilters.push(star);
      } else {
        _.remove(starFilters, filter => filter === star);
      }
      let filterSettings = {
        stars: starFilters,
        sort: filters.sort
      }
      return filterSettings;
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexdirection: 'row', padding: '-45px', margin: '-10px' }}>
      <span className="starRating" onClick={filterByStars}>{`${star} Stars`}</span>
      <div style={{ height: 20, width: '40%', backgroundColor: "grey", borderRadius: 50, margin: 50 }}>
        <div style={{ height: '100%', width: `${item / ratingCnt * 100}%`, backgroundColor: 'black', borderRadius: 50 }}>
        </div>
      </div>
    </div>
  );
};

export default StarRatingsBar;