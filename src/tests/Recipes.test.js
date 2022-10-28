import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, act } from '@testing-library/react';
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
    userEvent.click(beefBtn);
    const mustardPie = getByTestId('0-card-name');
    expect(mustardPie).toBeInTheDocument();
    userEvent.click(breakfastBtn);
    const breakPotatos = screen.getByRole('heading', { name: /breakfast potatoes/i });
    expect(breakPotatos).toBeInTheDocument();
    userEvent.click(chickenBtn);
    const chicken = screen.getByRole('heading', { name: /ayam percik/i });
    expect(chicken).toBeInTheDocument();
    userEvent.click(dessertBtn);
    const apam = screen.getByRole('heading', { name: /apam balik/i });
    expect(apam).toBeInTheDocument();
    userEvent.click(goatBtn);
    const goat = screen.getByRole('heading', { name: /mbuzi choma \(roasted goat\)/i });
    expect(goat).toBeInTheDocument();
    userEvent.click(all);
    const soup = screen.getByRole('heading', { name: /corba/i });
    expect(soup).toBeInTheDocument();
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
