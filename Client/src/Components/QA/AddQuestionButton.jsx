import React from "react";
import Popup from "reactjs-popup";

class AddQuestionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Popup
        className="QForm"
        trigger={<button className="btn"> Add Question +</button>}
        modal
      >
        <div className="RForm">
          <h1>Submit Your Questions</h1>
          <form>
            <input
              type="text"
              id="NewQuestion"
              name="NewQuestion"
              placeholder="Write your question here!"
              style={{ width: "500px", height: "100px" }}
              maxLength="1000"
            />
            <br />
            <input type="submit" className="btn" value="Add new question" />
          </form>
        </div>
      </Popup>
    );
  }
}

export default AddQuestionButton;
