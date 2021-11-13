import React from 'react';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import Stars from '../../Client/src/Components/ratings/Stars.jsx';


describe('Renders Stars', () => {
  afterEach(cleanup);
  test('Renders Stars', () => {
    render(<Stars />);
    screen.debug();
  });
});


