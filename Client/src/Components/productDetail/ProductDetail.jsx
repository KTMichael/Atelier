import React from 'react';
import ImageGallery from './ImageGallery.jsx'
import axios from 'axios';
import { TOKEN } from '../../../../config.js';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 42366, // REMOVE HARD-CODE
      styleId: 253620, // REMOVE HARD-CODE
      selectedStyle: {},
      product: {},
      styles: []
    }
    this.getProduct = this.getProduct.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  getProduct() { // updates state with product info
    return axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.state.productId}/`,
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json"
      }
    });
  }

  getStyles() { // updates state with all styles for currently selected product
    return axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.state.productId}/styles/`,
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json"
      }
    });
  }

  componentDidMount() {
    Promise.all([this.getProduct(), this.getStyles()])
    .then(result => {
      let selected = {};
      for (let i = 0; i < result[1].data.results.length; i++) {
        if (result[1].data.results[i]['default?']) {
          selected = result[1].data.results[i];
          break;
        }
      }

      this.setState(
        {
          product: result[0].data,
          styles: result[1].data.results,
          selectedStyle: selected
        }
      )
    });
  }

  render() {
    return (
      <div id='ProductDetail'>
        <ImageGallery photos={this.state.selectedStyle.photos} />
        <div id="product_info">
          <h6 className="product_category">{this.state.product.category}</h6>
          <h3 className="product_title">{this.state.product.name}</h3>
          <h4 className="price">{this.state.selectedStyle.sale_price}</h4>
          <p>{this.state.product.description}</p>
          <Styles options={this.state.styles} />
          <AddToCart />
        </div>
      </div>
    )
  }
}

export default ProductDetail;