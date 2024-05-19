import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './signUp';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mock firebase createUserWithEmailAndPassword function
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: { uid: 'test-uid', email: 'john@example.com' }
  }),
}));

// Mock setDoc function inline within jest.mock()
jest.mock('../firebase.js', () => {
  const setDoc = jest.fn(); // Mock the setDoc function
  return {
    auth: {},
    db: {},
    setDoc: setDoc,
    doc: jest.fn(),
  };
});

beforeAll(() => {
  window.alert = jest.fn();
});

describe('SignUp component', () => {
  test('renders all required input fields', () => {
    const { getByLabelText } = render(<SignUp />);
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Surname')).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    const { getByLabelText, getByTestId } = render(<SignUp />);
    const nameInput = getByLabelText('Name');
    const surnameInput = getByLabelText('Surname');
    const usernameInput = getByLabelText('Username');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const signUpButton = getByTestId('signUpButton');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(signUpButton);

    // Simulate a successful registration
    await waitFor(() => {
      // Check if createUserWithEmailAndPassword is called with correct arguments
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'john@example.com', 'password');
    });
  });
});
