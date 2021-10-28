import React from 'react';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div id="image_gallery">Image Gallery</div>
        <div id="product_info">
          <div className="sub_component">Product Descriptions</div>
          <div className="sub_component">Style Selector</div>
          <div className="sub_component">Add to Cart</div>
        </div>
      </div>
    )
  }
}

export default ProductDetail;