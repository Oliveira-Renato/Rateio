'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewGroup() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleAvancar = () => {
    // Adicione a lógica para enviar os dados para a rota '/grupos'
    // Exemplo: fetch('/grupos', { method: 'POST', body: JSON.stringify({ name }) })

    // Redirecionar para a próxima tela
    router.push('/adicionar-participantes');
  };

  const handleCancelar = () => {
    // Voltar para a tela inicial
    router.push('/');
  };

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
                className="flex-1 border border-white/10 py-2 px-4 rounded-md focus:outline-none focus:border-purple-500 bg-transparent transition duration-300 ease-in-out"
                placeholder="Digite o título da despesa"
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
