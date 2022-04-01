import React from 'react';
import { screen, render } from '@testing-library/react';
import App from '..';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
});
