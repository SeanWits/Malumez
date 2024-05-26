import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Categories } from './Categories';
import { BrowserRouter as Router } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// Mock Firebase Firestore functions
jest.mock('../../firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
}));

// Mock console.error to silence the error logs and to check for error messages
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('Categories Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders category heading and "View More" button', () => {
    render(
      <Router>
        <Categories />
      </Router>
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("View More")).toBeInTheDocument();
  });

  it('navigates to products page when "View More" button is clicked', () => {
    render(
      <Router>
        <Categories />
      </Router>
    );

    const viewMoreButton = screen.getByText('View More');
    fireEvent.click(viewMoreButton);

    expect(localStorage.getItem("searchInput")).toBe("nothing");
    expect(window.location.pathname).toBe('/products');
  });

  it('handles fetch errors gracefully', async () => {
    getDocs.mockRejectedValue(new Error('Fetch error'));

    render(
      <Router>
        <Categories />
      </Router>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
    });
  });
});
