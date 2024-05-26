import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header'; // Adjust the import according to your file structure
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('should render header correctly', () => {
  const { getByAltText, getByTestId } = render(
    <Router>
      <Header />
    </Router>
  );

  const logo = getByAltText("Malume'z Logo");
  expect(logo).toBeInTheDocument();

  const uploadIcon = getByTestId('upload-icon');
  expect(uploadIcon).toBeInTheDocument();

  const bellIcon = getByTestId('bell-icon');
  expect(bellIcon).toBeInTheDocument();
});

test('should navigate to home page when logo is clicked', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByAltText } = render(
    <Router>
      <Header />
    </Router>
  );

  const logo = getByAltText("Malume'z Logo");
  fireEvent.click(logo);
  expect(navigate).toHaveBeenCalledWith('/');
});

test('should navigate to upload page when upload icon is clicked', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByTestId } = render(
    <Router>
      <Header />
    </Router>
  );

  const uploadIcon = getByTestId('upload-icon');
  fireEvent.click(uploadIcon);
  expect(navigate).toHaveBeenCalledWith('/uploadImg');
});

test('should navigate to notifications page when bell icon is clicked', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByTestId } = render(
    <Router>
      <Header />
    </Router>
  );

  const bellIcon = getByTestId('bell-icon');
  fireEvent.click(bellIcon);
  expect(navigate).toHaveBeenCalledWith('/notifications');
});

test('should navigate to login or dashboard page when user icon is clicked', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByTestId } = render(
    <Router>
      <Header user={null} />
    </Router>
  );

  const userIcon = getByTestId('user-icon');
  fireEvent.click(userIcon);
  expect(navigate).toHaveBeenCalledWith('/login');
});

test('should navigate to dashboard page when user icon is clicked and user is logged in', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByTestId } = render(
    <Router>
      <Header user={{ uid: 'test-user' }} />
    </Router>
  );

  const userIcon = getByTestId('user-icon');
  fireEvent.click(userIcon);
  expect(navigate).toHaveBeenCalledWith('/dashboard');
});
