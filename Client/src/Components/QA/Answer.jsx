import React from 'react';
import moment from 'moment';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpfulness: this.props.data.helpfulness,
      markedHelpful: false,
      reportText: 'Report',
      markedReport: false
    };

    this.handleAnswerHelpful = this.handleAnswerHelpful.bind(this);
    this.handleAnswerReport = this.handleAnswerReport.bind(this);
  }

  handleAnswerHelpful() {
    if (!this.state.markedHelpful) {
      axios.put(window.location.protocol + '//' + window.location.host + `/qa/answers/${this.props.data.id}/helpful`)
        .then(() => this.setState({ helpfulness: this.state.helpfulness + 1, markedHelpful: true }));
    }
  }

  handleAnswerReport() {
    if (!this.state.markedReport) {
      axios.put(window.location.protocol + '//' + window.location.host + `/qa/answers/${this.props.data.id}/report`)
        .then(() => {
          this.setState({ markedReport: true, reportText: 'Reported' });
        });
    }
  }

  render() {
    let username = this.props.data.answerer_name === 'Seller' ? <strong>Seller</strong> : this.props.data.answerer_name;
    let date = moment.utc(this.props.data.date).format('MMMM DD, YYYY');
    return (
      <div className='answer'>
        <p className='answerText'>A: {this.props.data.body}</p>
        <p className='answererLinks'>
          by {username}, {date} | Helpful?{' '}
          <span className='click'   onClick={this.handleAnswerHelpful}>Yes</span>{' '}
          {'(' + this.state.helpfulness + ')'}{' '}
          | <span className='click'  onClick={this.handleAnswerReport}>{this.state.reportText}</span>
        </p>
      </div>
    )
  }
}

export default Answer;