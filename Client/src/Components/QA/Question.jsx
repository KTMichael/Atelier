import React from 'react';
import Answer from './Answer.jsx'

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: Object.values(this.props.data.answers).sort((firstAns, secondAns) => {return secondAns.helpfulness - firstAns.helpfulness})
    }
  }

  render() {
    return (
      <>
        <p className='question'>Q: {this.props.data.question_body}</p>
        <ul className='answerList'>
          {this.state.answers.map(answer => <Answer key={`Answer ${answer.id}`} data={answer}/>)}
        </ul>
      </>
    )
  }
}

export default Question;