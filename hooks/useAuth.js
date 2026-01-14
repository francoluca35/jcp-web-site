import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Cambiar a true inicialmente
  const [error, setError] = useState(null);

  // Verificar si hay un usuario logueado al cargar la página
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userName = user.email ? user.email.split('@')[0] : '';

        if (db && user.email) {
          try {
            const usersRef = collection(db, 'users');
            const emailQuery = query(usersRef, where('email', '==', user.email));
            const emailSnap = await getDocs(emailQuery);
            if (!emailSnap.empty) {
              const userData = emailSnap.docs[0].data();
              userName = userData?.userName || userName;
            }
          } catch (error) {
            console.error('🚨 Error obteniendo userName:', error);
          }
        }

        setUser({
          id: user.uid,
          email: user.email,
          usuario: userName
        });
      } else {
        if (typeof window !== 'undefined') {
          const storedUser = window.localStorage.getItem('jcp_admin_user');
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (error) {
              window.localStorage.removeItem('jcp_admin_user');
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      // Usar Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      let userName = user.email ? user.email.split('@')[0] : '';

      if (db && user.email) {
        try {
          const usersRef = collection(db, 'users');
          const emailQuery = query(usersRef, where('email', '==', user.email));
          const emailSnap = await getDocs(emailQuery);
          if (!emailSnap.empty) {
            const userDocData = emailSnap.docs[0].data();
            userName = userDocData?.userName || userName;
          }
        } catch (error) {
          console.error('🚨 Error obteniendo userName:', error);
        }
      }

      const userData = {
        id: user.uid,
        email: user.email,
        usuario: userName
      };
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('🚨 Error en login:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithUsername = async (username, password) => {
    try {
      setError(null);
      setLoading(true);

      if (!db) {
        throw new Error('No se pudo conectar con la base de datos.');
      }

      const normalizedUser = (username || '').trim();
      if (!normalizedUser || !password) {
        throw new Error('Usuario y contraseña requeridos');
      }

      const usersRef = collection(db, 'users');
      const normalizedLower = normalizedUser.toLowerCase();

      let userDoc = null;
      const usernameQuery = query(usersRef, where('username', '==', normalizedUser));
      const usernameSnap = await getDocs(usernameQuery);
      if (!usernameSnap.empty) {
        userDoc = usernameSnap.docs[0];
      }

      if (!userDoc) {
        const allUsersSnap = await getDocs(usersRef);
        userDoc = allUsersSnap.docs.find((docItem) => {
          const data = docItem.data();
          const usernameValue = (data?.username || '').toLowerCase();
          const userNameValue = (data?.userName || '').toLowerCase();
          const usuarioValue = (data?.usuario || '').toLowerCase();
          return usernameValue === normalizedLower || userNameValue === normalizedLower || usuarioValue === normalizedLower;
        }) || null;
      }

      if (!userDoc) {
        throw new Error('Usuario no encontrado');
      }

      const userData = userDoc.data();
      const storedPassword = userData?.password;

      if (!storedPassword || storedPassword !== password) {
        throw new Error('Credenciales inválidas');
      }

      const sessionUser = {
        id: userDoc.id,
        email: userData?.email || '',
        usuario: userData?.username || userData?.userName || userData?.usuario || userDoc.id
      };

      setUser(sessionUser);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('jcp_admin_user', JSON.stringify(sessionUser));
      }

      return sessionUser;
    } catch (error) {
      console.error('🚨 Error en loginWithUsername:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async ({ username, email, password }) => {
    try {
      setError(null);
      setLoading(true);

      if (!db) {
        throw new Error('No se pudo conectar con la base de datos.');
      }

      const normalizedUser = (username || '').trim();
      const normalizedEmail = (email || '').trim();

      if (!normalizedUser || !normalizedEmail || !password) {
        throw new Error('Usuario, email y contraseña requeridos');
      }

      let authCreated = false;
      try {
        // Crear usuario en Firebase Auth
        await createUserWithEmailAndPassword(auth, normalizedEmail, password);
        authCreated = true;
      } catch (error) {
        if (error?.code !== 'auth/email-already-in-use') {
          throw error;
        }
      }

      // Crear/actualizar documento en Firestore
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', normalizedEmail));
      const emailSnap = await getDocs(emailQuery);
      const userDoc = emailSnap.empty ? doc(usersRef) : emailSnap.docs[0].ref;

      await setDoc(userDoc, {
        username: normalizedUser,
        userName: normalizedUser,
        usuario: normalizedUser,
        email: normalizedEmail,
        password
      }, { merge: true });

      const sessionUser = {
        id: userDoc.id,
        email: normalizedEmail,
        usuario: normalizedUser
      };

      setUser(sessionUser);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('jcp_admin_user', JSON.stringify(sessionUser));
      }

      return sessionUser;
    } catch (error) {
      console.error('🚨 Error en createUser:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('jcp_admin_user');
      }
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
    loginWithUsername,
    createUser,
    logout
  };
}
