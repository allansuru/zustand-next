import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { Character } from '../interfaces/character';



interface CharacterState {
    characters: Character[];
    setCharacters: (characters: Character[]) => void;
    addCharacter: (character: Character) => void;
    removeCharacter: (id: number) => void;
    toggleFavorite: (characterId: number) => void;
}

export const useCharacterStore = create<CharacterState>()(
    devtools((set) => ({
        characters: [],
        setCharacters: (characters) =>
            set({
              characters: characters.map((character) => ({
                ...character,
                isFavorite: false, 
              })),
            }),
        addCharacter: (character) =>
            set((state) => ({ characters: [...state.characters, character] })),
        removeCharacter: (id) =>
            set((state) => ({
                characters: state.characters.filter((character) => character.id !== id),
            })),
        toggleFavorite: (characterId) =>
            set((state) => ({
                characters: state.characters.map((character) =>
                    character.id === characterId
                        ? { ...character, isFavorite: !character.isFavorite }
                        : character
                ),
            })),
    }), { name: 'CharacterStore' })
);
