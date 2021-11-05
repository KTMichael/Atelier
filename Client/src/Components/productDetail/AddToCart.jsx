import React from 'react';
import { TOKEN } from '../../../../config.js';
import axios from 'axios';

class AddToCart extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      size: '',
      maxQuantity: 0,
      quantity: '-',
      sku: ''
    }
    this.handleSizeSelection = this.handleSizeSelection.bind(this);
    this.handleQuantitySelection = this.handleQuantitySelection.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
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
    var sku = '';
    for (var key in this.props.skus) {
      if (this.props.skus[key].size === e.target.value) {
        maxQuantity = this.props.skus[key].quantity
        sku = key
      }
    }
    this.setState ({
      size: e.target.value,
      maxQuantity: maxQuantity,
      quantity: '-',
      sku: sku
    })
  }

  handleQuantitySelection (e) {
    this.setState ({
      quantity: e.target.value
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps)
    {
      this.setState({
        size: '',
        maxQuantity: 0,
        quantity: 0,
        sku: ''
      })
    }
  }

  handleAddItem () {
    if (this.state.quantity === '-' || this.state.size === '') {
      alert('Please select a quantity.')
    } else {
      axios({
        method: "post",
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/cart/`,
        data: {
          sku_id: this.state.sku,
          quantity: this.state.quantity
        },
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json"
        }
      })
        .then(alert('Item added to cart.'))
        .catch( err => console.log(err));
    }
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
        <button onClick={this.handleAddItem} className="add_item">Add to Cart</button>
      </div>
    )
  }
}

export default AddToCart;