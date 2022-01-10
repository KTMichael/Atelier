import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { AiOutlineSmallDash } from "react-icons/ai";

function ComparisonPopup({ state, setComparisonState }) {
  const [mainProduct, setMainProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const productAPI = "/products/";

  useEffect(() => {
    axios.get(`${productAPI}${state.mainProduct}`).then((results) => {
      setMainProduct(results.data);
    });

    axios.get(`${productAPI}${state.relatedProduct}`).then((results) => {
      setRelatedProduct(results.data);
    });
  }, []);

  const onPopupClicked = () => {
    setComparisonState(false);
  };

  const buildComparisonTable = (mainProduct, relatedProduct) => {
    var mainFeatures = [];
    mainProduct.features.forEach((feature) => {
      mainFeatures.push(feature.feature);
    });
    var relatedFeatures = [];
    relatedProduct.features.forEach((feature) => {
      relatedFeatures.push(feature.feature);
    });
    let allFeatures = mainFeatures.concat(relatedFeatures);
    allFeatures = [...new Set([...mainFeatures, ...relatedFeatures])];
    return (
      <table id="comparison-table">
        <tbody>
          <tr>
            <th style={{ fontSize: "1rem" }}>
              {mainProduct.name} <hr />
            </th>
            <th> Vs</th>
            <th style={{ fontSize: "1rem" }}>
              {relatedProduct.name} <hr />
            </th>
          </tr>
          {allFeatures.map((feature) => {
            return (
              <tr>
                <td>{getProductFeature(mainProduct, feature)}</td>
                <td>
                  {" "}
                  <AiOutlineSmallDash/> {feature} <AiOutlineSmallDash/> {" "}
                </td>
                <td>{getProductFeature(relatedProduct, feature)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const getProductFeature = (product, feature) => {
    var featureValue;
    var productFeature = product.features.filter((item) => {
      return item.feature === feature;
    });
    if (productFeature[0]) {
      if (productFeature[0].value) {
        featureValue = productFeature[0].value;
      } else {
        featureValue = <FaCheck />;
      }
    }
    return (featureValue = productFeature.length > 0 ? featureValue : "");
  };

  return (
    <>
      {state.open ? (
        <Popup
          className="QForm"
          open={true}
          closeOnDocumentClick
          onClose={onPopupClicked}
        >
          <div className="AForm" onClick={onPopupClicked}>
            <h1>Comparison</h1>
            {mainProduct &&
              relatedProduct &&
              buildComparisonTable(mainProduct, relatedProduct)}
          </div>
        </Popup>
      ) : null}
    </>
  );
}

export default ComparisonPopup;
