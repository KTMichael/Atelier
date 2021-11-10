import React from 'react';
import ImageGallery from './ImageGallery.jsx'
import axios from 'axios';
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
    console.log('this.props', this.props)
    return axios({
      method: "get",
      url: `/products/${this.state.productId}`,
    });
  }

  getStyles() { // fetches all styles for currently selected product
    return axios({
      method: "get",
      url: `/products/${this.state.productId}/styles`,
    });
  }

  componentDidMount() { // updates state with available styles and initializes to default style
    console.log('componentDidMount is running!')
    Promise.all([this.getProduct(), this.getStyles()])
    .then(response => {
      let selected = {};
      for (let i = 0; i < response[1].data.length; i++) {
        if (response[1].data[i]['default?']) {
          selected = response[1].data[i];
          break;
        }
      }

      this.setState(
        {
          product: response[0].data,
          styles: response[1].data,
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

  price () { // sets price to be displayed
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
          <AddToCart skus={this.state.selectedStyle.skus} />
        </div>
      </div>
    )
  }
}

export default ProductDetail;