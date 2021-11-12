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
  const [starFilter, setStarFilter] = useState([]);


  useEffect(() => {
    setProduct_Id(productId);
    setProductName(allProductsData.name);
    axios.get(`/reviews/meta/`, { params: { product_id: productId } })
      .then(response => {
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
          <CustomerReviews overallStarRating={overallStarRating} productId={productId} starFilter={starFilter} productName={productName}/>
        </div>
      </div>
    </div>
  )
}

export default RatingsandReviews;