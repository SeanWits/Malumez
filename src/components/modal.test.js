import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Modal from './modal';
import { deleteDoc, getDocs } from 'firebase/firestore'; // Ensure deleteDoc and getDocs are imported for mocking

// Mock the firebase functions
jest.mock('firebase/firestore', () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn(() => ({ id: '123' })),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

// Mock the firebase configuration
jest.mock('../firebase', () => ({
  db: {},
}));

describe('Modal component', () => {
  beforeEach(() => {
    getDocs.mockResolvedValue({
      empty: false,
      docs: [{ ref: { id: '123' } }]
    });
  });

  test('renders name, email, and role correctly', () => {
    const closeModal = jest.fn();
    const email = 'test@example.com';
    const name = 'Test User';
    const role = 'User';
    const initialRole = 'Admin';
    const { getByText } = render(
      <Modal closeModal={closeModal} email={email} name={name} role={role} initialRole={initialRole} />
    );

    expect(getByText(/Name: Test User/)).toBeInTheDocument();
    expect(getByText(/Email: test@example.com/)).toBeInTheDocument();
    expect(getByText(/Role: User/)).toBeInTheDocument();
  });

  test('calls deleteUser function when delete button is clicked', async () => {
    const closeModal = jest.fn();
    const email = 'test@example.com';
    const name = 'Test User';
    const role = 'User';
    const initialRole = 'Admin';
    const { getByText } = render(
      <Modal closeModal={closeModal} email={email} name={name} role={role} initialRole={initialRole} />
    );

    fireEvent.click(getByText('Delete'));

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ id: '123' }));
    });
  });
});
