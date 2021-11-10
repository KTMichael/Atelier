import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { char, ratingCnt } from './OverallRatings.jsx';


const CharacteristicsRatingBars = ({ char, ratingCnt }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <p style={{ display: 'flex', justifyContent: 'left'  }}>{`${char[0]}`}</p>
      <div style={{ height: 20, width: '75%', backgroundColor: "grey", borderRadius: 50, margin: 50 }}>
        <div style={{ height: '100%', width: `${char[1] / 5 * 100}%`, backgroundColor: 'grey', borderRadius: 'inherit', textAlign: 'right' }}>
          <FaArrowAltCircleDown />
        </div>
        {char[0] === 'Fit' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>Runs Tight</span>
            <span>Perfect</span>
            <span>Runs Loose</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Size' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>Too Small</span>
            <span>Perfect</span>
            <span>Too Big</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Width' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>Too Narrow</span>
            <span>Perfect</span>
            <span>Too Wide</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Comfort' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>Poor</span>
            <span>Ok</span>
            <span>Perfect</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Quality' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>Poor</span>
            <span>What I Expected</span>
            <span>Perfect</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Length' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>Runs Short</span>
            <span>Perfect</span>
            <span>Runs Long</span>
          </div>
          : <div style={{ clear: 'none' }} />}
      </div>
    </div>
  );
};

export default CharacteristicsRatingBars;