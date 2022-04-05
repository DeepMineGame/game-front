import React from 'react';
import { screen, render } from '@testing-library/react';
import App from '..';

console.log(123)
test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
});
