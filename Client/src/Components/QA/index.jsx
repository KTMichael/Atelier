import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionSearch from './QuestionSearch.jsx';
import QuestionList from './QuestionList.jsx';
import MoreQuestionsButton from './MoreQuestionsButton.jsx';
import AddQuestionButton from './AddQuestionButton.jsx';

function QA(props) {
  const [search, setSearchText] = useState('');
  const [questionArr, setQuestionArr] = useState([]);
  const [listCount, setListCount] = useState(2);


  useEffect(() => {
    axios.get(`/qa/questions/?product_id=${props.productId}`)
      .then((result) => { setQuestionArr(result.data) })
  }, [])

  return (
    <div id='QA'>
      <h1>Questions & Answers</h1>
      <QuestionSearch value={search} change={setSearchText} />
      <QuestionList questions={questionArr} />
      <MoreQuestionsButton />
      <AddQuestionButton />
    </div>
  )
}

export default QA;