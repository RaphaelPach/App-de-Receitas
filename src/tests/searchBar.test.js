import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinks from '../../cypress/mocks/drinks';
import drinkIngredients from '../../cypress/mocks/drinksByIngredient';

describe('Testando SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  it('Testando elementos na tela de meals', async () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(iconSearchBtn);
    expect(searchInput).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });
  it('testa chamada API para ingrediente de comidas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredient),
    }));
    const THREE = 3;
    const { history } = renderWithRouter(<App />, ['/meals']);
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const igredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(igredientRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'chicken');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalledTimes(THREE);
  });
  it('testa chamada API para nome', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredient),
    }));
    const THREE = 3;
    const { history } = renderWithRouter(<App />, ['/meals']);
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'chicken');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalledTimes(THREE);
  });
  it('testa api primeira letra', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    const { history } = renderWithRouter(<App />, ['/meals']);
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'p');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=p');
  });
  it('testa chamada API quando encontra somente uma comida', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredient),
    }));
    const { history } = renderWithRouter(<App />, ['/meals']);
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Chicken Congee');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52956');
    });
  });
  it('Testando elementos da tela de Drinks', () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    userEvent.click(iconSearchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('testa chamada API para ingrediente de bebidas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    const { history } = renderWithRouter(<App />, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const igredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(igredientRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'mint');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalled();
  });
  it('testa chamada API para nome em drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkIngredients),
    }));
    renderWithRouter(<App />, ['/drinks']);
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const ingredientRadio = screen.getByTestId('name-search-radio');
    userEvent.click(ingredientRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'gin');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalled();
  });
});
