import React from 'react';
import { Cachet } from 'react-icons/fa';
import Style from './Style.jsx';

class Styles extends React.Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }

  handleClick () {

  }

  render () {
    return (
      <div className="thumbnail_container">
        {this.props.options.map( (element, index) => {
          console.log(element.style_id);
          if (element.style_id === this.props.selectedStyle.style_id) {
            var isSelected = true;
          } else {
            var isSelected = false;
          }

          return (
            <React.Fragment key={element.style_id}>
              <Style index={index} handleChangeStyle={this.props.handleChangeStyle} isSelected={isSelected} src={element.photos[0].thumbnail_url}/>
            </React.Fragment>
          )
        })}
      </div>
    )
  }
}

export default Styles;