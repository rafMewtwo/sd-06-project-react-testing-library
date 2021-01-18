import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as info', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    const pokemonImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<App />);
    // name por que tem muitos links
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });
  it('Teste se ao clicar no link de navegação do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    fireEvent.click(screen.getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const checkfavorite = screen.getByRole('checkbox');
    fireEvent.click(checkfavorite);
    expect(checkfavorite.checked).toEqual(true);
    const pokemonImage = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(pokemonImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
