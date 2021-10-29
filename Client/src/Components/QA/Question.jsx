import React from 'react';
import Answer from './Answer.jsx'

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: Object.values(this.props.data.answers).sort(this.sortAnswers),
      answerListMax: 2
    }

    this.renderSeeMoreAnswers = this.renderSeeMoreAnswers.bind(this);
  }

  sortAnswers(firstAns, secondAns) {
    if (firstAns.answerer_name === 'Seller' && secondAns.answerer_name !== 'Seller') { return -1; }
    if (secondAns.answerer_name === 'Seller' && firstAns.answerer_name !== 'Seller') { return 1; }
    return secondAns.helpfulness - firstAns.helpfulness;
  }

  renderSeeMoreAnswers() {
    if (this.state.answers.length > 2 && this.state.answerListMax === 2) {
      return <p onClick={() => this.setState({ answerListMax: this.state.answers.length })}>See more answers</p>
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
        {this.renderSeeMoreAnswers()}
      </>
    )
  }
}

export default Question;