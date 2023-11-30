'use client'
import axios from "axios"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ParticipantsProps {
  expense: string,
  id: string,
  name: string,
  owe?: number | undefined
}

export default function Division() {
  const [groupName, setGroupName] = useState<string>()
  const [participants, setParticipants] = useState<ParticipantsProps[]>([])
  const [totalExpense, setTotalExpenses] = useState<number>()

  const { data: session } = useSession();
  const params = useSearchParams()
  const groupId = params.get('group')

  useEffect(() => {
    const getData = async () => {
      if (session) {
        try {
          const response = await axios.get(`http://localhost:3333/groups/${groupId}?userId=${session.googleId}`);

          if (response.data) {
            const { data } = response;
            setGroupName(data.name);

            // Calcula o valor total de despesas
            const totalExpenses = data.participants.reduce((acc, participant) => {
              const expenseValue = parseFloat(participant.expense) || 0;
              return acc + expenseValue;
            }, 0);

            // Calcula a divisão entre os participantes
            const individualShare = totalExpenses / data.participants.length;

            // Calcula quanto cada participante deve receber ou pagar
            const updatedParticipants = data.participants.map((participant) => {
              const amountOwed = parseFloat(participant.expense) - individualShare;
              return { ...participant, owe: amountOwed };
            });

            // Atualiza o estado com os participantes atualizados
            setTotalExpenses(totalExpenses)
            setParticipants(updatedParticipants);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getData();
  }, [session?.googleId, participants.length]);


  const formatCurrency = (value: string) => {
    // Formata o valor para o formato de moeda brasileira (R$ 0,00).
    const formattedValue = parseFloat(value) || 0;
    return formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  console.log(participants)

  return (
    <div className="px-10 py-20">
      <div className="absolute top-10 right-30 hover:text-gray-200" >
        <Link href={'/'}>
          ⬅  Pagina Inicial
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center">Divisão de despesas</h2>
      <h5 className="text-sm text-center mb-8">Não se preocupe, agora o resto é conosco 😤 </h5>

      <div className="mb-4">
        <h5 className="text-lg font-bold mb-2 text-center">{groupName}</h5>

        <div className="mb-2 border-b-2 border-b-purple-500">
          <div className="flex justify-between">
            <p>Participante</p>
            <p>Gastou</p>
            <p>Ação</p>
          </div>

          {participants.map((participant, index) => (
            <div key={index} className="mb-2 border-b-2 border-b-orange-500">
              <div className="flex justify-between items-end">
                <p>{participant.name}</p>
                <p>{formatCurrency(participant.expense)}</p>
                <div>
                  {/* Action */}
                  <div className={`px-2 rounded-sm ${participant?.owe && participant.owe >= 0 ? 'bg-green-700 text-gray-950' : 'bg-red-700 text-gray-950'}`}>
                    <p>{formatCurrency(participant.owe || '0')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-end" >
            <p>Total </p>
            <span>{formatCurrency("" + totalExpense + "")}</span>
          </div>

        </div>

      </div>
    </div >
  )
}