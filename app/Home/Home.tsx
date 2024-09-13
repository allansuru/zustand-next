'use client';

import React, { useEffect, useState } from 'react';
import { httpApi } from '../core/services/http-api';
import { Character } from './shared/interfaces/character';
import { useCharacterStore } from './shared/store/characterStore';
import { ApiResponse } from '../core/interfaces/api-response';
import Loading from '../core/components/Loading';
import CardList from './Home-Cards';
import HomeSearch from './Home-Search';
import Navbar from '../core/components/Navbar';


const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { characters, setCharacters, toggleFavorite } = useCharacterStore();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpApi.get<ApiResponse<Character>>('character');
      const results = response?.results || [];
      setCharacters(results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!characters || characters.length === 0) {
      fetchData();
    } else {
      setLoading(false)
    }

 
  }, [setCharacters]);

  const handleToggleFavorite = (characterId: number) => {
    toggleFavorite(characterId);
  };

  const handleSearchInputChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearchClick = async () => {
    if (searchTerm.trim()) {

      setLoading(true);
      try {
        const { results } = await httpApi.getByParams<any>('character', { name: searchTerm });
        setCharacters(results);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      } finally {
        setLoading(false);
      }
    } else {
      fetchData();
    }

  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="pt-2">
          <HomeSearch
            onSearchInputChange={handleSearchInputChange}
            onSearchClick={handleSearchClick}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <CardList data={characters} toggleFavorite={handleToggleFavorite} />
        )}
      </div>
    </>
  );

};

export default Home;
