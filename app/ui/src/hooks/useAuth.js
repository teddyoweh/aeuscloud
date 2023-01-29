import { AppContext } from '../context/appContext';
import { useContext } from 'react';

export const useAuth = () => {
  const { auth, setAuth } = useContext(AppContext);
  return { auth, setAuth };
};
