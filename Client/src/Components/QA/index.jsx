import React from 'react';
import QuestionSearch from './QuestionSearch.jsx';
import QuestionList from './QuestionList.jsx';
import MoreQuestionsButton from './MoreQuestionsButton.jsx';
import AddQuestionButton from './AddQuestionButton.jsx';

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