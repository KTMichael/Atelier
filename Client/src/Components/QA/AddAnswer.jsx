import Popup from 'reactjs-popup';
import React, { useState } from 'react';
import axios from 'axios';

function AddAnswer(props) {
  const [newAnswerStates, setAnswerState] = useState({ body: '', name: '', email: '', photos: [] })
  const [errorMessage, setErrorMessageState] = useState('');
  const [timeoutID, setTimeoutIDState] = useState(null);

  function clearStates() {
    setAnswerState({
      body: '',
      name: '',
      email: '',
      photos: []
    })
  }

  function handleSubmit(e, callback) {
    e.preventDefault();
    let inputs = {
      body: e.target.body.value,
      name: e.target.nickname.value,
      email: e.target.email.value,
      photos: []
    }

    if (validateForm(inputs)) {
      axios.post(window.location.protocol + '//' + window.location.host + `/qa/questions/${props.question_id}/answers`, inputs);
      callback();
    }
  }

  function validateForm(inputs) {
    if (inputs.body === '') {
      setErrorMessage('You must enter the following: Answer');
      return false;
    }

    if (inputs.name === '') {
      setErrorMessage('You must enter the following: Nickname');
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)) {
      setErrorMessage('You have entered an invalid email address!')
      return false;
    }
    return true;
  }

  function setErrorMessage(message) {
    setErrorMessageState(message);
    clearTimeout(timeoutID);
    setTimeoutIDState(setTimeout(() => { setErrorMessageState('') }, 5000));
  }

  return (
    <Popup
      className='addAnswer'
      trigger={<span>Add Answer</span>}
      modal={true}
      onClose={() => { clearStates() }}
    >
      {close => (<>
        <h1>Submit your Answer</h1>
        <form onSubmit={(e) => {handleSubmit(e, close)}}>
          <label htmlFor='answerBody'>Answer *</label>
          <textarea name='body' id='answerBody' rows={4} cols={50} maxLength={1000} value={newAnswerStates.body} onChange={(e) => { setAnswerState({ ...newAnswerStates, body: e.target.value }) }} />
          <label htmlFor='answerNickname'>Nickname *</label>
          <input type='text' name='nickname' id='answerNickname' maxLength={60} placeholder='Example: jack543!' value={newAnswerStates.nickname} onChange={(e) => { setAnswerState({ ...newAnswerStates, name: e.target.value }) }} />
          <p>“For privacy reasons, do not use your full name or email address”</p>
          <label htmlFor='answerEmail'>E-mail *</label>
          <input type='text' name='email' id='answerEmail' maxLength={60} placeholder='"Example: jack@email.com”' value={newAnswerStates.email} onChange={(e) => { setAnswerState({ ...newAnswerStates, email: e.target.value }) }} />
          <p>“For authentication reasons, you will not be emailed”</p>
          {/* Add Photo */}
          <input type="submit" value="Submit" />
          <span>&nbsp;{errorMessage}</span>
        </form>
      </>
      )}
    </Popup>
  )
}

export default AddAnswer;