import { ReactNode, createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { storageUserSave, storageUserGet, storageUserRemove } from '@storage/storageUser';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToken';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorage: boolean;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorage(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch(error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sessions', { email, password });

    try {
      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);

        userAndTokenUpdate(data.user, data.token);
      }
    } catch(error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorage(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch(error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);

      setUser({} as UserDTO)
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch(error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      updateUserProfile,
      isLoadingUserStorage,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}