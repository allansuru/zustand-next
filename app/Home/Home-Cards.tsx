// components/CardList.tsx
import React from 'react';
import { Character } from './shared/interfaces/character';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Ícone de coração sólido

interface CardListProps {
    data: Character[];
    toggleFavorite: (characterId: number) => void;
}

const CardList: React.FC<CardListProps> = ({ data, toggleFavorite }) => {
    return (
        <div className="flex flex-wrap justify-start">
            {data && data.length > 0 ? (
                data.map((character) => (
                    <div key={character.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative">
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 p-2 rounded-full focus:outline-none"
                                    onClick={() => toggleFavorite(character.id)} 
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={`text-2xl ${character.isFavorite ? 'text-red-600' : 'text-gray-400'
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{character.name}</h2>
                                <p className="text-gray-600">{character.species}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full text-center py-10">
                    <h1 className="text-2xl font-bold">Nada foi encontrado!</h1>
                    <h2 className="text-lg">Tente realizar uma nova busca</h2>
                </div>
            )}
        </div>
    );
};

export default CardList;
