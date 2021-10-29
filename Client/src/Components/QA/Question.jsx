import React from 'react';
import Answer from './Answer.jsx'

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let answers = this.props.data.answers
    let answerKeys = Object.keys(answers);
    return (
      <>
        <p className='question'>Q: {this.props.data.question_body}</p>
        <ul className='answerList'>
          {answerKeys.map(key => <Answer key={key} data={answers[key]}/>)}
        </ul>
      </>
    )
  }
}

export default Question;