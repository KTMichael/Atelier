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
  TwitterIcon
} from 'react-share';
import withCounter from './withCounter.jsx';
import Zoom from 'react-img-zoom';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.currentProduct.id,
      styleId: '',
      selectedStyle: {},
      product: {},
      styles: [],
      expandedView: false,
      currentPhoto: "",
      currentPhotoIndex: 0
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
            selectedStyle: selected,
            styleId: selected.style_id,
            currentPhoto: selected.photos[this.state.currentPhotoIndex].url
          }
        )
      });
  }

  handleChangeStyle(e) { // updates selected style when thumbnail is clicked
    var newStyle = this.state.styles[e.target.dataset.index]
    this.setState({
      selectedStyle: newStyle
    })
  }

  price() { // sets price to be displayed
    let onSale = !!this.state.selectedStyle.sale_price
    if (onSale) {
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

  renderExpandedView = (index, url) => {
    this.setState({
      expandedView: true,
      currentPhoto: url,
      currentPhotoIndex: index
    })
  }

  renderDefaultView = () => {
    this.setState({
      expandedView: false
    })
  }

  showClickLog = () => {
    console.log("Click Log:", this.props.clickLog)
  }

  changeCurrentPhoto = (url) => {
    this.setState({
      currentPhoto: url
    })
  }

  render() {
    const { clickLog, incrementCount } = this.props;
    return (
      <div onClick={incrementCount} id='ProductDetail'>

        {this.state.expandedView ?
          <div style={{ cursor: 'zoom-out' }} onClick={this.renderDefaultView}>
            <Zoom
              id="imgGal"
              img={this.state.currentPhoto}
              zoomScale={1.5}
              width={800}
              height={800} />
          </div> : <ImageGallery title={this.state.product.name} changeCurrentPhoto={this.changeCurrentPhoto} currentPhotoIndex={this.state.currentPhotoIndex} renderExpandedView={this.renderExpandedView} photos={this.state.selectedStyle.photos} />
        }

        <div id="product_info" className="productDetailTier2">
          <h6 className="product_category">{this.state.product.category}</h6>
          <h3 className="product_title">{this.state.product.name}</h3>
          {this.price()}
          <Rating />
          <p>{this.state.product.description}</p>
          <div className='socialMediaButtonContainer'>
            <FacebookShareButton
              url={window.location.href} >
              <FacebookIcon size={24} round={true} className='socialMediaButton' />
            </FacebookShareButton>
            <PinterestShareButton
              url={'https://www.geeksforgeeks.org/how-to-set-space-between-the-flexbox/'}
              media={this.state.currentPhoto}>
              <PinterestIcon size={24} round={true} className='socialMediaButton' />
            </PinterestShareButton>
            <TwitterShareButton
              url={window.location.href}>
              <TwitterIcon size={24} round={true} className='socialMediaButton' />
            </TwitterShareButton>
          </div>
          <Styles handleChangeStyle={this.handleChangeStyle} options={this.state.styles} selectedStyle={this.state.selectedStyle} />
          <AddToCart skus={this.state.selectedStyle.skus} />
          {/* <button onClick={this.showClickLog} >Dev Button to Show Click Log</button> */}
        </div>
      </div>
    )
  }
}

export default withCounter(ProductDetail);