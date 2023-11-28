'use client'
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/context/store';

import React, { useState } from 'react';

export default function NewExpense() {
  const { name: groupName, participants } = useGlobalContext();
  const router = useRouter();
  const [expenseValues, setExpenseValues] = useState(participants.map(() => ''));

  const handleVoltar = () => router.push('/new/participants');

  const handleSalvar = () => {
    // Aqui você pode usar o array expenseValues para obter os valores das despesas.
    // Certifique-se de validar e processar os dados conforme necessário.
  };

  const formatCurrency = (value: string) => {
    // Formata o valor para o formato de moeda brasileira (R$ 0,00).
    const formattedValue = parseFloat(value.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
    return formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleBlur = (index: number) => {
    // Formata o valor quando o campo perde o foco (quando o usuário pressiona 'Tab').
    const formattedValue = formatCurrency(expenseValues[index]);
    const updatedValues = [...expenseValues];
    updatedValues[index] = formattedValue;
    setExpenseValues(updatedValues);
  };

  return (
    <div className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-2 text-center">Adicionar Despesas</h2>
      <h5 className="text-sm text-center mb-8">Preencha os gastos de cada integrante</h5>
      <div className="flex flex-col items-center justify-center">
        <form className="w-full">
          <div className="mb-4">
            <h5 className="text-lg font-bold mb-2 text-center">{groupName}</h5>
            {participants.map((participant, index) => (
              <div key={index} className="mb-2 border-b-2 border-b-orange-500">
                <div className="flex justify-between items-end">
                  <p className="flex-1">{participant}</p>
                  <input
                    type="text"
                    id={`valueExpense_${index}`}
                    value={expenseValues[index]}
                    onChange={(e) => setExpenseValues((prevValues) => {
                      const updatedValues = [...prevValues];
                      updatedValues[index] = e.target.value;
                      return updatedValues;
                    })}
                    onBlur={() => handleBlur(index)}
                    className="w-28 bg-gray-900 text-gray-100 border border-purple-500 py-2 px-4 rounded-md focus:outline-none focus:border-purple-700 bg-transparent transition duration-300 ease-in-out"
                    placeholder='R$ 0,00'
                  />
                </div>
              </div>
            ))}
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
              onClick={handleSalvar}
              className="bg-purple-500 text-white border border-white/10 py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
