import React from 'react';

function Style (props) {
  return (
      <img data-index={props.index} onClick={props.handleChangeStyle} key={props.key} src={props.src} className="thumbnail" />
  )
}

export default Style;