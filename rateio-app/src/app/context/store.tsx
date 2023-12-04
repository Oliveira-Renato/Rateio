'use client';
import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

//tipo de dado para armazenar no contexto
type DataType = {
  name: string;
  participante: string[];
};

//interface para o contexto
interface ContextProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  participants: string[];
  setParticipants: Dispatch<SetStateAction<string[]>>;
}

//contexto com valores padrão
const GlobalContext = createContext<ContextProps>({
  name: "",
  setName: (): string => "",
  participants: [],
  setParticipants: (): string[] => [],
});

export const GlobalContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Estado para o nome
  const [name, setName] = useState("");
  // Estado para os participantes
  const [participants, setParticipants] = useState<string[]>([]);
  // provedor de contexto com os valores fornecidos
  return (
    <GlobalContext.Provider value={{ name, setName, participants, setParticipants }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
