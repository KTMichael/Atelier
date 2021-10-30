import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QA from './QA/index.jsx';
import Ratings from './ratings/Ratings.jsx';
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
        <Ratings />
        <MainRelatedFeature />
      </div>
    )
  }
}

export default App;