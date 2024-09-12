
import { Character } from '@/app/Home/shared/interfaces/character';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'



interface CharacterState {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
}

export const useCharacterStore = create<CharacterState>()(
    devtools((set) => ({
      characters: [],
      setCharacters: (characters) => set({ characters }),
      addCharacter: (character) =>
        set((state) => ({ characters: [...state.characters, character] })),
      removeCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((character) => character.id !== id),
        })),
    }), { name: 'CharacterStore' }) 
  );
