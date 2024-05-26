import '@testing-library/jest-dom'

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
