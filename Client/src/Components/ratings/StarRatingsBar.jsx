import React, { useState, useEffect } from "react";
import { item, ratingCnt, star } from "./OverallRatings.jsx";
import _ from "lodash";

const StarRatingsBar = ({ item, ratingCnt, star, setFilters }) => {
  const filterByStars = (e) => {
    e.stopPropagation();
    setFilters((filters) => {
      var starFilters = [];
      if (filters.stars.length > 0) {
        starFilters = [...filters.stars];
      }

      if (!_.includes(starFilters, star)) {
        starFilters.push(star);
      } else {
        _.remove(starFilters, (filter) => filter === star);
      }
      let filterSettings = {
        stars: starFilters,
        sort: filters.sort,
      };
      return filterSettings;
    });
  };

  return (
<div className="OverallStarRatingBars">
      <div className="row">
        <div className="side">
          <div
            className="starRating"
            onClick={filterByStars}
          >{`${star} Star(s)`}</div>
        </div>
        <div className="middle"  >
          <div className="bar-container">
            <div style={{
         height: "18px",
          width: `${(item / ratingCnt) * 100}%`,
          backgroundColor: "black", borderRadius: 50,
        }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRatingsBar;




