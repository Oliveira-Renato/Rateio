'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/context/store';

export default function NewParticpants() {
  const { participants, setParticipants } = useGlobalContext();
  const [nomeParticipante, setNomeParticipante] = useState('');

  const router = useRouter();

  const handleAdicionarParticipante = () => {
    if (nomeParticipante.trim() !== '') {
      setParticipants([...participants, nomeParticipante]);
      setNomeParticipante('');
    }
  };

  const handleVoltar = () => router.push('/new/group');

  const handleAvancar = () => router.push('/new/expenses');

  const handleRemoveParticipant = (indexToRemove: any) => {
    setParticipants((prevParticipantes) =>
      prevParticipantes.filter((_, index) => index !== indexToRemove)
    );
  }

  return (
    <div className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-2 text-center">Adicionar participants</h2>
      <h5 className="text-sm text-center mb-8">Adicione uma ou mais pessoas que deseja dividir as despesas</h5>
      <div className="flex flex-col items-center justify-center">
        <form className="w-full">
          {participants.map((participante, index) => (
            <div key={index} className="flex items-end mb-2 justify-between text-gray-400 border-b-2 border-b-orange-500">
              <p>{participante}</p>
              <button
                type="button"
                onClick={() => handleRemoveParticipant(index)}
                className="bg-gray-900 text-gray-100 border border-white/10 py-2 px-4 rounded-md hover:bg-purple-500 transition duration-300 ease-in-out"
              >
                remover
              </button>
            </div>
          ))}

          <div className="flex flex-col mt-2">
            <label htmlFor="nomeParticipante" className="flex items-center">
              <input
                type="text"
                id="nomeParticipante"
                value={nomeParticipante}
                onChange={(e) => setNomeParticipante(e.target.value)}
                className="flex-1 border border-white/10 py-2 px-4 rounded-md focus:outline-none focus:border-purple-500 bg-transparent transition duration-300 ease-in-out"
                placeholder="Digite o nome do participante"
              />
            </label>
            <button
              type="button"
              onClick={handleAdicionarParticipante}
              className="bg-purple-500 text-white border border-white/10 py-2 px-4 rounded-md  hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Adicionar Participante ➕
            </button>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleVoltar}
              className="bg-gray-900 text-gray-100 border border-white/10 py-2 px-4 rounded-md hover:bg-purple-500 transition duration-300 ease-in-out"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={handleAvancar}
              className="bg-purple-500 text-white border border-white/10 py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Avançar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
