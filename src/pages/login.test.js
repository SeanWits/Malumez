import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './login';

// Mock the react-router-dom module for the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mock firebase signInWithEmailAndPassword function
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock the getDoc and doc functions from firebase
jest.mock('../firebase.js', () => ({
  auth: {},
  db: {},
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Login component', () => {
  test('renders email and password inputs', () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  test('submits the form with valid email and password', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(getByText('Login'));

    // Simulate a successful login
    await waitFor(() => {
      expect(getByText('Login Successful!')).toBeInTheDocument();
    });
  });

  test('handles login failure', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(getByText('Login'));

    // Simulate a failed login
    await waitFor(() => {
      expect(getByText('Invalid or Missing Credentials')).toBeInTheDocument();
    });
  });

  // Add more test cases for other scenarios if needed
});
