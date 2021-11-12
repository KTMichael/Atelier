import React, { useState } from 'react';
import QuestionSearch from './QuestionSearch.jsx';
import QuestionList from './QuestionList.jsx';
import MoreQuestionsButton from './MoreQuestionsButton.jsx';
import AddQuestionButton from './AddQuestionButton.jsx';

function QA(props) {
  const [search, setSearchText] = useState('');
  const [questionArr, setQuestionArr] = useState([]);
  const [listCount, setListCount] = useState(2);

  axios.get(window.location.protocol + '//' + window.location.host + `/qa/questions/?product_id=${this.props.productId}`)
    .then((result) => { this.setState({questions: result.data})})

  return (
    <div id='QA'>
      <h1>Questions & Answers</h1>
      <QuestionSearch value={search} change={setSearchText}/>
      <QuestionList questions={questionArr} />
      <MoreQuestionsButton/>
      <AddQuestionButton />
    </div>
  )
}

export default QA;