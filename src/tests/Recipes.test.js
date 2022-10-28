import React from 'react';
/* import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; */
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

describe('Testando App de Receitas', () => {
  it('filtro de tela de recipes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const beefBtn = getByTestId('Beef-category-filter');
    const breakfastBtn = getByTestId('Breakfast-category-filter');
    const chickenBtn = getByTestId('Chicken-category-filter');
    const dessertBtn = getByTestId('Dessert-category-filte');
    const goatBtn = getByTestId('Goat-category-filter');

    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
  });
});
