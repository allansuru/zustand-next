
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <h2 className="text-xl font-bold mr-4">Carregando...</h2>
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"></div>
    </div>
  );
};

export default Loading;
