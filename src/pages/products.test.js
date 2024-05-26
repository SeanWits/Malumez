import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './products';
import { UserContext } from '../App';
import { getDocs, collection } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  getDocs: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  query: jest.fn(),
}));

jest.mock('../components/product', () => ({ imageUrl, name, price, quantity, onIncreaseQuantity, onDecreaseQuantity }) => (
  <div>
    <img src={imageUrl} alt={name} />
    <div>{name}</div>
    <div>{price}</div>
    <div>{quantity}</div>
    <button onClick={onIncreaseQuantity} data-testid="increase-quantity">+</button>
    <button onClick={onDecreaseQuantity} data-testid="decrease-quantity">-</button>
  </div>
));

jest.mock('react-spinners/FadeLoader', () => () => <div>Loading...</div>);
jest.mock('../pages/admin', () => () => <div />); // Mock admin.js to return a simple component

const mockUser = { uid: 'testuser' };

describe('Products component', () => {
  const setup = async () => {
    getDocs.mockResolvedValue({
      docs: [
        {
          id: '1',
          data: () => ({
            src: 'test1.jpg',
            name: 'Product 1',
            price: 10,
            category: 'Category 1',
            brand: 'Brand 1',
            stock: 10,
            shop_id: 'shop1',
          }),
        },
        {
          id: '2',
          data: () => ({
            src: 'test2.jpg',
            name: 'Product 2',
            price: 20,
            category: 'Category 2',
            brand: 'Brand 2',
            stock: 5,
            shop_id: 'shop2',
          }),
        },
      ],
    });

    render(
      <MemoryRouter>
        <UserContext.Provider value={mockUser}>
          <ProductsPage />
        </UserContext.Provider>
      </MemoryRouter>,
      { container: document.getElementById('root') }
    );

    await waitFor(() => expect(getDocs).toHaveBeenCalled());
  };


  it('handles checkout button click', async () => {
    await setup();
    fireEvent.click(screen.getByText('Checkout'));
    expect(screen.queryByText('Please log in to proceed to checkout.')).not.toBeInTheDocument();
  });
});
