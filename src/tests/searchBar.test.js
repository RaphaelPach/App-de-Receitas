/* import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

const iconSearch = 'search-top-btn';
const searchInputBox = 'search-input';
const ingredientBtnStr = 'ingredient-search-radio';
const nameRadioStr = 'name-search-radio';
const firstLetterStr = 'first-letter-search-radio';
const searchBtnStr = 'exec-search-btn';
describe('Testando SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  it('Testando elementos na tela de meals', async () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const searchInput = screen.getByTestId(searchInputBox);
    const nameRadio = screen.getByTestId(nameRadioStr);
    const ingredientRadio = screen.getByTestId(ingredientBtnStr);
    const firstLetterRadio = screen.getByTestId(firstLetterStr);
    const searchBtn = screen.getByTestId(searchBtnStr);
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(iconSearchBtn);
    expect(searchInput).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });
  it('testa api para ingredientes', async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(chickenMeals),
    // }));
    renderWithRouter(<App />, ['/meals']);
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'chicken congee');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
    const searchChickens = await screen.findAllByText(/chicken/i);
    expect(searchChickens.length).toBe(1);
  });
  it('testa global alert para comidas', async () => {
    renderWithRouter(<App />, ['/meals']);
    global.alert = jest.fn().mockReturnValue('xablau');
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(chickenMeals),
    // }));
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const firstLetterRadio = screen.getByTestId(firstLetterStr);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'ff');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
    expect(global.alert()).toBe('xablau');
  });
  it('testa global alert para comidas', async () => {
    renderWithRouter(<App />, ['/drinks']);
    global.alert = jest.fn().mockReturnValue('xablau');
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const firstLetterRadio = screen.getByTestId(firstLetterStr);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'ff');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
    expect(global.alert()).toBe('xablau');
  });
  it('testa chamada API quando encontra somente uma comida', async () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const nameRadio = screen.getByTestId(nameRadioStr);
    userEvent.click(nameRadio);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'corba');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977');
    });
  });
  it('Testando elementos da tela de Drinks', () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const searchInput = screen.getByTestId(searchInputBox);
    const nameRadio = screen.getByTestId(nameRadioStr);
    const ingredientRadio = screen.getByTestId(ingredientBtnStr);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    userEvent.click(iconSearchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('testa chamada API para ingrediente de bebidas', async () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const igredientRadio = screen.getByTestId(ingredientBtnStr);
    userEvent.click(igredientRadio);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'rum');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
    const searchRum = await screen.findAllByText(/rum/i);
    expect(searchRum.length).toBe(1);
  });
  it('testa chamada API para nome em drinks', async () => {
    renderWithRouter(<App />, ['/drinks']);
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const ingredientRadio = screen.getByTestId(nameRadioStr);
    userEvent.click(ingredientRadio);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'gin');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
  });
  it('testa chamada API quando encontra somente uma comida', async () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    const iconSearchBtn = screen.getByTestId(iconSearch);
    userEvent.click(iconSearchBtn);
    const nameRadio = screen.getByTestId(nameRadioStr);
    userEvent.click(nameRadio);
    const searchInput = screen.getByTestId(searchInputBox);
    userEvent.type(searchInput, 'A1');
    const searchBtn = screen.getByTestId(searchBtnStr);
    userEvent.click(searchBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/17222');
    });
  });
});
 */
