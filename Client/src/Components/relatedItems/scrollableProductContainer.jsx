import React, { useEffect, useState, useContext } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ProductDisplay from './productDisplay.jsx';
import { testContext } from './context.js';

//Container for Arrow keys and product diplay
function scrollableProductContainer() {
  const { relatedProducts, outfits } = useContext(testContext);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(relatedProducts.length)

  useEffect(() => {
      setLength(relatedProducts.length)
  }, [relatedProducts])

  const next = () => {
    if (currentIndex < (length - 1)) {
        setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
      if (currentIndex > 0) {
          setCurrentIndex(prevState => prevState - 1)
      }
  }

  return (
    <div className='scrolling-product-container'>
      <div className='scrolling-wrapper'>
      {
        currentIndex > 0 &&
        <button className="left-arrow" onClick={prev}>
          &lt;
        </button>
      }
      <div className='scrolling-content-wrapper'>
        <div className='scrolling-product-content' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {relatedProducts.map(product => {
            return (
              <testContext.Provider value={{product}}>
                <ProductDisplay />
              </testContext.Provider>
            )
          })}
        </div>
      </div>
        {
          currentIndex < (length - 3) &&
          <button className="right-arrow" onClick={next}>
            &gt;
          </button>
        }
      </div>
    </div>
  )
}

export default scrollableProductContainer;

