import React from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p className ='question'>A: {this.props.data.body}</p>
    )
  }
}

export default Answer;