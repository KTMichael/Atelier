import React from 'react';
import Popup from 'reactjs-popup';

class AddQuestionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Popup trigger={<button className="button"> Add Question </button>} modal>
        <span> Modal content </span>
      </Popup>
    )
  }
}

export default AddQuestionButton;