import React from 'react';

function Styles (props) {

  return (
    <div className="thumbnail_container">
      {props.options.map( (element, index) => {
        return (
          <img className="thumbnail" key={index} src={element.photos[0].thumbnail_url}/>
        )
      })}
    </div>

  )
}

export default Styles;