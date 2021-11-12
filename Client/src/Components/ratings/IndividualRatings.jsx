import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { review } from './CustomerReviews.jsx';
import moment from 'moment';


const IndividualRatings = (review) => {
  const date = moment(review.review.date).format('MMMM DD, YYYY');
  const [helpful, setHelpful] = useState(review.review.helpfulness);
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [report, setReport] = useState('Report');



  const markReviewHelpful = (event) => {
    setMarkedHelpful(true);
    axios.put(`reviews/${review.review.review_id}/helpful`)
      .then(() => {
        console.log('Yay review marked as helpful')
        setMarkedHelpful(true);
        setHelpful(helpful + 1);
      })
      .catch(error => console.log(error))

  }

  const markReviewReported = (event) => {
    setReported(true)
    axios.put(`reviews/${review.review.review_id}/report`)
      .then((response) => {
        console.log('Yay review reported')
        setReported(true);
        setReport('Reported');
      })
      .catch(error => console.log(error))
  }

  return (
    <div id="reviewTile">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <StarRatings
          rating={review.review.rating}
          starRatedColor='gold'
          numberOfStars={5}
          starDimension='25px'
          starSpacing='2px'
        />
        <span>{`${review.review.reviewer_name}, ${date}`}</span>
      </div>
      <br />        <br />
      <div className="revSum">{review.review.summary}</div>
      <p className="sumBody">{review.review.body}</p>
      <div>{review.review.photos}</div>
      <p style={{ backgroundcolor: "grey" }}>{review.review.response}</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', fontsize: ".5vw" }}>
        <p> Helpful?{' '}
          <span className='RHelpful' onClick={(event) => markReviewHelpful(event)}>Yes </span>
          {`${helpful}`}{' '}
          | <span className='RReport' onClick={(event) => markReviewReported(event)}>{`${report}`}{' '}</span>
        </p>
      </div>
    </div>

  )

}

export default IndividualRatings;