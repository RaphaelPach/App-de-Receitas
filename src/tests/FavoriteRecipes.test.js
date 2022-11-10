import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

const storageMock = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
];

describe('Testando App de Receitas', () => {
  it('testando tela de favorites recipies', async () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(storageMock));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const text = screen.getByTestId('page-title');
    expect(text).toBeInTheDocument();
    const btnMeal = screen.getByTestId('filter-by-meal-btn');
    expect(btnMeal).toBeInTheDocument();
    userEvent.click(btnMeal);
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnShare);
    const btnFavorite = screen.getByTestId('1-horizontal-share-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    const textLink = await screen.findByText('Link copied!');
    expect(textLink).toBeInTheDocument();
    const fechar = await screen.findByTestId('button-fechar');
    userEvent.click(fechar);
  });
});
