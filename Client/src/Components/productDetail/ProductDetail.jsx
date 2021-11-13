import React from 'react';
import ImageGallery from './ImageGallery.jsx'
import axios from 'axios';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx';
import Rating from './Rating.jsx';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon } from 'react-share';
import withCounter from './withCounter.jsx';
import Zoom from 'react-img-zoom';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 42366, // REMOVE HARD-CODE
      styleId: 253620, // REMOVE HARD-CODE
      selectedStyle: {},
      product: {},
      styles: [],
      expandedView: false
    }
    this.getProduct = this.getProduct.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
  }

  getProduct() { // fetches product info
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

  renderExpandedView = () => {
    this.setState({
      expandedView: true
    })
  }

  renderDefaultView = () => {
    this.setState({
      expandedView: false
    })
  }

  render() {
    const { clickLog, incrementCount } = this.props;
    return (
      <div onClick={incrementCount} id='ProductDetail'>

        {this.state.expandedView ?
            <div onClick={this.renderDefaultView}>
              <Zoom
                id="imgGal"
                img="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                zoomScale={1.5}
                width={800}
                height={800} />
            </div> : <ImageGallery renderExpandedView={this.renderExpandedView} photos={this.state.selectedStyle.photos} />
        }

        <div id="product_info" className="productDetailTier2">
          <h6 className="product_category">{this.state.product.category}</h6>
          <h3 className="product_title">{this.state.product.name}</h3>
          {this.price()}
          <Rating />
          <p>{this.state.product.description}</p>
          <div className='socialMediaButtonContainer'>
            <FacebookShareButton
              url={'https://www.geeksforgeeks.org/how-to-set-space-between-the-flexbox/'}>
              {/* TODO: change to window.location.href to use in EC2 instance */}
              <FacebookIcon size={32} round={true} className='socialMediaButton'/>
            </FacebookShareButton>
            <PinterestShareButton
              url={'https://www.geeksforgeeks.org/how-to-set-space-between-the-flexbox/'}
              media={'https://pixabay.com/photos/tree-sunset-clouds-sky-silhouette-736885/'}>
                {/* TODO: remove hard-coded image */}
              <PinterestIcon size={32} round={true} className='socialMediaButton'/>
            </PinterestShareButton>
            <TwitterShareButton
              url={'https://www.geeksforgeeks.org/how-to-set-space-between-the-flexbox/'}>
              <TwitterIcon size={32} round={true} className='socialMediaButton'/>
            </TwitterShareButton>
          </div>
          <Styles handleChangeStyle={this.handleChangeStyle} options={this.state.styles} selectedStyle={this.state.selectedStyle} />
          <AddToCart skus={this.state.selectedStyle.skus} />
        </div>
      </div>
    )
  }
}

export default withCounter(ProductDetail);