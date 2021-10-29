import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      photoIndex: 0
    }
  }

  render() {
    return (
      <div id="image_gallery">
        <img src={""}></img>
      </div>
    )
  }
}

export default ImageGallery;