import React, { useState } from 'react';
import ReviewForm from './ReviewForm.jsx';


const StarRating = ({ onChange }) => {

  const [starRating, setStarRating] = useState(0);

  const updateRating = (newRating) => {
    setStarRating(newRating);
    onChange?.(newRating);
  };

  return (
    <div id='StarRating' >
      <span>
        <StarRatings
          rating={starRating}
          starRatedColor="gold"
          onClick={() => updateRating(value)}
          numberOfStars={5}
          name='rating'
          starDimension="20px"
          starSpacing="5px"
          style={{
            color: 'grey'
          }}
        />
        {/* <StarRating name="react-star-rating" caption="Rate this component!" totalStars={5} />
        {[1, 2, 3, 4, 5].map((value, index) => (<ReviewForm filled={value <= starRating} val={starRating} key={index} onClick={() => updateRating(value)} />))} */}
      </span>

    </div>
  )
}

export default StarRating;