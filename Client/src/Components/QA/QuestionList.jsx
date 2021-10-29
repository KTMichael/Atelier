import React from 'react';
import axios from 'axios';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {}
    }
  }

  componentDidMount() {
    //TODO: Remove this dirty direct get request, should be done through the server router
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/?product_id=42366')
    .then((result) => { this.setState({questions: result})})
  }

  render() {
    return (
    <ul>

    </ul>
    )
  }
}

export default QuestionList;