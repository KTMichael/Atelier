import React from "react";
import axios from "axios";
import Popup from "reactjs-popup";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: "",
      maxQuantity: 0,
      quantity: "-",
      sku: "",
    };
    this.handleSizeSelection = this.handleSizeSelection.bind(this);
    this.handleQuantitySelection = this.handleQuantitySelection.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  sizeOptions() {
    var options = [<option key={"default-size"}>Select Size</option>];

    for (var key in this.props.skus) {
      options.push(
        <option value={this.props.skus[key].size} key={key}>
          {this.props.skus[key].size}
        </option>
      );
    }
    return options;
  }

  quantityOptions() {
    var options = [<option key={"default-quantity"}>Quantity</option>];
    if (this.state.maxQuantity > 15) {
      var displayQuantity = 15;
    } else {
      var displayQuantity = this.state.maxQuantity;
    }
    var counter = 1;

    for (var i = 0; i < displayQuantity; i++) {
      options.push(
        <option value={counter} key={i}>
          {counter}
        </option>
      );
      counter++;
    }
    counter = 1;
    return options;
  }

  handleSizeSelection(e) {
    var maxQuantity = "";
    var sku = "";
    for (var key in this.props.skus) {
      if (this.props.skus[key].size === e.target.value) {
        maxQuantity = this.props.skus[key].quantity;
        sku = key;
      }
    }
    this.setState({
      size: e.target.value,
      maxQuantity: maxQuantity,
      quantity: "-",
      sku: sku,
    });
  }

  handleQuantitySelection(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        size: "",
        maxQuantity: 0,
        quantity: 0,
        sku: "",
      });
    }
  }

  handleAddItem() {
    if (this.state.quantity === "-" || this.state.size === "") {
      alert("Please select a quantity.");
    } else {
      axios({
        method: "post",
        url: `/cart`,
        data: {
          sku_id: this.state.sku,
          quantity: this.state.quantity,
        },
      }).catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <div id="add_to_cart">
        <label>
          <select
            style={{ cursor: "pointer" }}
            onChange={this.handleSizeSelection}
            value={this.state.size}
            className="select_size"
            className="productSelect"
          >
            {this.sizeOptions()}
          </select>
        </label>
        <label>
          <select
            style={{ cursor: "pointer" }}
            onChange={this.handleQuantitySelection}
            value={this.state.quantity}
            className="select_quantity"
            className="productSelect"
          >
            {this.quantityOptions()}
          </select>
        </label>

        <Popup
          className="QForm"
          trigger={
            <button
              onClick={this.handleAddItem}
              className="add_item"
              className="productSelect"
            >
              Add to Cart +
            </button>
          }
          modal
        >
          <div className="RForm">
            {this.state.quantity !== "" ? (
              <div>
                <h1>Successfully Added To Cart!</h1>
                <hr />
                <div className="cartItems">
                  Product Name - {this.props.title}
                  <br />
                  <br />
                  Product Style - {this.props.name}
                  <br />
                  <br />
                  Quantity - {this.state.quantity}
                  <br />
                  <br />
                  Size - {this.state.size}
                </div>
                <hr />
                <br />
                <h2>You are going to look great!</h2>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Popup>
      </div>
    );
  }
}

export default AddToCart;
