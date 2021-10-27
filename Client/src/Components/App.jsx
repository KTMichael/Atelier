import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
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
        Test
        <ProductDetail />
        <QuestionsAnswers />
        <Ratings />
        <MainRelatedFeature />
      </div>
    )
  }
}

export default App;