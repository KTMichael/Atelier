import React, { useState, useContext } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ProductDisplay from './productDisplay.jsx';
import { testContext } from './context.js';

//Container for Arrow keys and product diplay
function scrollableProductContainer() {
  const { relatedProducts, outfits } = useContext(testContext);

  const nextSlide = () => {
  }

  const prevSlide = () => {
  }


  return (
    <div className='scrolling-product-container'>
      {/* <FaChevronLeft id='left-button' onClick={prevSlide}/>
      <FaChevronRight id='right-button' onClick={nextSlide}/> */}
      {relatedProducts.map( (product, index) =>{
        return (
          <testContext.Provider value={{product}}>
            <ProductDisplay />
          </testContext.Provider>
        )
      })}
      {relatedProducts.map( (product, index) =>{
        return (
          <testContext.Provider value={{product}}>
            <ProductDisplay />
          </testContext.Provider>
        )
      })}
      {relatedProducts.map( (product, index) =>{
        return (
          <testContext.Provider value={{product}}>
            <ProductDisplay />
          </testContext.Provider>
        )
      })}
    </div>
  )
}

export default scrollableProductContainer;

