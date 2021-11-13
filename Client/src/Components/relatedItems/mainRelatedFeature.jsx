import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from '../../../../config.js';
import ScrollableProductContainer from './scrollableProductContainer.jsx';
import { testContext } from './context.js';

function MainRelatedFeature() {
  const [mainProduct, setMainProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const productAPI = "/products/";


  useEffect(() => {
    axios.get(`${productAPI}`)
      .then(results => {
        setMainProduct(results.data[0].id)
        let sampleProductId = results.data[0].id;
        axios.get(`${productAPI}${sampleProductId}/related`, { params: { id: sampleProductId } })
          .then(results => {
            setRelatedProducts(results.data);
          })
      });
  }, []);

  return (
    <div>
      <div id="ComponentTitle">
        <h1>Related Products</h1>
      </div>
      <div id='RelatedFeature'>
        <div>
          {relatedProducts.length > 0 &&
            <testContext.Provider value={{ mainProduct, relatedProducts }}>
              <ScrollableProductContainer />
            </testContext.Provider>
          }
        </div>
        <h1>Your Outfit</h1>
        <div>
          <testContext.Provider value={{ mainProduct, outfits }}>
            <ScrollableProductContainer />
          </testContext.Provider>
        </div>
      </div>
    </div>
  );
}


export default MainRelatedFeature;