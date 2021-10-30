import React, { useState } from 'react';
import ReviewForm from './ReviewForm.jsx';

const AddReview = () => {
  const [show, setShow] = useState(false);

  const showReviewForm = () => {
    show === true ? setShow(false) : setShow(true)
  };

  return (
    <div id="btn">
      <button id="AddReviewBtn" onClick={showReviewForm}> ADD REVIEW  + </button>
      <ReviewForm show={show} />
    </div>

  )
}

export default AddReview;