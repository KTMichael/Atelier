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
      <div className='scrolling-product-container'>
        {/* based off number this.state.products.length */}
        <div className='productDisplay'></div>
        <div className='productDisplay'></div>
      </div>
    )
  }
}

export default ScrollableProductContainer;

