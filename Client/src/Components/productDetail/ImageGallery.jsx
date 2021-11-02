// src/reusable/image-gallery.component.js
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class ImageGallery extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            photos: []
        }

        this.renderImages = this.renderImages.bind(this);
    }

    renderImages() {
        if (this.props.photos) {
            console.log('RenderImages:', this.props.photos);
            return this.props.photos.map((x, index) => {
                return <div key={`Product Image at index: ${index}`}>
                    <img src={x.url}/>
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







// import React from 'react';

// class ImageGallery extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {

//       photoIndex: 0
//     }
//   }

//   render() {
//     return (
//       <div id="image_gallery">
//         <img src={""}></img>
//       </div>
//     )
//   }
// }

// export default ImageGallery;