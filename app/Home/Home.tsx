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
import Modal from '../core/components/Modal';


const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { characters, setCharacters, toggleFavorite } = useCharacterStore();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null); 



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
       requestCharacter(searchTerm, (results) => {
        setCharacters(results);
      }	);
    } else {
      fetchData();
    }

  
  };
  
  const requestCharacter = async (
    term: string,
    onSuccess: (results: any) => void
  ) => {
    setLoading(true);
    try {
      const { results } = await httpApi.getByParams<any>('character', { name: term });
      onSuccess(results); 
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCardClick = async (name: string) => {
    requestCharacter(name, (results) => {
    
      setSelectedCharacter(results[0]); 
      setIsModalOpen(true); 
    });
  }


  function closeModal(): void {
    setIsModalOpen(false);
    setSelectedCharacter(null); 
  }

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
          <CardList data={characters} toggleFavorite={handleToggleFavorite}  onCardClick={handleCardClick} />
        )}

     {/* Modal para exibir os detalhes do personagem */}
     {isModalOpen && selectedCharacter && (
          <Modal onClose={closeModal}>
            <div>
              <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
              <p>Species: {selectedCharacter.species}</p>
              <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            </div>
          </Modal>
        )}

      </div>
    </>
  );

};

export default Home;
