import React, { useContext } from 'react';
import ProductDisplay from './productDisplay.jsx';
import { testContext } from './context.js';

//Container for Arrow keys and product diplay
function scrollableProductContainer() {
  const { relatedProducts, outfits } = useContext(testContext);


  return (
    <div className='scrolling-product-container'>
      <button id='left-scroll' type='button'>Left Scroll</button>
      {relatedProducts.map(product => {
        return <ProductDisplay />
      })}
    </div>
  )
}

export default scrollableProductContainer;

