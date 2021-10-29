import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p className ='question'>Q: {this.props.data.question_body}</p>
    )
  }
}

export default Question;