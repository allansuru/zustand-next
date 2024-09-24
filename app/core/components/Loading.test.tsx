import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'

import Loading from './Loading';

describe('Loading Component', () => {
  test('renders loading message', () => {
    render(<Loading />);
    const loadingMessage = screen.getByText(/Carregando.../i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
