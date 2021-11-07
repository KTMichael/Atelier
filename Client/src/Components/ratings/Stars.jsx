import React from 'react';
import { FaStar } from "react-icons/fa";
const Stars = ({ filled, onClick, val }) => {
  return (
    <FaStar style={{ fontSize: '15px', padding: '7px' }}
      color={filled ? "gold" : "white"}
      onClick={onClick} />
  );
}
export default Stars;