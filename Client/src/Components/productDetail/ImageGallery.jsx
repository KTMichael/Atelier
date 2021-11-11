// src/reusable/image-gallery.component.js
import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class ImageGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: []
        }

        this.renderImages = this.renderImages.bind(this);
    }

    renderImages() {
        if (this.props.photos) {
            return this.props.photos.map((x, index) => {
                return <div key={`Product Image at index: ${index}`}>
                    <img src={x.url} />
                </div>
            })
        }
    }

    render() {
        return (
            <div id="imgGal">
                <h1>My Image Gallery</h1>
                <Carousel transitionTime="500">
                    {this.renderImages()}
                </Carousel>
            </div>
        )
    };
}

export default ImageGallery;


// keep track of photo index and make default when new style is chosen
// hovering over image should turn mouse into magnifying glass
//   and a click should go to expanded view

// expanded view should span the entire screen
// will have icons to toggle between images, but NO thumbnails
// a click on expanded view will zoom 2.5x
// mouse should be a + symbol when hovering over image
// once clicked and zoomed, mouse should change to - symbol
// user should be able to pan across entirety of photo showing zoomed in version as the cursor is moved