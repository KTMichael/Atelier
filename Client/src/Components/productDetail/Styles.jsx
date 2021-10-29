import React from 'react';

function Styles (props) {

  return (
    <div>
      {props.options.map( (element, index) => {
        return (
          <img key={index} src={element.photos[0].thumbnail_url}/>
        )
      })}
    </div>

  )
}

export default Styles;