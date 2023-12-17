import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { api } from "../config/api";

type AuthContextDataProps = {
  user: IUser | null;
  signIn(nome: string, senha: string): Promise<any>;
  signOut(): Promise<any>;
  handleChecked(): Promise<any>;
};

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

const AuthContextProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true);
      const storagedUser = localStorage.getItem("@SEGMAO:user");

      if (storagedUser) {
        const userParsed = JSON.parse(storagedUser);
        api.defaults.headers["Authorization"] = `Bearer ${userParsed.token}`;
        setUser(userParsed);
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signOut() {
    localStorage.clear();
    setUser(null);
  }

  async function handleChecked() {
    const storagedUser = localStorage.getItem("@SEGMAO:user");

    const userParsed: IUser = JSON.parse(storagedUser as any);

    userParsed.isChecked = true;

    setUser(userParsed);

    localStorage.setItem("@SEGMAO:user", JSON.stringify(userParsed));
  }

  async function signIn(nome: string, senha: string) {
    try {
      const { data } = await api.post("/auth", {
        nome,
        senha,
      });

      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

      if (data) {
        const user = {
          ...data
        };

        localStorage.setItem("@SEGMAO:user", JSON.stringify(user));
        setUser(data);
      }

      return;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  if(loading) return <p>Loading..</p>

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, handleChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthContextProvider };
