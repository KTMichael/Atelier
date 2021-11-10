import Popup from 'reactjs-popup';
import React, { useState } from 'react';
import Axios from 'axios';

function AddAnswer() {
  const [newAnswerStates, setAnswerState] = useState({ body: '', nickname: '', email: '' })
  const [errorMessage, setErrorMessageState] = useState('');
  const [timeoutID, setTimeoutIDState] = useState(null);

  function clearStates() {
    setAnswerState({
      body: '',
      nickname: '',
      email: ''
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    let inputs = {
      body: e.target.body.value,
      nickname: e.target.nickname.value,
      email: e.target.email.value
    }

    if (validateForm(inputs)) {

    } else {
      console.log('error');
    }
  }

  function validateForm(inputs) {
    if (inputs.body === '') {
      setErrorMessage('Answer cannot be empty');
      return false;
    }

    if (inputs.nickname === '') {
      setErrorMessage('Nickname is required');
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)) {
      setErrorMessage('You have entered an invalid email address!')
      return false;
    }
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
      {console.log('rendered Popup')}
      <form onSubmit={handleSubmit}>
        <label htmlFor='answerBody'>Answer *</label>
        <textarea name='body' id='answerBody' rows={4} cols={50} maxLength={1000} value={newAnswerStates.body} onChange={(e) => { setAnswerState({ ...newAnswerStates, body: e.target.value }) }} />
        <label htmlFor='answerNickname'>Nickname *</label>
        <input type='text' name='nickname' id='answerNickname' maxLength={60} placeholder='Example: jack543!' value={newAnswerStates.nickname} onChange={(e) => { setAnswerState({ ...newAnswerStates, nickname: e.target.value }) }} />
        <p>“For privacy reasons, do not use your full name or email address”</p>
        <label htmlFor='answerEmail'>E-mail *</label>
        <input type='text' name='email' id='answerEmail' maxLength={60} placeholder='"Example: jack@email.com”' value={newAnswerStates.email} onChange={(e) => { setAnswerState({ ...newAnswerStates, email: e.target.value }) }} />
        <p>“For authentication reasons, you will not be emailed”</p>
        {/* Add Photo */}
        <input type="submit" value="Submit" />
        <span>&nbsp;{errorMessage}</span>
      </form>
    </Popup>
  )
}

export default AddAnswer;