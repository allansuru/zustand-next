import React, { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

interface HomeSearchProps {
  onSearchInputChange: (query: string) => void; 
  onSearchClick: () => void; 
}

const HomeSearch: React.FC<HomeSearchProps> = ({ onSearchInputChange, onSearchClick }) => {
  useEffect(() => {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    const search$ = fromEvent(searchInput, 'input').pipe(
      map((event: Event) => (event.target as HTMLInputElement).value),
      debounceTime(500)
    );

    const subscription = search$.subscribe((term) => {
      onSearchInputChange(term); 
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onSearchInputChange]);

  return (
    <div className="flex justify-center items-center space-x-4">
      <input
        id="search-input"
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Pesquisar personagem"
      />
      <button
        onClick={onSearchClick}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
      >
        Pesquisar
      </button>
    </div>
  );
};

export default HomeSearch;
