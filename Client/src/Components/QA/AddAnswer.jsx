import Popup from 'reactjs-popup';
import React, { useState } from 'react';

function AddAnswer() {
  const [answerBody, setABody] = useState('');

  function handleSubmit() {

  }

  return (
    <Popup
      className='addAnswer'
      trigger={<span>Add Answer</span>}
      modal={true}
      onClose={() => { setABody('') }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor='answerBody'>Answer *</label>
        <textarea name='body' id='answerBody' rows={4} cols={50} maxLength={1000} value={answerBody} onChange={(e) => { setABody(e.target.value) }} />
        <label htmlFor='answerNickname'>Nickname *</label>
        <input type='text' name='nickname' id='answerNickname' maxLength={60} />
        <label htmlFor='answerEmail'>E-mail *</label>
        <input type='text' name='email' id='answerEmail' maxLength={60} placeholder='"Example: jack@email.com”' />
        {/* Add Photo */}
        <input type="submit" value="Submit" />
      </form>
    </Popup>
  )
}

export default AddAnswer;