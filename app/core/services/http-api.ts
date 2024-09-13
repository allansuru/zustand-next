import axios from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const handleError = (error: any): Promise<never> => {

  const message: string = error.response?.data?.message || 'An error occurred';
  toast.error(message);
  return Promise.reject(error);
};

const get = async <T>(endPointUrl: string, payload: Record<string, any> = {}): Promise<T | undefined> => {
  const params = queryString.stringify(payload, { skipNull: true });

  
  try {

    const response = await axios.get<T>(`${baseURL}/${endPointUrl}`, {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getByParams = async <T>(endPointUrl: string, payload: Record<string, any> = {}): Promise<T | undefined> => {
  const params = queryString.stringify(payload, { skipNull: true });

  const url = `${baseURL}/${endPointUrl}/?${params}`

  try {

    const response = await axios.get<T>(`${url}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getById = async <T>(endPointUrl: string, id: number): Promise<T | undefined> => {


  try {

    const response = await axios.get<T>(`${baseURL}/${endPointUrl}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const httpApi = {
  get,
  getById,
  getByParams
};
