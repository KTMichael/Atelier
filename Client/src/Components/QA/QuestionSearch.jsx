import React from 'react';

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {

  }

  render() {
    return (<input type='text' id='questionSearch'></input>)
  }
}

export default QuestionSearch;