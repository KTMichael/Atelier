import React, { useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import { TOKEN } from '../../../../config.js';
import axios from 'axios';

function ComparisonPopup({state, setComparisonState}) {
  const [ mainProduct, setMainProduct ] = useState(null);
  const [ relatedProduct, setRelatedProduct ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const productAPI = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/";

  // async function getData() {
  //   await axios.get(`${productAPI}${state.mainProduct}`, { headers: { Authorization: `${TOKEN}`}})
  //     .then( results => {
  //       setMainProduct(results.data);
  //     })
  // }
  // getData();
  // useEffect( () => {
  //   console.log('run when click');
  //   // axios.get(`${productAPI}${state.mainProduct}`, { headers: { Authorization: `${TOKEN}`}})
  //   //   .then( results => {
  //   //     setMainProduct(results.data);
  //   //   })

  //   // axios.get(`${productAPI}${state.relatedProduct}`, { headers: { Authorization: `${TOKEN}`}})
  //   // .then( results => {
  //   //   setRelatedProduct(results.data);
  //   // })
  // }, [])

  const onPopupClicked = () => {
    setComparisonState(false);
  }

  const buildComparisonTable = () => {
    // console.log(mainProduct.name);
    // console.log(relatedProduct.name);
    // var mainProduct = mainProduct.name;
    // var relatedProduct = relatedProduct.name;
    // var mainFeatures = [];
    // mainProduct.features.forEach(feature => {
    //   mainFeatures.push(feature.feature);
    // })
    // var relatedFeatures = [];
    // relatedProduct.features.forEach(feature => {
    //   relatedFeatures.push(feature.feature);
    // })
    // let allFeatures = mainFeatures.concat(relatedFeatures);
    // allFeatures = [...new Set([...mainFeatures, ...relatedFeatures])];
    // console.log(allFeatures);
    return <div></div>;
  }

  return (
    <>
    {console.log(mainProduct)}
    {state.open ? (
      <Popup open={true} closeOnDocumentClick onClose={onPopupClicked}>
        <div id='comparison-popup' onClick={onPopupClicked}>{buildComparisonTable()}</div>
      </Popup>
    ) : null}
    </>
  );
}

export default ComparisonPopup;