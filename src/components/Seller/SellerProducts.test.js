import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this import is correct
import SellerProducts from './SellerProducts'; // Import the SellerProducts component
import { auth, db } from '../../firebase'; // Assuming firebase is imported correctly
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Mock Firebase auth and firestore functions
jest.mock('../../firebase', () => ({
  auth: {
    currentUser: null,
  },
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock console.log to silence the logs and to check for log messages
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

describe('SellerProducts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs "User is not logged in" when no user is authenticated', async () => {
    auth.currentUser = null;

    render(<SellerProducts />);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("User is not logged in.");
    });
  });

  it('logs "No shop found for the current user" when user has no shop', async () => {
    auth.currentUser = { uid: 'test-user' };
    getDocs.mockResolvedValue({
      empty: true,
      docs: [],
    });

    render(<SellerProducts user={auth.currentUser} />);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("No shop found for the current user.");
    });
  });

  it('renders products when user has a shop', async () => {
    auth.currentUser = { uid: 'test-user' };
    const mockShopDoc = {
      id: 'shop-id',
      data: jest.fn(),
    };
    getDocs
      .mockResolvedValueOnce({
        empty: false,
        docs: [mockShopDoc],
      })
      .mockResolvedValueOnce({
        empty: false,
        docs: [
          {
            id: 'product-1',
            data: () => ({ name: 'Product 1', price: 100, stock: 10, src: 'image1.jpg' }),
          },
          {
            id: 'product-2',
            data: () => ({ name: 'Product 2', price: 200, stock: 20, src: 'image2.jpg' }),
          },
        ],
      });

    render(<SellerProducts user={auth.currentUser} />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it('updates stock count when "Update Stock" button is clicked', async () => {
    auth.currentUser = { uid: 'test-user' };
    const mockShopDoc = {
      id: 'shop-id',
      data: jest.fn(),
    };
    getDocs
      .mockResolvedValueOnce({
        empty: false,
        docs: [mockShopDoc],
      })
      .mockResolvedValueOnce({
        empty: false,
        docs: [
          {
            id: 'product-1',
            data: () => ({ name: 'Product 1', price: 100, stock: 10, src: 'image1.jpg' }),
          },
        ],
      });

    const mockDocRef = { id: 'product-1' };
    doc.mockReturnValue(mockDocRef);

    render(<SellerProducts user={auth.currentUser} />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    const stockInput = screen.getByDisplayValue(10);
    fireEvent.change(stockInput, { target: { value: '15' } });

    const updateButton = screen.getByText('Update Stock');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        mockDocRef,
        { stock: 15 }
      );
    });
  });

  it('deletes product when "Delete Product" button is clicked', async () => {
    auth.currentUser = { uid: 'test-user' };
    const mockShopDoc = {
      id: 'shop-id',
      data: jest.fn(),
    };
    getDocs
      .mockResolvedValueOnce({
        empty: false,
        docs: [mockShopDoc],
      })
      .mockResolvedValueOnce({
        empty: false,
        docs: [
          {
            id: 'product-1',
            data: () => ({ name: 'Product 1', price: 100, stock: 10, src: 'image1.jpg' }),
          },
        ],
      });

    const mockDocRef = { id: 'product-1' };
    doc.mockReturnValue(mockDocRef);

    render(<SellerProducts user={auth.currentUser} />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Delete Product');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    });
  });
});
