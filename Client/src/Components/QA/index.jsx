import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import AddQuestionButton from './AddQuestionButton.jsx';

function QA(props) {
  const [questionArr, setQuestionArr] = useState([]);

  let comparitor = (a, b) => { return b.question_helpfulness - a.question_helpfulness };

  useEffect(() => {
    console.log('using effect');
    axios.get(`/qa/questions/?product_id=${props.productId}`)
      .then((result) => { setQuestionArr(result.data.sort(comparitor)); });
  }, [])

  return (
    <>
      <div id="ComponentTitle">
        <h1>Questions & Answers</h1>
      </div>
      <div id='QA'>
        {questionArr.length > 0 && <QuestionList questions={questionArr} />}
        <AddQuestionButton />
      </div>
    </>
  )
}

export default QA;