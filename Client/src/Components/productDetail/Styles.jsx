import React from 'react';

function Styles (props) {

  return (
    <div>
      {props.options.map( (element) => {
        return (
        <span>
          <img src={element.photos[0].thumbnail_url}/>
        </span>
        )
      })}
    </div>

  )
}

export default Styles;