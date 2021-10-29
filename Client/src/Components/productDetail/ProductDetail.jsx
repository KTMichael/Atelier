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
    this.initializeDefaultStyle = this.initializeDefaultStyle.bind(this);
  }

  getProduct () { // updates state with product info
    axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.state.productId}/`,
      headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({
          product: res.data
        })
        console.log('product-->', this.state.product)
      })
      .catch(err => {
          console.log(err);
      });
  }

  getStyles () { // updates state with all styles for currently selected product
    axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.state.productId}/styles/`,
      headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({
          styles: res.data.results
        })
        console.log('styles --->', this.state.styles)
      })
      .then( () => {
        this.initializeDefaultStyle();
      })
      .catch(err => {
          console.log(err);
      });
  }

  initializeDefaultStyle () { // adds default style to state
    this.state.styles.forEach( element => {
      if (element['default?'] === true) {
        this.setState({
          selectedStyle: element
        })
      }
    })
  }

  componentDidMount() {
    this.getProduct();
    this.getStyles();
  }

  render() {
    return (
      <div id='ProductDetail'>
        <ImageGallery />
        <div id="product_info">
          <h6 className="product_category">{this.state.product.category}</h6>
          <h3 className="product_title">{this.state.product.name}</h3>
          <h4 className="price">{this.state.selectedStyle.sale_price}</h4>
          <p>{this.state.product.description}</p>
          <Styles options={this.state.styles}/>
          <AddToCart />
        </div>
      </div>
    )
  }
}

export default ProductDetail;