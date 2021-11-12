import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { review } from './CustomerReviews.jsx';
import moment from 'moment';
import { FaCheck } from "react-icons/fa";

const IndividualRatings = (review) => {
  const date = moment(review.review.date).format('MMMM DD, YYYY');
  const [helpful, setHelpful] = useState(review.review.helpfulness);
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [report, setReport] = useState('Report');
  const [response, setResponse] = useState(review.review.response)
  const [recommended, setRecommended] = useState(review.review.recommend)
  const [summary, setSummary] = useState(review.review.summary)
  const [body, setBody] = useState(review.review.body)
  const [expand, setExpand] = useState(false);
  const [photos, setPhotos] = useState(review.review.photos)
  const [clickedImage, setClickedImage] = useState(null);
  let showButton;

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



  if (body.length > 250) {
    if (expand) {
      showButton = <button className="uploadPhoto" aria-label="shrink review body" type="button" onClick={() => { setExpand(!expand); }}>Show Less</button>;
    } else {
      showButton = <button className="uploadPhoto" aria-label="expand review body" type="button" onClick={() => { setExpand(!expand); }}>Show More</button>;
    }
  } else {
    showButton;
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
      <div className="revSum">{summary}</div>
      <div>
        {expand ? <p className="sumBody">{body}</p> : (`${body.slice(0, 250)}`)}
        {showButton}
        <br />
      </div>
      {/* <div className="photos" onClick={(event) => { console.log(event.target.src); setClickedImage(event.target.src); }}>
      </div> */}
      {/* {photos.map((photo => <img className="photo thumbnail" key={photo.id} loading="lazy" alt="Customer uploaded photo" src={photo.url} />))} */}
      <div >
        {response !== null ?
          <div style={{ backgroundColor: "grey" }}>
            <span>Response: </span>
            <p>{response}</p>
          </div>
          : <div style={{ clear: 'none' }} />
        }</div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontsize: ".5vw" }}>
        <div >
          <p> Helpful?{' '}
            <span className='RHelpful' onClick={(event) => markReviewHelpful(event)}>Yes </span>
            {`(${helpful})`}{' '}
            | <span className='RReport' onClick={(event) => markReviewReported(event)}>{`${report}`}{' '}</span>
          </p>
        </div>
        {recommended === true ?
          <p> <FaCheck />     I recommend this product</p>
          : <div style={{ clear: 'none' }} />}
      </div>
    </div>

  )

}

export default IndividualRatings;



