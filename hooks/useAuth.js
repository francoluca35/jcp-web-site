import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Cambiar a true inicialmente
  const [error, setError] = useState(null);

  // Verificar si hay un usuario logueado al cargar la página
  useEffect(() => {
    const checkStoredUser = () => {
      const storedUser = localStorage.getItem('jcp_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
      }
      setLoading(false);
    };

    checkStoredUser();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);


      // Buscar usuario en Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar si encontramos el usuario
      let userFound = null;
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        
        if (userData.password === password) {
          userFound = {
            id: doc.id,
            email: userData.email,
            usuario: userData.user,
            password: userData.password
          };
        } else {
        }
      });

      if (!userFound) {
        throw new Error('Contraseña incorrecta');
      }

      // Guardar usuario en localStorage
      localStorage.setItem('jcp_user', JSON.stringify(userFound));
      setUser(userFound);
      
      return userFound;
    } catch (error) {
      console.error('🚨 Error en login:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      localStorage.removeItem('jcp_user');
      setUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
}
