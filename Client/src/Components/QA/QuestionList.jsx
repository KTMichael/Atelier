import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    //TODO: Replace this get request with a dynamic url based on current viewing product
    axios.get(window.location.protocol + '//' + window.location.host + '/qa/questions/?product_id=42366')
    .then((result) => { this.setState({questions: result.data})})
  }

  render() {
    return (
    <ul id='questionList'>
      {this.state.questions.map((question, index) => <Question key = {`question ${index}`} data={question} />)}
    </ul>
    )
  }
}

export default QuestionList;