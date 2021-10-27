import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import Ratings from './ratings/Ratings.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

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
        <RelatedItems />
      </div>
    )
  }
}

export default App;