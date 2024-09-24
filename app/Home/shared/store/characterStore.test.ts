import {
    renderHook
} from '@testing-library/react-hooks';
import { act } from 'react';


import { Character } from '../interfaces/character';
import { useCharacterStore } from './characterStore';

describe('useCharacterStore', () => {
    it('should initialize with an empty characters array', () => {
        const { result } = renderHook(() => useCharacterStore());
        expect(result.current.characters).toEqual([]);
    });

    xit('should set characters', () => {
        const { result } = renderHook(() => useCharacterStore());
        const characters: Character[] = [{
            id: 1,
            name: 'Character 1',
            isFavorite: false,
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'url-to-image'
        }];

        act(() => {
            result.current.setCharacters(characters);
        });

        expect(result.current.characters).toEqual(characters);
    });

    xit('should add a character', () => {
        const { result } = renderHook(() => useCharacterStore());
        const character: Character = {
            id: 1,
            name: 'Character 1',
            isFavorite: false,
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'url-to-image'
        };

        act(() => {
            result.current.addCharacter(character);
        });

        expect(result.current.characters).toEqual([character]);
    });

    xit('should remove a character', () => {
        const { result } = renderHook(() => useCharacterStore());
        const character: Character = {
            id: 1,
            name: 'Character 1',
            isFavorite: false,
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'url-to-image'
        };

        act(() => {
            result.current.addCharacter(character);
        });

        act(() => {
            result.current.removeCharacter(1);
        });

        expect(result.current.characters).toEqual([]);
    });

    xit('should toggle favorite status of a character', () => {
        const { result } = renderHook(() => useCharacterStore());
        const character: Character = {
            id: 1,
            name: 'Character 1',
            isFavorite: false,
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'url-to-image'
        };

        act(() => {
            result.current.addCharacter(character);
        });

        act(() => {
            result.current.toggleFavorite(1);
        });

        expect(result.current.characters[0].isFavorite).toBe(true);

        act(() => {
            result.current.toggleFavorite(1);
        });

        expect(result.current.characters[0].isFavorite).toBe(false);
    });
});
