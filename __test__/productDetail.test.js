import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';

import AddToCart from '../Client/src/Components/productDetail/AddToCart.jsx';
import ImageGallery from '../Client/src/Components/productDetail/ImageGallery.jsx';
import Rating from '../Client/src/Components/productDetail/Rating.jsx';
import Style from '../Client/src/Components/productDetail/Style.jsx';


describe('Renders Product Detail Overview', () => {
  afterEach(cleanup);

  test('Renders Add to Cart component', () => {
    render(<AddToCart />);
    screen.debug();
  });

  test('Sends API request to add item', () => {
    render(<AddToCart />);
    const button = screen.getByRole('button');

    const alertMock = jest.spyOn(window,'alert');
    fireEvent.click(button)
    expect(alertMock).toHaveBeenCalledTimes(1);

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
    render(<Style />);
    screen.debug();
  });

});