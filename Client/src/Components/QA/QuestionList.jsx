import React, { useState } from 'react';
import Question from './Question.jsx';
import MoreQuestionsButton from './MoreQuestionsButton.jsx';

function QuestionList(props) {
  const [listCount, setListCount] = useState(4);

  return (
    <>
      <div id='questionList'>
        {this.props.questions.map((question, index) => <Question key={`question ${index}`} data={question} />)}
      </div>

      <MoreQuestionsButton />
    </>
  )
}

export default QuestionList;