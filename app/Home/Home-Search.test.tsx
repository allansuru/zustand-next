import { useCharacterStore } from './shared/store/characterStore';import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeSearch from './Home-Search'; 

describe('HomeSearch Component', () => {
  const mockOnSearchInputChange = jest.fn();
  const mockOnSearchClick = jest.fn();

  beforeEach(() => {
    render(
      <HomeSearch
        onSearchInputChange={mockOnSearchInputChange}
        onSearchClick={mockOnSearchClick}
      />
    );
  });

//   it('should render the search input and button', () => {
//     const searchInput = screen.getByPlaceholderText('Pesquisar personagem');
//     const searchButton = screen.getByText('Pesquisar');

//     expect(searchInput).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//   });

//   it('should call onSearchInputChange with the input value after debounce', async () => {
//     const searchInput = screen.getByPlaceholderText(
//       'Pesquisar personagem'
//     ) as HTMLInputElement;

//     fireEvent.change(searchInput, { target: { value: 'Rick' } });

//     // Aguarde o debounce (ajuste o tempo se necessário)
//     await new Promise((resolve) => setTimeout(resolve, 600));

//     expect(mockOnSearchInputChange).toHaveBeenCalledWith('Rick');
//   });

  it('should call onSearchClick when the search button is clicked', () => {
    const searchButton = screen.getByText('Pesquisar');

    fireEvent.click(searchButton);

    expect(mockOnSearchClick).toHaveBeenCalled();
  });
});

