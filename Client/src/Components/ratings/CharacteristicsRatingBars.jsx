import React, { useState, useEffect } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { char, ratingCnt } from "./OverallRatings.jsx";

const CharacteristicsRatingBars = ({ char, ratingCnt }) => {
  return (
    <div className="OverallStarRatingBars">
      <div className="row">
        <div className="side">
          <div className="charRating ">{`${char[0]}`}</div>
        </div>
        <div className="middleChar">
          <div className="bar-containerChar">
            <div
              style={{
                height: "18px",
                width: `${(char[1] / 5) * 100}%`,
                borderRadius: 50,
              }}
            >
              {" "}
              <FaArrowAltCircleDown />
            </div>
          </div>
          <div>
            {char[0] === "Fit" ? (
              <div className="charText">
                <span>Runs Tight</span>
                <span>Perfect</span>
                <span>Runs Loose</span>
              </div>
            ) : (
              <div style={{ clear: "none" }} />
            )}
            {char[0] === "Size" ? (
              <div className="charText">
                <span>Too Small</span>
                <span>Perfect</span>
                <span>Too Big</span>
              </div>
            ) : (
              <div style={{ clear: "none" }} />
            )}
            {char[0] === "Width" ? (
              <div className="charText">
                <span>Too Narrow</span>
                <span>Perfect</span>
                <span>Too Wide</span>
              </div>
            ) : (
              <div style={{ clear: "none" }} />
            )}
            {char[0] === "Comfort" ? (
              <div className="charText">
                <span>Poor</span>
                <span>Ok</span>
                <span>Perfect</span>
              </div>
            ) : (
              <div style={{ clear: "none" }} />
            )}
            {char[0] === "Quality" ? (
              <div className="charText">
                <span>Poor</span>
                <span>What I Expected</span>
                <span>Perfect</span>
              </div>
            ) : (
              <div style={{ clear: "none" }} />
            )}
            {char[0] === "Length" ? (
              <div className="charText">
                <span>Runs Short</span>
                <span>Perfect</span>
                <span>Runs Long</span>
              </div>
            ) : (
              <div style={{ clear: "none" }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacteristicsRatingBars;
