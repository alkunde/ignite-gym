import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/user-dto";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storage-user";

import { api } from "@services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserData: boolean;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } =  await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true);

      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoadingUserData,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}