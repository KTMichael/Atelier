import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div id='questionList'>
      {this.props.questions.map((question, index) => <Question key = {`question ${index}`} data={question} />)}
    </div>
    )
  }
}

export default QuestionList;