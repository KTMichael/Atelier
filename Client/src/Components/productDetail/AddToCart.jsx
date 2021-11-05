import React from 'react';

const AddToCart = (props) => (
  <div id="add_to_cart">
    <label>
      Size:
      <select className="select_size">
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>
    </label>
    <label>
      Quantity:
      <select className="select_quantity">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </label>
    <button className="add_item">Add to Cart</button>
  </div>
)

export default AddToCart;