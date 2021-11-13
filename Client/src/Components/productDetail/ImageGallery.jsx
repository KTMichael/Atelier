import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class ImageGallery extends React.Component {

    renderImages() {
        if (this.props.photos) {
            return this.props.photos.map((x, index) => {
                return <div style={{cursor: 'zoom-in'}}  key={`Product Image at index: ${index}`}>
                         <img style={{height: 'auto', width: '80%'}} src={x.url} />
                       </div>
            })
        }
    }

    render() {
        return (
            <div id="imgGal" className="productDetailTier2">
                <h1 style={{color: 'transparent'}}>My Image Gallery</h1>
                    <Carousel onClickItem={(index, item) => this.props.renderExpandedView(index, item.props.children.props.src)} selectedItem={this.props.currentPhotoIndex} transitionTime="500">
                        {this.renderImages()}
                    </Carousel>
            </div>
        )
    }
}

export default ImageGallery;
