import React from 'react';
import moment from 'moment';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.data;

    this.handleAnswerHelpful = this.handleAnswerHelpful.bind(this);
  }

  handleAnswerHelpful() {
    axios.put(window.location.protocol + '//' + window.location.host + `/qa/answers/${this.state.id}/helpful`)
    .then(x => console.log('Returned:', x));
  }

  render() {
    let username = this.state.answerer_name === 'Seller' ? <strong>Seller</strong> : this.state.answerer_name;
    let date = moment(this.state.date).format('MMMM DD, YYYY');
    return (
      <div className='answer'>
        <p className='answerText'>A: {this.state.body}</p>
        <p className='answererDetails'>
          by {username}, {date} | Helpful? <span className='answerHelpful' onClick={this.handleAnswerHelpful}>Yes</span> {this.state.helpfulness} | <span>Report</span>
        </p>
      </div>
    )
  }
}

export default Answer;