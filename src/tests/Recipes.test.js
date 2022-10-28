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
    const all = getByTestId('All-category-filter');

    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
  it('cobrir 90%', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const ordinaryBtn = getByTestId('Ordinary Drink-category-filter');
    const cocktail = getByTestId('Cocktail-category-filter');
    const shake = getByTestId('Shake-category-filter');
    const unknown = getByTestId('Other/Unknown-category-filter');
    const cocoa = getByTestId('Cocoa-category-filter');
    const all = getByTestId('All-category-filter');

    expect(ordinaryBtn).toBeInTheDocument();
    expect(cocktail).toBeInTheDocument();
    expect(shake).toBeInTheDocument();
    expect(unknown).toBeInTheDocument();
    expect(cocoa).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
});
