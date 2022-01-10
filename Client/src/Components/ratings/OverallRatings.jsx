import React, { useState, useEffect } from "react";
import StarRating from "./StarRating.jsx";
import {
  overallStarRating,
  overallCharacteristics,
  overallRecommended,
} from "./RatingsandReviews.jsx";
import CustomerReviews from "./CustomerReviews.jsx";
import StarRatings from "react-star-ratings";
import StarRatingsBar from "./StarRatingsBar.jsx";
import CharacteristicsRatingBars from "./CharacteristicsRatingBars.jsx";

const OverallRatings = ({
  overallStarRating,
  overallCharacteristics,
  overallRecommended,
  setStarFilter,
  setFilters,
  filters,
}) => {
  const [rating, setRating] = useState(NaN);
  const [ratingCnt, setRatingCnt] = useState(0);
  const [rec, setRec] = useState(0);
  const [char, setChar] = useState([]);
  const [ratingArray, setRatingArray] = useState([]);

  useEffect(() => {
    let ratingCount = 0;
    let totalStars = 0;
    let ratingA = [{ 1: 0 }, { 2: 0 }, { 3: 0 }, { 4: 0 }, { 5: 0 }];
    let rate = [];
    Object.keys(overallStarRating).forEach((starValue) => {
      ratingCount += Number(overallStarRating[starValue]);
      totalStars += Number(starValue) * Number(overallStarRating[starValue]);
      ratingA.forEach((rat) => {
        for (let key in rat) {
          if (starValue === key) {
            rat[key] = Number(overallStarRating[starValue]);
          }
        }
      });
    });
    ratingA.forEach((v) => {
      Object.values(v).forEach((val) => {
        rate.push(val);
      });
    });
    setRatingArray(rate);
    setRatingCnt(ratingCount);
    setRating(totalStars / ratingCount);
  }, [overallStarRating]);

  useEffect(() => {
    let chars = [];
    Object.keys(overallCharacteristics).forEach((charValue) => {
      chars.push([
        charValue,
        Math.floor(overallCharacteristics[charValue].value),
      ]);
    });
    setChar(chars);
  }, [overallCharacteristics]);

  useEffect(() => {
    let recCount =
      Number(overallRecommended.true) + Number(overallRecommended.false);
    recCount = (Number(overallRecommended.true) / recCount) * 100;
    setRec(Math.floor(recCount));
  }, [overallRecommended]);

  const clearFilters = (e) => {
    e.stopPropagation();
    setFilters({ stars: [], sort: null });
  };

  const displayFilters = () => {
    let numFilters = filters.stars.length;
    if (filters.sort !== null) {
      numFilters++;
    }
    if (numFilters >= 2) {
      return (
        <ul style={{ marginRight: "7%" }}>
          <h2>Filters</h2>
          {filters.stars.map((star) => {
            return <li style={{ listStyle: "none" }}>{star} Star(s)</li>;
          })}
          {filters.sort !== null && (
            <li style={{ listStyle: "none" }}>{filters.sort}</li>
          )}
          <button className="btnf" onClick={clearFilters}>
            Clear Filters
          </button>
        </ul>
      );
    }
  };

  return (
    <>
      {rating !== NaN ? (
        <div id="OverallRatingsMain">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 id="ratingInt">
                {rating === 0 ? rating : rating.toFixed(1)}
              </h1>
              <StarRatings
                rating={rating || 0}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="25px"
                starSpacing="2px"
              />
            </div>
            <div className="recTitle">
              {` ${rec}% of reviews recommend this product`}
            </div>

            <div>
              {ratingArray.map((item, idx) => (
                <StarRatingsBar
                  key={idx}
                  item={item}
                  ratingCnt={ratingCnt}
                  star={idx + 1}
                  setStarFilter={setStarFilter}
                  setFilters={setFilters}
                />
              ))}
            </div>
            <br />
            <hr />
            {displayFilters()}
            {char.map((char, idx) => (
              <CharacteristicsRatingBars
                char={char}
                key={idx}
                ratingCnt={ratingCnt}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OverallRatings;
