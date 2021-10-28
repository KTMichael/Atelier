import React from 'react';
import QuestionSearch from './QA/QuestionSearch.jsx'
import QuestionList from './QA/QuestionList.jsx'

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
        <QuestionList/>
      </div>
    )
  }
}

export default QA;