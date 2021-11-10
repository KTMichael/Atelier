import React, { useEffect, useState, useContext } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ProductDisplay from './productDisplay.jsx';
import AddProductToOutfits from './AddProductToOutfits.jsx';
import { testContext } from './context.js';
import _ from 'lodash';

//Container for Arrow keys and product diplay
function scrollableProductContainer() {
  const { mainProduct, relatedProducts, outfits } = useContext(testContext);
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const [ items, setItems ] = useState([]);
  const [ productsToDisplay, setProductsToDisplay ] = useState([]);
  const [ length, setLength ] = useState(0);
  const [ isOutfit, setIsOutfit ] = useState(false);

  useEffect(() => {
    if ( relatedProducts ) {
      setProductsToDisplay(relatedProducts);
    } else {
      setProductsToDisplay(items);
      setIsOutfit(true);
    }
    setLength(productsToDisplay.length)
  }, [items])

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

  const addItemToOutfit = (item) => {
    if ( _.includes(productsToDisplay, item) ) {
      alert ('Product already in outfits');
      return;
    }
    var currentOutfits = [];
    productsToDisplay.forEach(product => {
      currentOutfits.push(productsToDisplay);
    });
    currentOutfits.push(item);
    setItems(currentOutfits);
  }

  const removeItem = (item) => {
    var outfits = _.remove(productsToDisplay, product => {
      return product !== item;
    })
    setProductsToDisplay(outfits);
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
            {relatedProducts === undefined &&
              <AddProductToOutfits addItem={addItemToOutfit} product={mainProduct} />
            }
            {productsToDisplay.map((product, index) => {
              return (
                <testContext.Provider value={{ mainProduct, product, isOutfit, removeItem}} key={index}>
                  <ProductDisplay />
                </testContext.Provider>
              )
            })}
          </div>
        </div>
        {
          currentIndex < (length - 1) &&
          <button className="right-arrow" onClick={next}>
            &gt;
          </button>
        }
      </div>
    </div>
  )
}

export default scrollableProductContainer;

