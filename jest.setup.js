import '@testing-library/jest-dom';
import React from 'react';

jest.mock('src/pages/admin', () => () => <div>Admin</div>); // Mock the admin module

beforeEach(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

afterEach(() => {
  const root = document.getElementById('root');
  if (root) {
    document.body.removeChild(root);
  }
});
