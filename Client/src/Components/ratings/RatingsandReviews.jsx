import React, { useState, useEffect } from 'react';
import CustomerReviews from './CustomerReviews.jsx';
import OverallRatings from './OverallRatings.jsx';
import ReviewForm from './ReviewForm.jsx';
import { productId, allProductsData } from '../App.jsx';
import axios from 'axios';


const RatingsandReviews = ({ productId, allProductsData }) => {
  const [moreReviews, setMoreReviews] = useState([]);
  const [product_Id, setProduct_Id] = useState(0);
  const [productName, setProductName] = useState('');
  const [overallStarRating, setOverallStarRating] = useState({});
  const [overallRecommended, setOverallRecommended] = useState({});
  const [overallCharacteristics, setOverallCharacteristics] = useState({});
  const [starFilter, setStarFilter] = useState(null);


  useEffect(() => {
    setProduct_Id(productId);
    console.log(allProductsData.name)
    setProductName(allProductsData.name);
    axios.get(`/reviews/meta/?product_id=${product_Id}`)
      .then(response => {
        // console.log('response', response.data)
        setOverallCharacteristics(response.data.characteristics)
        setOverallRecommended(response.data.recommended)
        setOverallStarRating(response.data.ratings)
      })
      .catch(error => console.log(error))
  }, [productId, allProductsData]);



  return (
    <div id="RatingsandReviews" >
      <div id="RRTitle">
        <h1> Ratings & Reviews</h1>
      </div>
      <div id="RRComp">
        <div id="OverallRatings">
          <OverallRatings overallRecommended={overallRecommended} overallCharacteristics={overallCharacteristics} overallStarRating={overallStarRating} setStarFilter={setStarFilter} />
        </div>
        <div id="CustomerReviewsMain">
          <CustomerReviews overallStarRating={overallStarRating} productId={product_Id} starFilter={starFilter}/>
          <div id="CustomerReviews" style={{ display: 'flex', flexDirection: 'row' }}>
            <div id="btn">
              <button className="btn" onClick={() => setMoreReviews(moreReviews + 2)}>MORE REVIEWS</button>
            </div>
            <ReviewForm productId={productId} productName={productName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsandReviews;