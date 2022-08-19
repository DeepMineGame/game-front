import React from 'react';
import { screen, render } from '@testing-library/react';

test('renders div', () => {
    render(<div>Loading...</div>);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
});
