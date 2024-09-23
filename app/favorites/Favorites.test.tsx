import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { useCharacterStore } from '../Home/shared/store/characterStore';
import Favorites from './Favorites';


jest.mock('../Home/shared/store/characterStore');

const mockUseCharacterStore = useCharacterStore as jest.MockedFunction<typeof useCharacterStore>;

describe('Favorites Component', () => {
    beforeEach(() => {
        mockUseCharacterStore.mockReturnValue({
          characters: [
            { id: 1, name: 'Character 1', isFavorite: true },
            { id: 2, name: 'Character 2', isFavorite: false },
            { id: 3, name: 'Character 3', isFavorite: true },
          ],
          toggleFavorite: jest.fn(),
        });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      test('renders Navbar component', () => {
        render(<Favorites />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });

      test('renders favorite characters', () => {
        render(<Favorites />);
        expect(screen.getByText('Meus Favoritos')).toBeInTheDocument();
        expect(screen.getByText('Character 1')).toBeInTheDocument();
        expect(screen.getByText('Character 3')).toBeInTheDocument();
      });

      test('shows message when no favorite characters', () => {
        mockUseCharacterStore.mockReturnValueOnce({
          characters: [],
          toggleFavorite: jest.fn(),
        });
    
        render(<Favorites />);
        expect(screen.getByText('Nenhum personagem favoritado ainda.')).toBeInTheDocument();
      });
    

})