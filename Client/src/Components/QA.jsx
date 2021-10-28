import React from 'react';
import QuestionSearch from './QA/QuestionSearch.jsx'

class QA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div id='QA'>
        <QuestionSearch/>
      </div>
    )
  }
}

export default QA;