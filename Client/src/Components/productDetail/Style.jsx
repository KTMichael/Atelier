import React from 'react';
import { AiOutlineCheckSquare } from 'react-icons/ai';


function Style (props) {
  if (props.isSelected) {
    return (
      <div className="thumbnail_column_container" >
        <img data-index={props.index}
        onClick={props.handleChangeStyle}
        key={props.key}
        src={props.src}
        className="thumbnail" />
        <AiOutlineCheckSquare style={{position: 'absolute', top: 0, left: 0, background: 'black'}}/>
      </div>
    )
  } else {
    return (
      <div className="thumbnail_column_container" >
        <img data-index={props.index}
        onClick={props.handleChangeStyle}
        key={props.key}
        src={props.src}
        className="thumbnail" />
      </div>
    )
  }
}

export default Style;