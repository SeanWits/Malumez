import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SellerForm from './sellerForm';
import { BrowserRouter as Router } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

describe('SellerForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the form correctly', () => {
    render(
      <Router>
        <SellerForm />
      </Router>
    );

    expect(screen.getByText('Shop registration')).toBeInTheDocument();
    expect(screen.getByLabelText('Shop Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByTestId('signUpButton')).toBeInTheDocument();
  });

  it('displays error when the location is invalid', async () => {
    render(
      <Router>
        <SellerForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Shop Name'), { target: { value: 'Test Shop' } });
    fireEvent.change(screen.getByLabelText('Contact'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: '' } });

    fireEvent.click(screen.getByTestId('signUpButton'));

    await waitFor(() => {
      expect(screen.getByText('The location is not valid')).toBeInTheDocument();
    });
  });

  it('displays error when the contact number is invalid', async () => {
    render(
      <Router>
        <SellerForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Shop Name'), { target: { value: 'Test Shop' } });
    fireEvent.change(screen.getByLabelText('Contact'), { target: { value: '1234abc' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Test Location' } });

    fireEvent.click(screen.getByTestId('signUpButton'));

    await waitFor(() => {
      expect(screen.getByText('The Contact number is not valid')).toBeInTheDocument();
    });
  });

  it('displays error when the contact number is too short', async () => {
    render(
      <Router>
        <SellerForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Shop Name'), { target: { value: 'Test Shop' } });
    fireEvent.change(screen.getByLabelText('Contact'), { target: { value: '1234567' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Test Location' } });

    fireEvent.click(screen.getByTestId('signUpButton'));

    await waitFor(() => {
      expect(screen.getByText('The contact number is too short')).toBeInTheDocument();
    });
  });

  it('registers the shop and displays success message when all inputs are valid', async () => {
    const mockAddDoc = addDoc.mockResolvedValueOnce({ id: 'new-shop-id' });

    render(
      <Router>
        <SellerForm />
      </Router>
    );

    localStorage.setItem('email', 'test@example.com');
    localStorage.setItem('name', 'Test');
    localStorage.setItem('surname', 'User');
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('userID', 'user123');

    fireEvent.change(screen.getByLabelText('Shop Name'), { target: { value: 'Test Shop' } });
    fireEvent.change(screen.getByLabelText('Contact'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Test Location' } });

    fireEvent.click(screen.getByTestId('signUpButton'));

    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalled();
      expect(screen.getByTestId('successMessage')).toBeInTheDocument();
      expect(screen.getByTestId('successMessage')).toHaveTextContent('Shop and seller Registered!');
    });
  });
});
