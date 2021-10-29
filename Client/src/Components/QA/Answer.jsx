import React from 'react';
import moment from 'moment';

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let username = this.props.data.answerer_name === 'Seller' ? <strong>Seller</strong> : this.props.data.answerer_name;
    let date = moment(this.props.data.date).format('MMMM DD, YYYY');
    return (
      <>
        <p className='question'>A: {this.props.data.body}</p>
        <p className='answerer'>
          by {username}, {date}
        </p>
      </>
    )
  }
}

export default Answer;