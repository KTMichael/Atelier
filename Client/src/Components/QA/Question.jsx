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
    this.handleSeeMoreAnswers = this.handleSeeMoreAnswers.bind(this);
  }

  sortAnswers(firstAns, secondAns) {
    if (firstAns.answerer_name === 'Seller' && secondAns.answerer_name !== 'Seller') { return -1; }
    if (secondAns.answerer_name === 'Seller' && firstAns.answerer_name !== 'Seller') { return 1; }
    return secondAns.helpfulness - firstAns.helpfulness;
  }

  handleSeeMoreAnswers() {
    if (this.state.answerListMax <= 2) {
      this.setState({ answerListMax: this.state.answers.length })
    } else {
      this.setState({ answerListMax: 2 })
    }
  }

  renderSeeMoreAnswers() {
    if (this.state.answers.length > 2) {
      if (this.state.answerListMax <= 2) {
        return <p onClick={this.handleSeeMoreAnswers}>See more answers</p>
      } else {
        return <p onClick={this.handleSeeMoreAnswers}>Collapse answers</p>
      }
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