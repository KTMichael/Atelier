import React from 'react';
import axios from 'axios';
import path from 'path';
import { TOKEN } from '../../../../config.js'

// Client/src/Components/productDetail/ImageGallery.jsx

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idOfCurrentlySelectedStyle: 1,
      images: ''
    }
  }

  // Get images

  // getImagesForCurrentlySelectedStyle () {
  //   axios({
  //     method: "get",
  //     url: `https://app-hrsei-api.herokuapp.com/api/fec2/HR-LAX47/products/${this.state.idOfCurrentlySelectedStyle}/styles/`,
  //     headers: {
  //         Authorization: `Bearer ${githubToken}`,
  //         "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => {
  //       this.setState({
  //         images: res;
  //       })
  //     })
  //     .catch(err => {
  //         callback(err);
  //     });
  // }

  render() {
    return (
      <div id="image_gallery">
        <img></img>
      </div>
    )
  }
}

export default ImageGallery;