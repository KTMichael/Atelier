import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';

const AddProductToOutfits = ({addItem, product}) => {

  const addProduct = (e) => {
    addItem(product)
  }

  return (
    <div id='add-product-display'>
      <div id='add-product-icon' onClick={addProduct}>
        <FaPlusCircle />
      </div>
    </div>
  )
}

export default AddProductToOutfits;