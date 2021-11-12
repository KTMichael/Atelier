import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';

import AddToCart from '../Client/src/Components/productDetail/AddToCart.jsx';
import ImageGallery from '../Client/src/Components/productDetail/ImageGallery.jsx';
import Rating from '../Client/src/Components/productDetail/Rating.jsx';
import Styles from '../Client/src/Components/productDetail/Styles.jsx';


describe('Renders Ratings and Reviews', () => {
  afterEach(cleanup);

  test('Renders Add to Cart component', () => {
    render(<AddToCart />);
    screen.debug();
  });

  test('Renders Image Gallery component', () => {
    render(<ImageGallery />);
    screen.debug();
  });

  test('Renders Star Rating component', () => {
    render(<Rating />);
    screen.debug();
  });

  test('Renders all Style thumbnails', () => {
    render(<Styles />);
    screen.debug();
  });

});