import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AdsBar } from './AdsBar';

describe('AdsBar component', () => {
  test('renders initial setup correctly', () => {
    const { getByTestId } = render(<AdsBar />);
    expect(getByTestId('slide1')).toHaveStyle('display: block');
    expect(getByTestId('slide2')).toHaveStyle('display: none');
    expect(getByTestId('slide3')).toHaveStyle('display: none');
  });

  test('changes slide when left and right arrows are clicked', () => {
    const { getByTestId } = render(<AdsBar />);
    const leftArrow = getByTestId('adLeftArrow');
    const rightArrow = getByTestId('adRightArrow');

    fireEvent.click(rightArrow); // Move to next slide
    expect(getByTestId('slide1')).toHaveStyle('display: none');
    expect(getByTestId('slide2')).toHaveStyle('display: block');
    expect(getByTestId('slide3')).toHaveStyle('display: none');

    fireEvent.click(leftArrow); // Move to previous slide
    expect(getByTestId('slide1')).toHaveStyle('display: block');
    expect(getByTestId('slide2')).toHaveStyle('display: none');
    expect(getByTestId('slide3')).toHaveStyle('display: none');
  });

  test('changes slide automatically after a certain time', async () => {
    jest.useFakeTimers(); // Use fake timers to control time-based functions
    const { getByTestId } = render(<AdsBar />);

    // First slide should be visible initially
    expect(getByTestId('slide1')).toHaveStyle('display: block');

    // Advance time by 5 seconds to trigger slide change
    jest.advanceTimersByTime(5000);

    // Second slide should now be visible
    await waitFor(() => {
      expect(getByTestId('slide1')).toHaveStyle('display: none');
      expect(getByTestId('slide2')).toHaveStyle('display: block');
      expect(getByTestId('slide3')).toHaveStyle('display: none');
    });
  });
});
