import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import testData from '../../../../Data/testData.js';



const ReviewForm = ({ show }) => {
  const [productInfo, setProductInfo] = useState(testData.testListProducts);
  const [recommend, setRecommend] = useState(null);
  const [size, setSize] = useState(null);
  const [width, setWidth] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [quality, setQuality] = useState(null);
  const [length, setLength] = useState(null);
  const [fit, setFit] = useState(null);
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [charCount, setCharCount] = useState();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');

  // const [viewable, setViewable] = useState(false);
  let productName = productInfo[0].name

  if (show) {
    return (
      < div id='ReviewForm' >
        <h2>Write Your Review</h2>
        <h5>About the {productName}</h5>
        <form>
          <StarRating /> <br />
          <label>Do you recommend this product?</label>
          <input type="radio" value="Yes" name="recommend" /> Yes
          <input type="radio" value="No" name="recommend" /> No <br /> <br />
          <label>Characteristics: </label> <br /> <br />
          <label>Size:
            <input type="radio" value="1" name="Size" /> 1
            <input type="radio" value="2" name="Size" /> 2
            <input type="radio" value="3" name="Size" /> 3
            <input type="radio" value="4" name="Size" /> 4
            <input type="radio" value="5" name="Size" /> 5
          </label>
          <br /> <br />
          <label>Width:
            <input type="radio" value="1" name="Width" /> 1
            <input type="radio" value="2" name="Width" /> 2
            <input type="radio" value="3" name="Width" /> 3
            <input type="radio" value="4" name="Width" /> 4
            <input type="radio" value="5" name="Width" /> 5
          </label>
          <br /> <br />
          <label>Comfort:
            <input type="radio" value="1" name="Comfort" /> 1
            <input type="radio" value="2" name="Comfort" /> 2
            <input type="radio" value="3" name="Comfort" /> 3
            <input type="radio" value="4" name="Comfort" /> 4
            <input type="radio" value="5" name="Comfort" /> 5
          </label>
          <br /> <br />
          <label>Quality:
            <input type="radio" value="1" name="Quality" /> 1
            <input type="radio" value="2" name="Quality" /> 2
            <input type="radio" value="3" name="Quality" /> 3
            <input type="radio" value="4" name="Quality" /> 4
            <input type="radio" value="5" name="Quality" /> 5
          </label>
          <br /> <br />
          <label>Length:
            <input type="radio" value="1" name="Length" /> 1
            <input type="radio" value="2" name="Length" /> 2
            <input type="radio" value="3" name="Length" /> 3
            <input type="radio" value="4" name="Length" /> 4
            <input type="radio" value="5" name="Length" /> 5
          </label>
          <br /> <br />
          <label>Fit:
            <input type="radio" value="1" name="Fit" /> 1
            <input type="radio" value="2" name="Fit" /> 2
            <input type="radio" value="3" name="Fit" /> 3
            <input type="radio" value="4" name="Fit" /> 4
            <input type="radio" value="5" name="Fit" /> 5
          </label>
          <br /> <br />
          <label id="summary">
            Review Summary:
            <input
              type="text"
              value={reviewSummary}
              onChange={(e) => setReviewSummary(e.target.value)}
            />
          </label>
          <br /> <br />
          <label id="review">
            Review:
            <input
              type="text"
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
            />
          </label>
          <br /> <br />
          <button type="submit" value="Submit"> Upload Photos </button>
          <br /> <br />
          <label id="nickname">
            Nickname:
            <input
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </label>
          <br /> <br />
          <label id="email">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br /> <br />
          <button type="submit" value="Submit"> Submit Review </button>
        </form>

      </div >
    )
  }
  return null;
}

export default ReviewForm;