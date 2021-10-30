import React from 'react';
import ScrollableProductContainer from './scrollableProductContainer.jsx';

class MainRelatedFeature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedProducts: [],
      outfits: []
    }
  }

  //componentDidMount() {
  //get related products
  //get outfits
  // }

  getRelatedProducts() {
    // get main producst
    // request server for related products to main product
    //setState related products = relatedProducts;
  }

  getOutfits() {
    //get request to server get all outfits
    //setState outfits = outfits;
  };

  render() {
    return (
      <div id='RelatedFeature'>
        <div>
          <h1> Related Features </h1>
          <ScrollableProductContainer products={this.state.relatedProducts} />
        </div>
        <div>
          <ScrollableProductContainer products={this.state.outfits} />
        </div>
      </div>
    );
  };
}

export default MainRelatedFeature;