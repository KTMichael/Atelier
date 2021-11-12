import React from 'react';
import StarRatings from 'react-star-ratings'; // https://www.npmjs.com/package/react-star-ratings

class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 3.5
    }
    // this.changeRating = this.changeRating.bind(this);
  }

  // changeRating( newRating, name ) { // Probably need to remove this functionality. User shouldn't be able to change rating here.
  //   this.setState({
  //     rating: newRating
  //   });
  // }

  render() {
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="gold"
        // changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="5px"
        style={{
          color: 'black',

        }}
      />
    );
  }
}

export default Rating;