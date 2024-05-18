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
  const { getByAltText, getByRole } = render(
    <Router>
      <Header />
    </Router>
  );

  const logo = getByAltText("Malume'z Logo");
  expect(logo).toBeInTheDocument();

  const uploadIcon = getByRole('button', { name: /upload/i });
  expect(uploadIcon).toBeInTheDocument();

  const bellIcon = getByRole('button', { name: /bell/i });
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

  const { getByRole } = render(
    <Router>
      <Header />
    </Router>
  );

  const uploadIcon = getByRole('button', { name: /upload/i });
  fireEvent.click(uploadIcon);
  expect(navigate).toHaveBeenCalledWith('/uploadImg');
});

test('should navigate to login page when bell icon is clicked', () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

  const { getByRole } = render(
    <Router>
      <Header />
    </Router>
  );

  const bellIcon = getByRole('button', { name: /bell/i });
  fireEvent.click(bellIcon);
  expect(navigate).toHaveBeenCalledWith('/login');
});
