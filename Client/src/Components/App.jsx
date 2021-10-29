import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QA from './QA.jsx';
import RatingsandReviews from './ratings/RatingsandReviews.jsx';
import MainRelatedFeature from './relatedItems/mainRelatedFeature.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <ProductDetail />
        <QA />
        <RatingsandReviews />
        <MainRelatedFeature />
      </div>
    )
  }
}

export default App;