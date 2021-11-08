import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import AddAnswer from './AddAnswer.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: Object.values(this.props.data.answers).sort(this.sortAnswers),
      answerListMax: 2,
      helpfulness: this.props.data.question_helpfulness,
      markedHelpful: false,
      reportText: 'Report',
      markedReport: false
    }

    this.handleQuestionHelpful = this.handleQuestionHelpful.bind(this);
    this.handleQuestionReport = this.handleQuestionReport.bind(this);
    this.renderSeeMoreAnswers = this.renderSeeMoreAnswers.bind(this);
    this.handleSeeMoreAnswers = this.handleSeeMoreAnswers.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
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

  handleQuestionHelpful() {
    if (!this.state.markedHelpful) {
      axios.put(window.location.protocol + '//' + window.location.host + `/qa/questions/${this.props.data.question_id}/helpful`)
        .then(() => { console.log('was marked helpful'); this.setState({ helpfulness: this.state.helpfulness + 1, markedHelpful: true }) });
    }
  }

  handleQuestionReport() {
    if (!this.state.markedReport) {
      axios.put(window.location.protocol + '//' + window.location.host + `/qa/answers/${this.props.data.question_id}/report`)
        .then(() => {
          this.setState({ markedReport: true, reportText: 'Reported' });
        });
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
      <div className="QAElement">
        <div>
          <p className='question'>Q: {this.props.data.question_body}</p>
          <ul className='answerList'>
            {
              renderAnswers.map(answer => <Answer key={`Answer ${answer.id}`} data={answer} />)
            }
          </ul>
          {this.renderSeeMoreAnswers()}
        </div>
        <p className='QuestionLinks'>
          Helpful?{' '}
          <span className='questionHelpful' onClick={this.handleQuestionHelpful}>Yes</span>{' '}
          {'(' + this.state.helpfulness + ')'}{' '}
          |{' '}
          <span className='questionReport' onClick={this.handleQuestionReport}>{this.state.reportText}</span>{' '}
          |{' '}
          <AddAnswer/>
        </p>
      </div>
    )
  }
}

export default Question;