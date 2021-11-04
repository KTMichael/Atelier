import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import testData from '../../../../Data/testData.js';
import { sampleProductId } from './RatingsandReviews.jsx';
import axios from 'axios'
import { TOKEN } from '../../../../config.js';



const ReviewForm = ({ filled, onClick, val }) => {
  const [productInfo, setProductInfo] = useState(testData.testListProducts);
  // send review
  // const [review, setAddReview] = useState({});
  const [clickedAddReview, setForm] = useState(false);
  const [recommend, setRecommend] = useState(null);
  //CHARACTERISTICS
  const [characteristics, setCharacteristics] = useState({});
  const [characteristicIds, setCharacteristicIds] = useState([]);
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');

  // ///Photos

  const handleImageSelect = (event) => {
    if (selectedFile) {
      selectedFiles.push(selectedFile)
    }

    selectedFiles.length < 5 ? setSelectedFile(URL.createObjectURL(event.target.files[0])) : alert('Only five images can be uploaded at a time');
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

  const validateForm = ({ rating, body, name, email, recommend, characteristics }) => {
    const isValid = true;
    if (rating === undefined || rating === null) {
      isValid = false;
    }

    if (body.length < 50 || body.length > 1000) {
      isValid = false;
    }

    if (name.length < 4 || name.length > 15) {
      isValid = false;
    }

    if (email.length.includes('@') === -1 || email.length.includes('.') === -1) {
      isValid = false;
    }

    if (recommend !== true || recommend !== false) {
      isValid = false;
    }

    if (!Object.values(characteristics).includes('')) {
      isValid = false;
    }
    return isValid;
  }






  let productName = productInfo[0].name
  const handleSubmit = (event, val) => {
    console.log(val)
    event.preventDefault();
    if (validateForm) {
      let defaultPhotos = [];
      if (selectedFile !== null) {
        defaultPhotos = [selectedFile, ...selectedFiles]
      }
      const review = {
        product_id: sampleProductId,
        rating: val.toString(),
        summary: event.target.value,
        body: event.target.value,
        recommend: event.target.value,
        name: event.target.value,
        email: event.target.value,
        photos: defaultPhotos,
        characteristics: {
          // size: event.target.value,
          // width: event.target.value,
          // comfort: event.target.value,
          // quality: event.target.value,
          // length: event.target.value,
          fit: {
            id: 142032,
            value: event.target.value
          }
        }
      }
      sendReview(review);
    }
    console.log('nope')
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
        {console.log(val)}
        <h2>Write Your Review</h2>
        <h5>About the {productName}</h5>
        <form >
          <StarRating /><br />
          <label>Do you recommend this product?</label>
          <input type="radio" value="true" name="recommend" onChange={(event) => setRecommend(event.target.value)} /> Yes
          <input type="radio" value="false" name="recommend" onChange={(event) => setRecommend(event.target.value)} /> No <br /> <br />
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
          <label id="summary">
            Review Summary: {' '} <input type="text" value={reviewSummary} maxLength="60" onChange={(event) => setReviewSummary(event.target.value)} />
          </label>
          <br /> <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <label id="review" />      Review: {' '} <textarea type="text" maxLength="1000" minLength="50" value={reviewBody} onChange={(event) => setReviewBody(event.target.value)} onKeyUp={(event) =>
              setCharCount(50 - event.target.value.length)} />
          </div>
          <div>
            {charCount > 0 ?
              <p>Minimum Required Characters Left: {charCount}</p>
              : <p>Minimum Reached</p>}
          </div>
          <br />
          <div>
            <h4>Add photos</h4>
            <input type='file' accept='image/*' multiple onChange={handleImageSelect}>
            </input>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <img src={selectedFile} />
              <img src={selectedFiles[0]} />
              <img src={selectedFiles[1]} />
              <img src={selectedFiles[2]} />
              <img src={selectedFiles[3]} />
            </div>
          </div>
          <button type="submit" value="Submit"> Upload Photos </button>
          <br /> <br />
          <label id="nickname" >
            Nickname: {''} <input type="text" placeholder="What is your Nickname?" style={{ width: '200px' }} value={nickName} onChange={(event) => setNickName(event.target.value)} />
          </label>
          <br /> <br />
          <label id="email" >
            Email: {''} <input type="text" placeholder="Example: jackson11!" style={{ width: '200px' }} value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <br /> <br />
        </form >
        <button onClick={(event) => handleSubmit(event)}> Submit Review </button>
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