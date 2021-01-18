import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

describe('Testando o arquivo Pokedex.js', () => {
  it('Titulo na tela "Encountered Pokémon"', () => {
    const { container } = renderWithRouter(<App />);
    const title = container.querySelector('h2')
    // const title = screen.getByRole('heading', { name: /Encountered pokémons/ });
    // expect(title.tagName).toBe('H2');
    expect(title).toHaveTextContent(/Encountered pokémons/i)
  });
  it('Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/ });
    fireEvent.click(nextPokemonBtn);
    const pikachu = screen.queryByText(/Pikachu/);
    expect(pikachu).not.toBeInTheDocument();
    const charmander = screen.getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
    expect(pokemon[0]).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(buttons.length).toBe(seven);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeEnabled();
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const poisonBtn = screen.getByRole('button', { name: /Poison/ });
    fireEvent.click(poisonBtn);
    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(nextPokemonBtn).toBeDisabled();
    const allBtn = screen.getByRole('button', { name: /All/ });
    fireEvent.click(allBtn);
    expect(nextPokemonBtn).toBeEnabled();
  });
  it('Teste se é criado, dinamicamente, um botão de filtro', () => {
    pokemons[0].type = 'Dinamic button';
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const testButton = screen.getByRole('button', { name: /Dinamic button/ });
    expect(testButton).toBeEnabled();
  });
  it('O botão de Próximo pokémon deve ser desabilitado', () => {
    renderWithRouter(<App />);
    const bugButton = screen.getByRole('button', { name: /Bug/ });
    fireEvent.click(bugButton);
    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(nextPokemonBtn).toBeDisabled();
  });
});
