import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {TOKEN} from '../../../../config.js';
import ScrollableProductContainer from './scrollableProductContainer.jsx';
import { testContext } from './context.js';

function MainRelatedFeature() {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const productAPI = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/";


  useEffect( () => {
    axios.get(productAPI, { headers: { Authorization: `${TOKEN}`}})
      .then( results => {
        let sampleProductId = results.data[0].id;
        axios.get(`${productAPI}${sampleProductId}/related`, { headers: { Authorization: `${TOKEN}`}})
          .then( results => {
            setRelatedProducts(results.data);
          })
      });
  }, [product]);

  return (
    <div id='RelatedFeature'>
      <h1>Related Products</h1>
      <div>
        <testContext.Provider value={{relatedProducts, outfits}}>
          <ScrollableProductContainer  />
        </testContext.Provider>
      </div>
      <h1>Your Outfit</h1>
      <div>
        <testContext.Provider value={{relatedProducts, outfits}}>
          <ScrollableProductContainer  />
        </testContext.Provider>
      </div>
    </div>
  );
}


export default MainRelatedFeature;

// componentDidMount() {
  //   console.log('mounted');
  //   console.log(token);
  //   axios({
  //     method: "get",
  //     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/`,
  //     headers: {
  //         Authorization: `${token.TOKEN}`
  //     }
  //   })
  //   .then( results => {
  //     console.log(results.data);
  //   })
  // }