import React from 'react';
import moment from 'moment';

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <p className='question'>A: {this.props.data.body}</p>
        <p>by {this.props.data.answerer_name}, {moment(this.props.data.date).format('MMMM DD, YYYY')}</p>
      </>
    )
  }
}

export default Answer;