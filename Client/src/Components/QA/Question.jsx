import React from 'react';
import Answer from './Answer.jsx'

const sortAnswers = (firstAns, secondAns) => {
  if (firstAns.answerer_name === 'Seller' && secondAns.answerer_name !== 'Seller') {
    return -1;
  }

  if (secondAns.answerer_name === 'Seller' && firstAns.answerer_name !== 'Seller') {
    return 1;
  }

  return secondAns.helpfulness - firstAns.helpfulness;
}

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: Object.values(this.props.data.answers).sort(sortAnswers),
      answerListMax: 2
    }
  }

  render() {
    let renderAnswers = this.state.answers.slice(0, this.state.answerListMax)
    return (
      <>
        <p className='question'>Q: {this.props.data.question_body}</p>
        <ul className='answerList'>
          {
            renderAnswers.map(answer => <Answer key={`Answer ${answer.id}`} data={answer} />)
          }
        </ul>
      </>
    )
  }
}

export default Question;