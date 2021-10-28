import React from 'react';
import QuestionSearch from './QA/QuestionSearch.jsx';
import QuestionList from './QA/QuestionList.jsx';
import MoreQuestionsButton from './QA/MoreQuestionsButton.jsx';
import AddQuestionButton from './QA/AddQuestionButton.jsx';

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
        <MoreQuestionsButton/>
        <AddQuestionButton/>
      </div>
    )
  }
}

export default QA;