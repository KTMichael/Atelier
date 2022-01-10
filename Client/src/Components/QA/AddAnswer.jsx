import Popup from "reactjs-popup";
import React, { useState } from "react";
import axios from "axios";

function AddAnswer(props) {
  const [newAnswerStates, setAnswerState] = useState({
    body: "",
    name: "",
    email: "",
    photos: [],
  });
  const [errorMessage, setErrorMessageState] = useState("");
  const [timeoutID, setTimeoutIDState] = useState(null);

  function clearStates() {
    setAnswerState({
      body: "",
      name: "",
      email: "",
      photos: [],
    });
  }

  function handleSubmit(e, callback) {
    e.preventDefault();
    let inputs = {
      body: e.target.body.value,
      name: e.target.nickname.value,
      email: e.target.email.value,
      photos: [],
    };

    if (validateForm(inputs)) {
      axios.post(
        window.location.protocol +
          "//" +
          window.location.host +
          `/qa/questions/${props.question_id}/answers`,
        inputs
      );
      callback();
    }
  }

  function validateForm(inputs) {
    if (inputs.body === "") {
      setErrorMessage("You must enter the following: Answer");
      return false;
    }

    if (inputs.name === "") {
      setErrorMessage("You must enter the following: Nickname");
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)) {
      setErrorMessage("You have entered an invalid email address!");
      return false;
    }
    return true;
  }

  function setErrorMessage(message) {
    setErrorMessageState(message);
    clearTimeout(timeoutID);
    setTimeoutIDState(
      setTimeout(() => {
        setErrorMessageState("");
      }, 5000)
    );
  }

  return (
    <Popup
      className="AForm"
      trigger={<span className="click">Add Answer</span>}
      modal={true}
      onClose={() => {
        clearStates();
      }}
    >
      {(close) => (
        <div className="RForm">
          <h1 data-testid="reviewFormTitle">Submit Your Answers</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e, close);
            }}
          >
            <h2>Answer </h2>
            <textarea
              placeholder="Your answer goes here!"
              name="body"
              id="answerBody"
              rows={4}
              cols={50}
              maxLength={1000}
              value={newAnswerStates.body}
              onChange={(e) => {
                setAnswerState({ ...newAnswerStates, body: e.target.value });
              }}
            />
            <h2>Nickname </h2>
            <input
              type="text"
              name="nickname"
              id="answerNickname"
              maxLength={60}
              placeholder="Example: jack543!"
              style={{ width: "300px", height: "25px" }}
              value={newAnswerStates.nickname}
              onChange={(e) => {
                setAnswerState({ ...newAnswerStates, name: e.target.value });
              }}
            />
            <p>
              For privacy reasons, do not use your full name or email address.
            </p>
            <h2>E-mail </h2>
            <input
              type="text"
              name="email"
              id="answerEmail"
              maxLength={60}
              placeholder="Example: jackson11@email.com"
              style={{ width: "300px", height: "25px" }}
              value={newAnswerStates.email}
              onChange={(e) => {
                setAnswerState({ ...newAnswerStates, email: e.target.value });
              }}
            />
            <p>For authentication reasons, you will not be emailed.</p>
            {/* Add Photo */}
            <input className="btn" type="submit" value="Submit" />
            <span>&nbsp;{errorMessage}</span>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default AddAnswer;
