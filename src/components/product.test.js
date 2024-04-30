import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Product from './product';

describe('Product component', () => {
  const imageUrl = 'example.jpg';
  const price = 10.99;
  const name = 'Example Product';
  const onAddToCart = jest.fn();
  const onRemoveFromCart = jest.fn();

  it('should render product correctly', () => {
    const { getByAltText, getByText } = render(
      <Product
        imageUrl={imageUrl}
        price={price}
        name={name}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    );

    const image = getByAltText(name);
    const productName = getByText(name);
    const productPrice = getByText(`R${price}`);
    const addToCartButton = getByText('+');
    const removeFromCartButton = getByText('-');

    expect(image).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
    expect(removeFromCartButton).toBeInTheDocument();
  });

  it('should call onAddToCart function when Add to Cart button is clicked', () => {
    const { getByText } = render(
      <Product
        imageUrl={imageUrl}
        price={price}
        name={name}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    );

    const addToCartButton = getByText('+');
    fireEvent.click(addToCartButton);
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('should call onRemoveFromCart function when Remove from Cart button is clicked', () => {
    const { getByText } = render(
      <Product
        imageUrl={imageUrl}
        price={price}
        name={name}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    );

    const removeFromCartButton = getByText('-');
    fireEvent.click(removeFromCartButton);
    expect(onRemoveFromCart).toHaveBeenCalledTimes(1);
  });
});
