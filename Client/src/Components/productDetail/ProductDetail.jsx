import React from 'react';
import ImageGallery from './ImageGallery.jsx'
import axios from 'axios';
import { TOKEN } from '../../../../config.js';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx';
import Rating from './Rating.jsx';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 42366, // REMOVE HARD-CODE
      styleId: 253620, // REMOVE HARD-CODE
      selectedStyle: {},
      product: {},
      styles: [],
    }
    this.getProduct = this.getProduct.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
  }

  getProduct() { // fetches product info
    return axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.state.productId}/`,
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json"
      }
    });
  }

  getStyles() { // fetches all styles for currently selected product
    return axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.state.productId}/styles/`,
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json"
      }
    });
  }

  componentDidMount() { // updates state with available styles and initializes to default style
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

  handleChangeStyle (e) { // updates selected style when thumbnail is clicked
    var newStyle = this.state.styles[e.target.dataset.index]
    this.setState({
      selectedStyle: newStyle
    })
  }

  price () {
    let onSale = !!this.state.selectedStyle.sale_price
    if(onSale) {
      return (
        <div className="overview_price">
          <span id="on_sale">${this.state.selectedStyle.original_price} </span>
          <span>${this.state.selectedStyle.sale_price}</span>
        </div>
      )
    } else {
      return (
        <div className="overview_price">${this.state.selectedStyle.original_price}</div>
      )
    }
  }

  render() {
    return (
      <div id='ProductDetail'>
        <ImageGallery photos={this.state.selectedStyle.photos} />
        <div id="product_info">
          <h6 className="product_category">{this.state.product.category}</h6>
          <h3 className="product_title">{this.state.product.name}</h3>
          {this.price()}
          <Rating />
          <p>{this.state.product.description}</p>
          <div>Share on Social Media</div>
          <Styles handleChangeStyle={this.handleChangeStyle} options={this.state.styles} selectedStyle={this.state.selectedStyle} />
          <AddToCart selectedStyle={this.state.selectedStyle} />
        </div>
      </div>
    )
  }
}

export default ProductDetail;