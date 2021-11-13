import React from 'react';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import QuestionList from '../../Client/src/Components/QA/QuestionList.jsx';



describe('Renders Ratings and Reviews', () => {
  afterEach(cleanup);



  test('Renders Ratings and Reviews', () => {
    render(<QuestionList />);
    screen.debug();
  });


  // test('Review form should pop up in a new window after "Add Review" is clicked on', () => {
  //   render(<RatingsandReviews productId={42366} />);
  //   const button = screen.getByTestId('addReviewBtn')
  //   fireEvent.click(button);
  //   expect(button).toHaveTextContent('ADD REVIEW +')
  // });
});
