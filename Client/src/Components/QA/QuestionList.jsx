import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';

function QuestionList({ questions }) {
  const [listCount, setListCount] = useState(2);
  const [search, setSearchText] = useState('');

  let renderCount = 0;

  function renderListCount(arr, count, callback) {
    let result = [];
    for (let i = 0; i < count && i < arr.length; i++) {
      result.push(callback(arr[i], i));
    }
    return result;
  }

  function filterList(arr, searchText) {
    if (searchText === '') {
      renderCount = arr.length;
      return arr;
    }

    let searchWordsArr = searchText.split(' ');
    let filteredQuestions = arr.filter((question) => {
      return searchWordsArr.every(
        (word) => { return question.question_body.includes(word) }
      );
    });

    renderCount = filteredQuestions.length;
    return filteredQuestions;
  }

  function handleMoreQuestions() {
    setListCount(listCount + 2);
  }

  return (
    <>
      {console.log('QuestionList', 'listCount:', listCount, 'questions:', questions)}
      <input type='text' id='questionSearch' value={search} onChange={(e) => setSearchText(e.target.value)}/>

      <div id='questionList'>
        {renderListCount(
          filterList(questions, search),
          listCount,
          (question, index) => <Question key={`question ${index}`} data={question} />
        )}
      </div>

      {listCount < renderCount && <button className="btn" onClick={handleMoreQuestions}>More Questions</button>}
    </>
  )
}

export default QuestionList;