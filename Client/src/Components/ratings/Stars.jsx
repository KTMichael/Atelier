import React from 'react';
import { FaStar } from "react-icons/fa";
const Stars = ({ filled, onClick, val }) => {
  console.log(val)
  return (
    <FaStar
      bordercolor={"black"}
      color={filled ? "gold" : "white"}
      onClick={onClick} />
  );
}
export default Stars;