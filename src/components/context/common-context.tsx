import { ReactNode, createContext, useState } from "react";

// Crea el contexto

interface ICommonContext {
  token: string | null;
  updateToken: (newToken: string) => void;
}

export const CommonContext = createContext<ICommonContext | undefined>(
  undefined
);
// Proveedor del contexto
export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Función para actualizar el token
  const updateToken = (newToken: string | null) => {
    setToken(newToken);
  };

  return (
    <CommonContext.Provider value={{ token, updateToken }}>
      {children}
    </CommonContext.Provider>
  );
};
