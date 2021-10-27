import React from 'react';
import ProductDetail from './ProductDetail.jsx';
import QuestionsAnswers from './QuestionsAnswers.jsx';
import Ratings from './Ratings.jsx';
import RelatedItems from './RelatedItems.jsx';

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