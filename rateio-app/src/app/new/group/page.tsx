'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/context/store';

export default function NewGroup() {
  const { name, setName } = useGlobalContext();
  const router = useRouter();

  const handleAvancar = () => router.push('/new/participants');

  const handleCancelar = () => router.push('/');

  return (
    <div className="px-10 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">Nova Despesa</h2>
      <div className="flex flex-col items-center justify-center">
        <form className="w-full">
          <label
            htmlFor="titulo"
          >
            <div className="flex items-center">
              <input
                type="text"
                id="titulo"
                value={name}
                className="flex-1 border border-white/10 py-2 px-4 rounded-md focus:outline-none focus:border-purple-500 bg-transparent transition duration-300 ease-in-out"
                placeholder="Digite o título da despesa"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleCancelar}
              className="bg-gray-900 text-gray-100 border border-white/10 py-2 px-4 rounded-md hover:bg-purple-500 transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleAvancar()}
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
