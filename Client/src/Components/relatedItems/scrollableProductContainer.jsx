import React, { useContext } from 'react';
import { testContext } from './context.js';

//Container for Arrow keys and product diplay
function scrollableProductContainer() {
  const { relatedProduct, outfits } = useContext(testContext);


  return (
    <div className='scrolling-product-container'>
      <button id='left-scroll' type='button'>Left Scroll</button>
      <div className='productDisplay'></div>
      <div className='productDisplay'></div>
    </div>
  )
}

export default scrollableProductContainer;

