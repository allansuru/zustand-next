'use client';

import React, { useEffect, useState } from 'react';
import { httpApi } from '../core/services/http-api';
import { Character } from './shared/interfaces/character';
import { useCharacterStore } from './shared/store/characterStore';
import { ApiResponse } from '../core/interfaces/api-response';
import Loading from '../core/components/Loading';
import CardList from './Home-Cards';


const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { characters, setCharacters, toggleFavorite } = useCharacterStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await httpApi.get<ApiResponse<Character>>('character');
        const results = response?.results || [];
        setCharacters(results || []);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setCharacters]);

  const handleToggleFavorite = (characterId: number) => {
    toggleFavorite(characterId);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Character List</h1>
      {loading ? (
        <Loading />
      ) : (
        <CardList data={characters} toggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );

};

export default Home;
