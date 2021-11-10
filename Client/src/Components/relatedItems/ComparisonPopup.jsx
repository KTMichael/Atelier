import React, { useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

function ComparisonPopup({state, setComparisonState}) {
  const [ mainProduct, setMainProduct ] = useState(null);
  const [ relatedProduct, setRelatedProduct ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const productAPI = "/products/";

  useEffect( () => {
    axios.get(`${productAPI}${state.mainProduct}`)
      .then( results => {
        setMainProduct(results.data);
      })

    axios.get(`${productAPI}${state.relatedProduct}`)
    .then( results => {
      setRelatedProduct(results.data);
    })
  }, [])

  const onPopupClicked = () => {
    setComparisonState(false);
  }

  const buildComparisonTable = (mainProduct, relatedProduct) => {
    var mainFeatures = [];
    mainProduct.features.forEach(feature => {
      mainFeatures.push(feature.feature);
    })
    var relatedFeatures = [];
    relatedProduct.features.forEach(feature => {
      relatedFeatures.push(feature.feature);
    })
    let allFeatures = mainFeatures.concat(relatedFeatures);
    allFeatures = [...new Set([...mainFeatures, ...relatedFeatures])];
    return (
      <table id='comparison-table'>
        <tbody>
          <tr>
            <th>{mainProduct.name}</th>
            <th></th>
            <th>{relatedProduct.name}</th>
          </tr>
          {allFeatures.map(feature => {
            return <tr>
              <td>{getProductFeature(mainProduct, feature)}</td>
              <td>{feature}</td>
              <td>{getProductFeature(relatedProduct, feature)}</td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }

  const getProductFeature = (product, feature) => {
    var featureValue;
    var productFeature = product.features.filter( item => {
      return item.feature === feature;
    });
    if ( productFeature[0] ) {
      if ( productFeature[0].value ) {
        featureValue = productFeature[0].value;
      } else {
        featureValue = <FaCheck/>;
      }
    }
    return (featureValue = productFeature.length > 0 ? featureValue : '');
  }

  return (
    <>
    {state.open ? (
      <Popup open={true} closeOnDocumentClick onClose={onPopupClicked}>
        <div id='comparison-popup' onClick={onPopupClicked}>
          <span>Comparison</span>
          { mainProduct && relatedProduct &&
            buildComparisonTable(mainProduct, relatedProduct)
          }
        </div>
      </Popup>
    ) : null}
    </>
  );
}

export default ComparisonPopup;