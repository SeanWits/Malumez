import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from './product';

describe('Product component', () => {
  const productProps = {
    imageUrl: 'test.jpg',
    name: 'Test Product',
    price: 100,
    quantity: 1,
    onIncreaseQuantity: jest.fn(),
    onDecreaseQuantity: jest.fn(),
  };

  it('renders product details correctly', () => {
    const { getByText, getByAltText } = render(<Product {...productProps} />);
    expect(getByAltText('Test Product')).toHaveAttribute('src', 'test.jpg');
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('R100.00')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
  });

  it('calls onIncreaseQuantity when the + button is clicked', () => {
    const { getByText } = render(<Product {...productProps} />);
    fireEvent.click(getByText('+'));
    expect(productProps.onIncreaseQuantity).toHaveBeenCalled();
  });

  it('calls onDecreaseQuantity when the - button is clicked', () => {
    const { getByText } = render(<Product {...productProps} />);
    fireEvent.click(getByText('-'));
    expect(productProps.onDecreaseQuantity).toHaveBeenCalled();
  });
});
