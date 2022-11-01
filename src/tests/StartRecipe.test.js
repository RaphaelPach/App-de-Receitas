import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

describe('Testando StartRecipes', () => {
  it('filtro de tela de StartRecipes', async () => {
    renderWithRouter(<App />);
    const textbtn = screen.getByText('Start recipe');
    expect(textbtn).toBeInTheDocument();
    const btn = screen.getByTestId('start-recipe-btn');
    expect(btn).toBeInTheDocument();
  });
});
