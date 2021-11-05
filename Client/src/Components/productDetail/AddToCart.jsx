import React from 'react';

class AddToCart extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      size: '',
      maxQuantity: 0,
      quantity: 0
    }
    this.handleSizeSelection = this.handleSizeSelection.bind(this);
    this.handleQuantitySelection = this.handleQuantitySelection.bind(this);
  }

  sizeOptions () {
    var options = [<option key={'default-size'} >Select Size</option>];

    for (var key in this.props.skus) {
      options.push( <option value={this.props.skus[key].size} key={key}>{this.props.skus[key].size}</option> )
    }
    return options;
  }

  quantityOptions () {
    var options = [<option key={'default-quantity'} >-</option>];
    if (this.state.maxQuantity > 15) {
      var displayQuantity = 15;
    } else {
    var displayQuantity = this.state.maxQuantity;
    }
    var counter = 1;

    for (var i = 0; i < displayQuantity; i++) {
      options.push( <option value={counter} key={i}>{counter}</option> )
      counter++
    }
    counter = 1;
    return options;
  }

  handleSizeSelection (e) {
    var maxQuantity = '';
    for (var key in this.props.skus) {
      if (this.props.skus[key].size === e.target.value) {
        maxQuantity = this.props.skus[key].quantity
      }
    }
    this.setState ({
      size: e.target.value,
      maxQuantity: maxQuantity,
      quantity: '-'
    })
  }

  handleQuantitySelection (e) {
    this.setState ({
      quantity: e.target.value
    })
  }

  render () {
    return (
      <div id="add_to_cart">
        <label>
          Size:
          <select onChange={this.handleSizeSelection} value={this.state.size} className="select_size">
            {this.sizeOptions()}
          </select>
        </label>
        <label>
          Quantity:
          <select onChange={this.handleQuantitySelection} value={this.state.quantity} className="select_quantity">
            {this.quantityOptions()}
          </select>
        </label>
        <button className="add_item">Add to Cart</button>
      </div>
    )
  }
}

export default AddToCart;