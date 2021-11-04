import React, { useContext, useEffect, useState } from 'react';
import { testContext } from './context.js';
import { TOKEN } from '../../../../config.js';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

function ProductDisplay() {
  const [productInfo, setProductInfo] = useState({});
  const [price, setPrice] = useState(0);
  const [ image, setImage ] = useState(null);
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [ rating, setRating ] = useState(0);
  const productAPI = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/";
  const reviewsAPI = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta";
  const {product} = useContext(testContext);

  useEffect( () => {
    axios.get(`${productAPI}${product}`, { headers: { Authorization: `${TOKEN}`}})
      .then( results => {
        setProductInfo(results.data);
      })
      .then( () => {
        axios.get(`${productAPI}${product}/styles`, { headers: { Authorization: `${TOKEN}`}})
          .then( results => {
            setPrice(results.data.results[0].original_price);
            setImage(results.data.results[0].photos[0].thumbnail_url);
          })
      })
      .then( () => {
        axios.get(`${reviewsAPI}?product_id=${product}`, {
          headers: { Authorization: `${TOKEN}`},})
          .then( results => {
            var ratingsInfo = results.data.ratings;
            extractRatingFrom(ratingsInfo);
          })
      })
  }, [])

  const extractRatingFrom = (info) => {
    var totalStars = 0;
    var totalRatings = 0;
    var starRating = Object.keys(info);
    for ( starRating in info ) {
      var star = parseInt(starRating);
      var numStarRating = parseInt(info[starRating]);
      var numStars = star * numStarRating;

      totalStars += numStars;
      totalRatings += numStarRating;
    }
    setRating(totalStars / totalRatings);
  }

  const toggleFavorite = () => {
    setIsFavorite( isFavorite => !isFavorite );
  }

  const renderClickableStar = () => {
    return (
      <label>
        <input id='favorite-radio' type='radio' onClick={toggleFavorite} />
        <FaStar id='favorite-star' color={isFavorite ? '#ffc107' : '#e4e5e9'} />
      </label>
    )
  }

  const renderRating = () => {
    var index = 0;
    return (
      <div id='five-star-rating'>
        {[...Array(5)].map(star => {
          return <FaStar id='star-overall-rating' color={(index + 1) < rating ? '#ffc107' : '#e4e5e9'}/>
        })}
      </div>
    )
  }

  return (
    <div id='product-display'>
      <img id='product-image' src={image}/>
      <p>{productInfo.category}</p>
      <p>{productInfo.slogan}</p>
      <p>{`$${price}`}</p>
      {renderClickableStar()}
      {renderRating()}
    </div>
  )
}

export default ProductDisplay;