import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StoreImageTextFirebase from './uploadImg';

// Mock the react-router-dom module for the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mock firebase functions and modules
jest.mock('../firebase', () => ({
  auth: { currentUser: { uid: 'testUserId' } },
  db: {
    collection: jest.fn().mockReturnThis(),
    addDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
  },
  imgDB: {},
}));

// Mock Firebase Storage functions
jest.mock('firebase/storage', () => ({
  getDownloadURL: jest.fn(() => Promise.resolve('mockedDownloadUrl')),
  ref: jest.fn(),
  uploadBytes: jest.fn(() => Promise.resolve({ ref: 'mockedRef' })),
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mockedObjectUrl');

describe('StoreImageTextFirebase component', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<StoreImageTextFirebase />);
    expect(getByLabelText('Name:')).toBeInTheDocument();
    expect(getByLabelText('Price (R):')).toBeInTheDocument();
    expect(getByLabelText('Stock:')).toBeInTheDocument();
    expect(getByLabelText('Category:')).toBeInTheDocument();
    expect(getByLabelText('Brand:')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

//   test('submits form with valid input', async () => {
//     const { getByLabelText, getByText } = render(<StoreImageTextFirebase />);

//     // Fill in form fields
//     fireEvent.change(getByLabelText('Name:'), { target: { value: 'Test Product' } });
//     fireEvent.change(getByLabelText('Price (R):'), { target: { value: '10' } });
//     fireEvent.change(getByLabelText('Stock:'), { target: { value: '100' } });
//     fireEvent.change(getByLabelText('Category:'), { target: { value: 'Beverages' } });
//     fireEvent.change(getByLabelText('Brand:'), { target: { value: 'Coca-Cola' } });

//     // Mock image upload
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       ok: true,
//       json: async () => ({}),
//     });

//     fireEvent.click(getByText('Submit'));

//     await waitFor(() => {
//       expect(require('../firebase').db.collection).toHaveBeenCalledWith(expect.any(String));
//       expect(require('../firebase').db.addDoc).toHaveBeenCalledWith({
//         name: 'Test Product',
//         price: 10,
//         stock: 100,
//         category: 'Beverages',
//         brand: 'Coca-Cola',
//         src: 'mockedDownloadUrl',
//         product_id: '',
//       });
//     });
//   });
});
