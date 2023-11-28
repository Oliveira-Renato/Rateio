'use client'
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/context/store';

export default function NewExpense() {
  const { name: groupName, participants } = useGlobalContext();

  const router = useRouter();

  const handleVoltar = () => router.push('/new/participants');

  const handleAvancar = () => {

  };

  return (
    <div className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-2 text-center">Adicionar Despesas</h2>
      <h5 className="text-sm text-center mb-8">Preencha os gastos de cada integrante</h5>
      <div className="flex flex-col items-center justify-center">
        <form className="w-full">


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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
