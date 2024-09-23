import React from 'react';
import Navbar from '../core/components/Navbar';
import CardList from '../Home/Home-Cards';
import { useCharacterStore } from '../Home/shared/store/characterStore';

const Favorites: React.FC = () => {
  const { characters, toggleFavorite } = useCharacterStore();

  // Filtrar apenas os personagens favoritos
  const favoriteCharacters = characters.filter(character => character.isFavorite);

  return (
    <>
      <Navbar /> {/* Adiciona o Navbar */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Meus Favoritos</h1>

        {favoriteCharacters.length > 0 ? (
          <CardList data={favoriteCharacters} toggleFavorite={toggleFavorite} onCardClick={() => { }} // Mock implementation
          />
        ) : (
          <p className="text-gray-500">Nenhum personagem favoritado ainda.</p>
        )}
      </div>
    </>
  );
};

export default Favorites;
