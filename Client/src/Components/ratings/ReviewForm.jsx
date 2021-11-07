import React, { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating.jsx';
import { productId, productName } from './RatingsandReviews.jsx';
import axios from 'axios'
import { TOKEN } from '../../../../config.js';
import Popup from 'reactjs-popup';



const ReviewForm = ({ productId, productName }) => {

  // send review
  // const [review, setAddReview] = useState({});
  const [recommended, setRecommended] = useState(null);
  const [newStarRating, setNewStarRating] = useState('');
  //CHARACTERISTICS
  const [clickedShowExplanations, setClickedShowExplanations] = useState(false);
  const [characteristics, setCharacteristics] = useState({});
  const [characteristicIds, setCharacteristicIds] = useState({});
  const [size, setSize] = useState(null);
  const [width, setWidth] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [quality, setQuality] = useState(null);
  const [length, setLength] = useState(null);
  const [fit, setFit] = useState(null);
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
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  // PHOTOS
  const handleImageSelect = (event) => {
    if (selectedFile) {
      selectedFiles.push(selectedFile)
    }

    setSelectedFile(URL.createObjectURL(event.target.files[0]))
  }
  //
  useEffect(() => {
    if (productId.toString().slice(-1) === '6') {
      setCharacteristicIds({
        '142032': Number(fit),
        '142033': Number(length),
        '142034': Number(comfort),
        '142035': Number(quality),
      })
      setCharacteristics({
        size: false,
        width: false,
        comfort: true,
        quality: true,
        length: true,
        fit: true
      })
    }
    if (productId.toString().slice(-1) === '7') {
      setCharacteristicIds({
        '142036': Number(quality),
      })
      setCharacteristics({
        size: false,
        width: false,
        comfort: false,
        quality: true,
        length: false,
        fit: false
      })
    }
    if (productId.toString().slice(-1) === '8') {
      setCharacteristicIds({
        '142037': Number(fit),
        '142038': Number(length),
        '142039': Number(comfort),
        '142040': Number(quality),
      })
      setCharacteristics({
        size: false,
        width: false,
        comfort: true,
        quality: true,
        length: true,
        fit: true
      })
    }
    if (productId.toString().slice(-1) === '9') {
      setCharacteristicIds({
        '142041': Number(fit),
        '142042': Number(length),
        '142043': Number(comfort),
        '142044': Number(quality),
      })
      setCharacteristics({
        size: false,
        width: false,
        comfort: true,
        quality: true,
        length: true,
        fit: true
      })
    }
    if (productId.toString().slice(-1) === '0') {
      setCharacteristicIds({
        '142045': Number(size),
        '142046': Number(width),
        '142047': Number(comfort),
        '142048': Number(quality),
      })
      setCharacteristics({
        size: true,
        width: true,
        comfort: true,
        quality: true,
        length: false,
        fit: false
      })
    }

  }, [productId, size, fit, width, comfort, quality, length])


  //VALIDATE FORM
  const validateForm = ({ rating, body, name, email, recommend, characteristics }) => {
    let isValid = true
    if (rating === '') {
      // console.log('rating')
      setRatingError('Star Rating')
      isValid = false;
    }

    if (body.length < 50 || body.length > 1000) {
      // console.log('body')
      setBodyError('Review')
      isValid = false
    }
    if (name.length <= 0 || name.length > 60) {
      // console.log('name')
      setNameError('Your Nickname')
      isValid = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      // console.log('EMAIL')
      setEmailError('A Correctly Formatted Email')
      isValid = false;
    }

    if (recommend === null) {
      // console.log('recommend')
      setRecommendedError('If You Would Recommend This Product')
      isValid = false;
    }

    if (Object.values(characteristics).includes('')) {
      setCharacteristicsError('Fill Any Missing Characteristic Ratings')
      // console.log('char')
      isValid = false;
    }
    // console.log('isValid', isValid)
    setValidForm(isValid)
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let defaultPhotos = [];
    if (selectedFile !== null) {
      defaultPhotos = [selectedFile, ...selectedFiles]
    }
    const review = {
      product_id: productId,
      rating: newStarRating,
      summary: reviewSummary,
      body: reviewBody,
      recommend: JSON.parse(recommended),
      name: nickName,
      email: email,
      photos: defaultPhotos,
      characteristics: characteristicIds
    }
    if (validateForm(review) === true) {
      const options = {
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews',
        method: 'post',
        headers: {
          Authorization: `${TOKEN}`,
          ContentType: 'application/json',
        },
        data: review
      };
      axios(options)
        .then((response) => console.log('Review Sent! ', response.data))
        .catch((error) => console.log('POST REVIEW ERROR ', error));

    }
  }


  const showForm = () => {
    return (
      < div id='ReviewForm' >
        <h1>Write Your Review</h1>
        <h5>About the {productName}</h5>
        <form >
          <h2>Overall Rating</h2>
          <StarRating onChange={setNewStarRating} />
          {newStarRating === 1 ? <span>Poor</span> : newStarRating === 2 ? <span>Fair</span> : newStarRating === 3 ? <span>Average</span> : newStarRating === 4 ? <span>Good</span> : newStarRating === 5 ? <span>Great</span> : null}
          <h3>Do you recommend this product?</h3>
          <input type="radio" value="true" name="recommend" onChange={(event) => setRecommended(event.target.value)} /> Yes
          <input type="radio" value="false" name="recommend" onChange={(event) => setRecommended(event.target.value)} /> No <br /> <br />
          <h2>Characteristics </h2>
          <Popup trigger={<span style={{ backgroundColor: 'white', color: 'black', padding: '5px', fontSize: '.75vw' }}> Click Here To See Characteristic Value Explanation </span>} position="right" nested>
            <table style={{ borderSpacing: '5px 10px', textAlign: 'center', border: '1px solid black', backgroundColor: 'white' }}>
              <tr >
                <th></th>
                <th style={{ fontWeight: 'bold' }}>1</th>
                <th style={{ fontWeight: 'bold' }}>2</th>
                <th style={{ fontWeight: 'bold' }}>3</th>
                <th style={{ fontWeight: 'bold' }}>4</th>
                <th style={{ fontWeight: 'bold' }}>5</th>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Size</td>
                <td>A Size Too Small</td>
                <td>1⁄2 A Size Too Small</td>
                <td>Perfect</td>
                <td>1⁄2 A Size Too Big</td>
                <td>A Size Too Wide</td>
              </tr>
              <tr >
                <td style={{ fontWeight: 'bold' }}>Width</td>
                <td>Too Narrow</td>
                <td>Slightly Narrow</td>
                <td>Perfect</td>
                <td>Slightly Wide</td>
                <td>Too Wide</td>
              </tr>
              <tr >
                <td style={{ fontWeight: 'bold' }}>Comfort</td>
                <td>Uncomfortable</td>
                <td>Slightly Uncomfortable</td>
                <td>Ok</td>
                <td>Comfortable</td>
                <td>Perfect</td>
              </tr>
              <tr >
                <td style={{ fontWeight: 'bold' }}>Quality</td>
                <td>Poor</td>
                <td>Below Average</td>
                <td>What I Expected</td>
                <td>Pretty Great</td>
                <td>Perfect</td>
              </tr>
              <tr >
                <td style={{ fontWeight: 'bold' }}>Length</td>
                <td>Runs Short</td>
                <td>Runs Slightly Short</td>
                <td>Perfect</td>
                <td>Runs Slightly Long</td>
                <td>Runs Long</td>
              </tr>
              <tr >
                <td style={{ fontWeight: 'bold' }}>Fit</td>
                <td>Runs Tight</td>
                <td>Runs SlightlyTight</td>
                <td>Perfect</td>
                <td>Runs Slightly Loose</td>
                <td>Runs Loose</td>
              </tr>
            </table>
          </Popup>
          <br /> <br />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }} >
            {characteristics.size ?
              <label>Size:
                <input type="radio" value="1" name="Size" onChange={(event) => setSize(event.target.value)} /> 1
                <input type="radio" value="2" name="Size" onChange={(event) => setSize(event.target.value)} /> 2
                <input type="radio" value="3" name="Size" onChange={(event) => setSize(event.target.value)} /> 3
                <input type="radio" value="4" name="Size" onChange={(event) => setSize(event.target.value)} /> 4
                <input type="radio" value="5" name="Size" onChange={(event) => setSize(event.target.value)} /> 5
              </label>
              : <div style={{ clear: 'none' }} />}
            {characteristics.width ?
              <label>Width:
                <input type="radio" value="1" name="Width" onChange={(event) => setWidth(event.target.value)} /> 1
                <input type="radio" value="2" name="Width" onChange={(event) => setWidth(event.target.value)} /> 2
                <input type="radio" value="3" name="Width" onChange={(event) => setWidth(event.target.value)} /> 3
                <input type="radio" value="4" name="Width" onChange={(event) => setWidth(event.target.value)} /> 4
                <input type="radio" value="5" name="Width" onChange={(event) => setWidth(event.target.value)} /> 5
              </label>
              : <div style={{ clear: 'none' }} />}
            {characteristics.comfort ?
              <label>Comfort:
                <input type="radio" value="1" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 1
                <input type="radio" value="2" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 2
                <input type="radio" value="3" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 3
                <input type="radio" value="4" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 4
                <input type="radio" value="5" name="Comfort" onChange={(event) => setComfort(event.target.value)} /> 5
              </label>
              : <div style={{ clear: 'none' }} />}
            {characteristics.quality ?
              <label>Quality:
                <input type="radio" value="1" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 1
                <input type="radio" value="2" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 2
                <input type="radio" value="3" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 3
                <input type="radio" value="4" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 4
                <input type="radio" value="5" name="Quality" onChange={(event) => setQuality(event.target.value)} /> 5
              </label>
              : <div style={{ clear: 'none' }} />}
            {characteristics.length ?
              <label>Length:
                <input type="radio" value="1" name="Length" onChange={(event) => setLength(event.target.value)} /> 1
                <input type="radio" value="2" name="Length" onChange={(event) => setLength(event.target.value)} /> 2
                <input type="radio" value="3" name="Length" onChange={(event) => setLength(event.target.value)} /> 3
                <input type="radio" value="4" name="Length" onChange={(event) => setLength(event.target.value)} /> 4
                <input type="radio" value="5" name="Length" onChange={(event) => setLength(event.target.value)} /> 5
              </label>
              : <div style={{ clear: 'none' }} />}
            {characteristics.fit ?
              <label>Fit:
                <input type="radio" value="1" name="Fit" onChange={(event) => setFit(event.target.value)} /> 1
                <input type="radio" value="2" name="Fit" onChange={(event) => setFit(event.target.value)} /> 2
                <input type="radio" value="3" name="Fit" onChange={(event) => setFit(event.target.value)} /> 3
                <input type="radio" value="4" name="Fit" onChange={(event) => setFit(event.target.value)} /> 4
                <input type="radio" value="5" name="Fit" onChange={(event) => setFit(event.target.value)} /> 5
              </label>
              : <div style={{ clear: 'none' }} />}
          </div>
          <br />

          <h2>Review Summary</h2>
          <input type="text" placeholder="Example: Best purchase ever!" style={{ fontWeight: 'bold', width: '300px', height: '25px' }} maxLength="60" value={reviewSummary} onChange={(event) => setReviewSummary(event.target.value)} />

          <div >
            <h2>Review</h2>
            <textarea type="text" placeholder="Why did you like the product or not?" style={{ width: '500px', height: '100px' }} maxLength="1000" minLength="50" value={reviewBody} onChange={(event) => setReviewBody(event.target.value)} onKeyUp={(event) =>
              setCharCount(50 - event.target.value.length)} />
          </div>
          <div>
            {charCount > 0 ?
              <p>Minimum Required Characters Left: {charCount}</p>
              : <p>Minimum Reached</p>}
          </div>


          <div>
            <h2>Add photos</h2>
            {selectedFiles.length !== 4 ?
              <label htmlFor="filePicker" className="btn" style={{ margin: '30%' }} >
                Upload Photos
              </label>
              : <h3>Thank You For Uploading Photos!</h3>}
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


          <h2>Nickname </h2>
          <input type="text" placeholder="Example: jackson11!" style={{ width: '300px', height: '25px' }} value={nickName} onChange={(event) => setNickName(event.target.value)} />
          <p>For privacy reasons, do not use your full name or email address.</p>

          <h2>Email</h2>
          <input type="text" placeholder="Example: jackson11@email.com" style={{ width: '300px', height: '25px' }} value={email} onChange={(event) => setEmail(event.target.value)} />

          <p>For authentication reasons, you will not be emailed.</p>

          <button className="btn" type="submit" onClick={(event) => {
            handleSubmit(event); closeTooltip();
          }} > Submit </button>

        </form >
        <br />   <br />
        <div >
          {!validForm ?
            <div id="Error">
              <h3>You must enter the following: </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} >
                {{ ratingError } ? <div> {ratingError}</div> : <div style={{ clear: 'none' }} />}
                <div> {bodyError} </div>
                <div> {nameError} </div>
                <div> {emailError} </div>
                <div> {recommendedError} </div>
                <div> {characteristicsError} </div>
              </div></div> : <div style={{ clear: 'none' }} />}
        </div>
      </div >
    )
  }
  return (
    <Popup ref={ref} trigger={<button className="btn"> ADD REVIEW + </button>} modal>
      {showForm()}
    </Popup>
  )
}
export default ReviewForm;