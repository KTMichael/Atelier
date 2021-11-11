import React, { useContext, useEffect, useState } from 'react';
import ComparisonPopup from './ComparisonPopup.jsx';
import { testContext } from './context.js';
import { TOKEN } from '../../../../config.js';
import { FaStar, FaRegTimesCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

function ProductDisplay() {
  const [productInfo, setProductInfo] = useState({});
  const [comparisonPopupState, setComparisonPopupState] = useState({ open: false });
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const productAPI = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/";
  const reviewsAPI = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta";
  const { mainProduct, product, isOutfit, removeItem } = useContext(testContext);

  useEffect(() => {
    axios.get(`${productAPI}${product}`, { headers: { Authorization: `${TOKEN}` } })
      .then(results => {
        setProductInfo(results.data);
      })
      .then(() => {
        axios.get(`${productAPI}${product}/styles`, { headers: { Authorization: `${TOKEN}` } })
          .then(results => {
            setPrice(results.data.results[0].original_price);
            setImage(results.data.results[0].photos[0].thumbnail_url);
          })
      })
      .then(() => {
        axios.get(`${reviewsAPI}?product_id=${product}`, {
          headers: { Authorization: `${TOKEN}` },
        })
          .then(results => {
            var ratingsInfo = results.data.ratings;
            extractRatingFrom(ratingsInfo);
          })
      })
  }, [])

  const extractRatingFrom = (info) => {
    var totalStars = 0;
    var totalRatings = 0;
    var starRating = Object.keys(info);
    for (starRating in info) {
      var star = parseInt(starRating);
      var numStarRating = parseInt(info[starRating]);
      var numStars = star * numStarRating;

      totalStars += numStars;
      totalRatings += numStarRating;
    }
    setRating(totalStars / totalRatings);
  }

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(isFavorite => !isFavorite);
  }

  const removeProductDisplay = (e) => {
    e.stopPropagation();
    removeItem(product);
  }

  const renderClickableStar = () => {
    return (
      <div>
        <input id='favorite-radio' type='radio' />
        <FaStar id='favorite-star' onClick={toggleFavorite} color={isFavorite ? 'yellow' : '#e4e5e9'} />
      </div>
    )
  }

  const renderCloseButton = () => {
    return (
      <div>
        <FaRegTimesCircle className='close-outfit-display' onClick={removeProductDisplay} />
      </div>
    )
  }

  const renderRating = () => {
    return (
      <StarRatings
        rating={rating}
        starRatedColor='gold'
        numberOfStars={5}
        starDimension='15px'
        starSpacing='0px'
      />
    )
  }

  const showComparison = (show, main, related) => {
    setComparisonPopupState({
      open: show,
      mainProduct: main,
      relatedProduct: related
    });
  }

  const onProductDisplayClicked = (e) => {
    showComparison(true, mainProduct, product);
  }

  return (
    <div className='product-display' onClick={onProductDisplayClicked}>
      <img className='product-image' src={image} />
      <p>{productInfo.category}</p>
      <p>{productInfo.slogan}</p>
      <p>{`$${price}`}</p>
      {isOutfit ? renderCloseButton() : renderClickableStar()}
      {/* {renderClickableStar()} */}
      {renderRating()}
      {comparisonPopupState.open === true && (
        <ComparisonPopup state={comparisonPopupState} setComparisonState={setComparisonPopupState} />
      )}
    </div>
  )
}

export default ProductDisplay;