import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import testData from '../../../../Data/testData.js';


const ReviewForm = () => {
  const [productInfo, setProductInfo] = useState(testData.testListProducts);
  let productName = productInfo[0].name
  return (
    < div id='ReviewForm' >
      <h2>Write Your Review</h2>
      <h5>About the {productName}</h5>
      <form>
        <StarRating /> <br />
        <label>Do you recommend this product?</label>
        <input type="radio" value="Yes" name="gender" /> Yes
        <input type="radio" value="No" name="gender" /> No <br /> <br />
        <label>Characteristics</label> <br /> <br />
        <label>{}</label>
        <input type="radio" value="1" name="gender" /> 1
        <input type="radio" value="2" name="gender" /> 2
        <input type="radio" value="3" name="gender" /> 3
        <input type="radio" value="4" name="gender" /> 4
        <input type="radio" value="5" name="gender" /> 5
        <br /> <br />
      </form>

    </div >
  )
}

export default ReviewForm;