import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeaturedProducts } from './FeaturedProduct';
import { BrowserRouter as Router } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Mock Firebase Firestore functions
jest.mock('../../firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock console.error to silence the error logs and to check for error messages
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('FeaturedProducts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Brands heading and navigation icons', () => {
    render(
      <Router>
        <FeaturedProducts />
      </Router>
    );

    expect(screen.getByText("Brands")).toBeInTheDocument();
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });


  it('handles fetch errors gracefully', async () => {
    getDocs.mockRejectedValue(new Error('Fetch error'));

    render(
      <Router>
        <FeaturedProducts />
      </Router>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching brands:', expect.any(Error));
    });
  });
});
