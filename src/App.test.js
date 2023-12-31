import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App component renders', () => {
    render(<App />);

});
jest.mock('react-slick', () => ({
    // Mock the Slider and other components you use from react-slick
    Slider: ({ children }) => <div>{children}</div>,
    // Add other components as needed
}));