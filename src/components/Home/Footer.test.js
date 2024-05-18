import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
  test('renders footer text correctly', () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText(/N-Plusses 2024/i); // Case-insensitive match
    expect(footerText).toBeInTheDocument();
  });
});
