import React from 'react';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import ReviewForm from '../../Client/src/Components/ratings/ReviewForm.jsx';


describe('Renders Review Form', () => {
  afterEach(cleanup);

  test('Renders Review Form for product ID', () => {
    render(<ReviewForm productId={42366} />);
    const button = screen.getByTestId('addReviewBtn')
    fireEvent.click(button);
    const formTitle = screen.getByText('Write Your Review')
    expect(formTitle).toBeInTheDocument()
  });

});