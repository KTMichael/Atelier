import Popup from 'reactjs-popup';
import React from 'react';

function AddAnswer() {
  return (
    <Popup trigger={<span className='addAnswer'>Add Answer</span>} modal>
    <span> Modal content </span>
  </Popup>
  )
}

export default AddAnswer;