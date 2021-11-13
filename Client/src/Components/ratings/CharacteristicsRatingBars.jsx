import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { char, ratingCnt } from './OverallRatings.jsx';


const CharacteristicsRatingBars = ({ char, ratingCnt }) => {

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexdirection: 'row', padding: '-45px', margin: '-10px' }}>
      {char[0] === 'Fit' ?
        <span style={{ display: 'flex', justifyContent: 'left', marginBottom: '-35px', paddingLeft: '90px' }}>{`${char[0]}`}</span>
        : <span style={{ display: 'flex', justifyContent: 'left', marginBottom: '-35px', paddingLeft: '60px' }}>{`${char[0]}`}</span>}
      <div style={{ height: 20, width: '300px', backgroundColor: "grey", borderRadius: 50, margin: 60 }}>
        <div style={{ height: '100%', width: `${char[1] / 5 * 100}%`, backgroundColor: 'grey', borderRadius: 50, }}>
          <FaArrowAltCircleDown />
        </div>
        {char[0] === 'Fit' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '3px' }}>
            <span>Runs Tight</span>
            <span>Perfect</span>
            <span>Runs Loose</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Size' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '3px' }}>
            <span>Too Small</span>
            <span>Perfect</span>
            <span>Too Big</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Width' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '3px' }}>
            <span>Too Narrow</span>
            <span>Perfect</span>
            <span>Too Wide</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Comfort' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '3px' }}>
            <span>Poor</span>
            <span>Ok</span>
            <span>Perfect</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Quality' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '3px' }}>
            <span>Poor</span>
            <span>What I Expected</span>
            <span>Perfect</span>
          </div>
          : <div style={{ clear: 'none' }} />}
        {char[0] === 'Length' ?
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '3px' }}>
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