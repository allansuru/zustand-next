'use client';

import React, { useEffect, useState } from 'react';
import { httpApi } from '../core/services/http-api';
import { Character } from '../core/interfaces/character';




const Home: React.FC = () => {
  const [data, setData] = useState<Character[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const result = await httpApi.getById<Character[]>('character', 1);
   
        setData(result || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default Home;
