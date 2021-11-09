import React from 'react';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import RatingsandReviews from '../../Client/src/Components/ratings/RatingsandReviews.jsx';



describe('Renders Ratings and Reviews', () => {
  afterEach(cleanup);



  test('Renders Ratings and Reviews', () => {
    render(<RatingsandReviews />);
    screen.debug();
  });


  test('Review form should pop up in a new window after "Add Review" is clicked on', () => {
    render(<RatingsandReviews productId={42366} />);
    const button = screen.getByTestId('addReviewBtn')
    fireEvent.click(button);
    expect(button).toHaveTextContent('ADD REVIEW +')
  });





});
