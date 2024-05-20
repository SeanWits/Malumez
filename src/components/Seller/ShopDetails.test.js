import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this import is correct
import { ShopDetails } from './ShopDetails';
import { auth} from '../../firebase'; // Assuming firebase is imported correctly
import { getDocs } from "firebase/firestore";

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
}));

describe('ShopDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "User is not logged in" when no user is authenticated', async () => {
    auth.currentUser = null;

    render(<ShopDetails />);

    await waitFor(() => {
      expect(screen.getByText("User is not logged in.")).toBeInTheDocument();
    });
  });

  it('renders "No shop found for the current user" when user has no shop', async () => {
    auth.currentUser = { uid: 'test-user' };
    getDocs.mockResolvedValue({
      empty: true,
      docs: [],
    });

    render(<ShopDetails />);

    await waitFor(() => {
      expect(screen.getByText("No shop found for the current user.")).toBeInTheDocument();
    });
  });

  it('renders shop details when user has a shop', async () => {
    auth.currentUser = { uid: 'test-user' };
    const mockShopData = {
      id: 'shop-id',
      name: 'Test Shop',
      location: 'Test Location',
      owner_name: 'Test Owner',
      contact: 'Test Contact',
    };
    getDocs.mockResolvedValue({
      empty: false,
      docs: [
        {
          id: 'shop-id',
          data: () => mockShopData,
        },
      ],
    });

    render(<ShopDetails />);

    await waitFor(() => {
      expect(screen.getByText("Shop Name: Test Shop")).toBeInTheDocument();
      expect(screen.getByText("Shop Location: Test Location")).toBeInTheDocument();
      expect(screen.getByText("Shop Owner: Test Owner")).toBeInTheDocument();
      expect(screen.getByText("Shop Contact Details: Test Contact")).toBeInTheDocument();
    });
  });
});
