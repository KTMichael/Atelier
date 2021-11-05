import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';

import testData from '../../../../Data/testData.js';
import { sampleProductId } from './RatingsandReviews.jsx';
import axios from 'axios'
import { TOKEN } from '../../../../config.js';



const ReviewForm = () => {
  const [productInfo, setProductInfo] = useState(testData.testListProducts);
  // send review
  // const [review, setAddReview] = useState({});
  const [clickedAddReview, setForm] = useState(false);
  const [recommended, setRecommended] = useState(null);
  const [newStarRating, setNewStarRating] = useState('');
  //CHARACTERISTICS
  const [characteristics, setCharacteristics] = useState({});
  const [characteristicIds, setCharacteristicIds] = useState([]);
  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [length, setLength] = useState('');
  const [fit, setFit] = useState('');
  // FILLABLE
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [charCount, setCharCount] = useState(50);
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  //PHOTOS
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // VALID
  const [validForm, setValidForm] = useState(true);
  const [ratingError, setRatingError] = useState(null)
  const [bodyError, setBodyError] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [recommendedError, setRecommendedError] = useState(null)
  const [characteristicsError, setCharacteristicsError] = useState(null)

  // PHOTOS
  const handleImageSelect = (event) => {
    if (selectedFile) {
      selectedFiles.push(selectedFile)
    }

    setSelectedFile(URL.createObjectURL(event.target.files[0]))
  }


  // // CHOOSE CHARACTERISTICS
  // let possibleCharacteristics = ['size', 'width', 'comfort', 'quality'];
  // let sizeFit = ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];
  // let widthFit = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
  // let comfortFit = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  // let qualityFit = ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'];
  // let lengthFit = ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  // let fitFit = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];


  // useEffect(() => {
  //   let characteristicsIdandValue = {};
  //   size ? characteristicsIdandValue[characteristicIds[0]] = Number(size) : null;
  //   width ? characteristicsIdandValue[characteristicIds[1]] = Number(width) : null;
  //   comfort ? characteristicsIdandValue[characteristicIds[2]] = Number(comfort) : null;
  //   quality ? characteristicsIdandValue[characteristicIds[3]] = Number(quality) : null;
  //   length ? characteristicsIdandValue[characteristicIds[4]] = Number(length) : null;
  //   fit ? characteristicsIdandValue[characteristicIds[5]] = Number(length) : null;
  //   setCharacteristics(characteristicsIdandValue);
  // }, [size, width, comfort, quality, length, fit])




  //VALIDATE FORM
  const validateForm = ({ rating, body, name, email, recommend, characteristics }) => {
    let isValid = true
    if (rating === '') {
      console.log('rating')
      setRatingError('Star Rating')
      isValid = false;
    }

    if (body.length < 50 || body.length > 1000) {
      console.log('body')
      setBodyError('Review')
      isValid = false
    }
    if (name.length <= 0 || name.length > 60) {
      console.log('name')
      setNameError('Your Nickname')
      isValid = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      console.log('EMAIL')
      setEmailError('A Correctly Formatted Email')
      isValid = false;
    }

    if (recommend === null) {
      console.log('recommend')
      setRecommendedError('If You Would Recommend This Product')
      isValid = false;
    }

    if (Object.values(characteristics).includes('')) {
      setCharacteristicsError('Fill Any Missing Characteristic Ratings')
      console.log('char')
      isValid = false;
    }
    console.log('isValid', isValid)
    setValidForm(isValid)
    return isValid;
  }


  let productName = productInfo[0].name
  const handleSubmit = () => {
    event.preventDefault();
    let defaultPhotos = [];
    if (selectedFile !== null) {
      defaultPhotos = [selectedFile, ...selectedFiles]
    }
    console.log('stars', newStarRating)
    const review = {
      product_id: sampleProductId,
      rating: newStarRating,
      summary: reviewSummary,
      body: reviewBody,
      recommend: recommended,
      name: nickName,
      email: email,
      photos: defaultPhotos,
      characteristics: {
        size: size,
        width: width,
        comfort: comfort,
        quality: quality,
        length: length,
        fit: fit
      }
    }
    if (validateForm(review)) {
      sendReview(review);
    } else {
      console.log('nope')
    }
  }


  const sendReview = (data) => {
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews`, data, {
      headers: {
        Authorization: `${TOKEN}`,
        ContentType: 'application/json',
      }
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }


  const showForm = () => {
    return (
      < div id='ReviewForm' >
        <h2>Write Your Review</h2>
        <h5>About the {productName}</h5>
        <form >
          <StarRating onChange={setNewStarRating} />
          <br />
          <label>Do you recommend this product?</label>
          <input type="radio" value="true" name="recommend" onChange={(event) => setRecommended(event.target.value)} /> Yes
          <input type="radio" value="false" name="recommend" onChange={(event) => setRecommended(event.target.value)} /> No <br /> <br />
          <label>Characteristics: </label> <br /> <br />
          <label>Size:
            <input type="radio" value="1" name="Size" onChange={(event) => setSize(event.target.value)} /> 1
            <input type="radio" value="2" name="Size" onChange={(event) => setSize(event.target.value)} /> 2
            <input type="radio" value="3" name="Size" onChange={(event) => setSize(event.target.value)} /> 3
            <input type="radio" value="4" name="Size" onChange={(event) => setSize(event.target.value)} /> 4
            <input type="radio" value="5" name="Size" onChange={(event) => setSize(event.target.value)} /> 5
          </label>
          <br /> <br />
          <label>Width:
            <input type="radio" value="1" name="Width" onChange={(event) => setWidth(event.target.value)} /> 1
            <input type="radio" value="2" name="Width" onChange={(event) => setWidth(event.target.value)} /> 2
            <input type="radio" value="3" name="Width" onChange={(event) => setWidth(event.target.value)} /> 3
            <input type="radio" value="4" name="Width" onChange={(event) => setWidth(event.target.value)} /> 4
            <input type="radio" value="5" name="Width" onChange={(event) => setWidth(event.target.value)} /> 5
          </label>
          <br /> <br />
          <label>Comfort:
            <input type="radio" value="1" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 1
            <input type="radio" value="2" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 2
            <input type="radio" value="3" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 3
            <input type="radio" value="4" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 4
            <input type="radio" value="5" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 5
          </label>
          <br /> <br />
          <label>Quality:
            <input type="radio" value="1" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 1
            <input type="radio" value="2" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 2
            <input type="radio" value="3" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 3
            <input type="radio" value="4" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 4
            <input type="radio" value="5" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 5
          </label>
          <br /> <br />
          <label>Length:
            <input type="radio" value="1" name="Length" onChange={(event) => setLength(event.target.value)} /> 1
            <input type="radio" value="2" name="Length" onChange={(event) => setLength(event.target.value)} /> 2
            <input type="radio" value="3" name="Length" onChange={(event) => setLength(event.target.value)} /> 3
            <input type="radio" value="4" name="Length" onChange={(event) => setLength(event.target.value)} /> 4
            <input type="radio" value="5" name="Length" onChange={(event) => setLength(event.target.value)} /> 5
          </label>
          <br /> <br />
          <label>Fit:
            <input type="radio" value="1" name="Fit" onChange={(event) => setFit(event.target.value)} /> 1
            <input type="radio" value="2" name="Fit" onChange={(event) => setFit(event.target.value)} /> 2
            <input type="radio" value="3" name="Fit" onChange={(event) => setFit(event.target.value)} /> 3
            <input type="radio" value="4" name="Fit" onChange={(event) => setFit(event.target.value)} /> 4
            <input type="radio" value="5" name="Fit" onChange={(event) => setFit(event.target.value)} /> 5
          </label>
          <br /> <br />
          <label id="summary" >
            Review Summary:  <input type="text" placeholder="Example: Best purchase ever!" style={{ fontWeight: 'bold', width: '200px' }} maxLength="60" value={reviewSummary} onChange={(event) => setReviewSummary(event.target.value)} />
          </label>
          <br /> <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <label id="review" />
            Review: <textarea type="text" placeholder="Why did you like the product or not?" style={{ width: '300px', height: '50px' }} maxLength="1000" minLength="50" value={reviewBody} onChange={(event) => setReviewBody(event.target.value)} onKeyUp={(event) =>
              setCharCount(50 - event.target.value.length)} />
          </div>
          <div>
            {charCount > 0 ?
              <p>Minimum Required Characters Left: {charCount}</p>
              : <p>Minimum Reached</p>}
          </div>
          <div>
            <h4>Add photos</h4>
            {selectedFiles.length !== 4 ?
              <label htmlFor="filePicker" style={{ background: 'grey', padding: "5px 10px" }} >
                Upload Photos
              </label>
              : <p>Thank You For Uploading Photos!</p>}
            <input type='file' id="filePicker" accept='image/*' name="file" multiple onChange={handleImageSelect} style={{ visibility: "hidden" }}>

            </input>
            <div id="photoUploads" >
              <img src={selectedFile} id="thumbnailsRR" />
              <img src={selectedFiles[0]} id="thumbnailsRR" />
              <img src={selectedFiles[1]} id="thumbnailsRR" />
              <img src={selectedFiles[2]} id="thumbnailsRR" />
              <img src={selectedFiles[3]} id="thumbnailsRR" />
            </div>
          </div>
          <br />
          <br /> <br />
          <label id="nickname" >
            Nickname: <input type="text" placeholder="Example: jackson11!" style={{ width: '200px' }} value={nickName} onChange={(event) => setNickName(event.target.value)} />
          </label>
          <p>For privacy reasons, do not use your full name or email address.</p>
          <label id="email" >
            Email: <input type="text" placeholder="Example: jackson11@email.com" style={{ width: '200px' }} value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <p>For authentication reasons, you will not be emailed.</p>

        </form >
        <button onClick={(event) => handleSubmit(event)}> Submit Review </button>
        <br />   <br />
        <div >
          {!validForm ? <div id="Error">
            <h3>You must enter the following: </h3>
            {ratingError} <br />
            {bodyError} <br />
            {nameError} <br />
            {emailError} <br />
            {recommendedError} <br />
            {characteristicsError} <br />
          </div> : null}
        </div>
      </div >
    )
  }
  return (
    <span>
      <button onClick={() => { setForm(true) }}>ADD REVIEW +</button>
      {clickedAddReview ? showForm() : null}
    </span>
  )
}

export default ReviewForm;

