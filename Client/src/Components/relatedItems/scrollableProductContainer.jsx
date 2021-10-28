import React from 'react';

//Container for Arrow keys and product diplay
class ScrollableProductContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div class='scrolling-product-container'>
        {/* based off number this.state.products.length */}
        <div class='productDisplay'></div>
        <div class='productDisplay'></div>
      </div>
    )
  }
}

export default ScrollableProductContainer;

