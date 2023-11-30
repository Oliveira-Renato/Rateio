'use client'
import axios from "axios"
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ParticipantsProps {
  expense: string,
  id: string,
  name: string
}

export default function Division() {
  const [groupName, setGroupName] = useState<string>()
  const [participants, setParticipants] = useState<ParticipantsProps[]>([])

  const { data: session } = useSession();
  const params = useSearchParams()
  const groupId = params.get('group')

  useEffect(() => {
    const getData = async () => {
      if (session) {
        try {
          const response = await axios.get(`http://localhost:3333/groups/${groupId}?userId=${session.googleId}`)

          if (response.data) {
            const { data } = response
            setGroupName(data.name)
            setParticipants(data.participants)
          }
        } catch (error) {
          console.log(error)
        }
      }

    }

    getData()
  }, [session?.googleId])

  return (
    <div className="px-10 py-20">
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
                <p>{participant.expense}</p>
                <div>
                  <div className="bg-green-700 text-gray-950 px-2 rounded-sm">
                    <p>R$ 0,00</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-end" >
            <p>Total </p>
            <span>R$ 0,00</span>
          </div>

        </div>

      </div>
    </div >
  )
}