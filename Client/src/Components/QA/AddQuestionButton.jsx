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
        <form>
          <input type='text' id='NewQuestion' name='NewQuestion'/>
          <input type='submit' value='Add new question'/>
        </form>
      </Popup>
    )
  }
}

export default AddQuestionButton;