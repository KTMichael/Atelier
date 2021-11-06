import React, { useState } from 'react';
import Stars from './Stars.jsx';

const StarRating = ({ onChange }) => {
  const [starRating, setStarRating] = useState(0);

  const updateRating = (newRating) => {
    setStarRating(newRating);
    onChange?.(newRating);
  };

  return (
    <div id='StarRating' >
      <span>
        {[1, 2, 3, 4, 5].map((value, index) => (<Stars filled={value <= starRating} val={starRating} key={index} onClick={() => updateRating(value)} />))}
      </span>
    </div>
  )
}

export default StarRating;