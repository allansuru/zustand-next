'use client';

import React, { useEffect } from 'react';
import { httpApi } from '../core/services/http-api';
import { Character } from './shared/interfaces/character';
import { useCharacterStore } from './shared/store/characterStore';
import { ApiResponse } from '../core/interfaces/api-response';




const Home: React.FC = () => {
  const { characters, setCharacters } = useCharacterStore();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await httpApi.get<ApiResponse<Character>>('character');
        const results = response?.results || [];
        setCharacters(results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setCharacters]);

  return (
    <div>
      <h1>Character List</h1>
      {characters && characters.length === 0 ? (
        <p>No characters found</p>
      ) : (
        <ul>
          {characters?.map((character) => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default Home;
