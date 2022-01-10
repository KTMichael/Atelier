import React from "react";
import { Cachet } from "react-icons/fa";
import Style from "./Style.jsx";

class Styles extends React.Component {
  render() {
    return (
      <div className="thumbnail_rows_container">
        {this.props.options.map((element, index) => {
          if (element.style_id === this.props.selectedStyle.style_id) {
            var isSelected = true;
          } else {
            var isSelected = false;
          }

          return (
            <React.Fragment key={element.style_id}>
              <div>
                <Style
                  index={index}
                  isSelected={isSelected}
                  handleChangeStyle={this.props.handleChangeStyle}
                  src={element.photos[0].thumbnail_url}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default Styles;
