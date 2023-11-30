'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GroupProps {
  id: string,
  name: string
}

export default function EmptyExpenses() {
  const [groupName, setGroupName] = useState<GroupProps[]>()
  const { data: session } = useSession();

  useEffect(() => {
    const getData = async () => {
      if (session) {
        try {
          const response = await axios.get(`http://localhost:3333/user/${session.googleId}`)

          if (response.data) {
            const { data } = response
            setGroupName(data.groups)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    getData()
  }, [session?.googleId])

  if (groupName) {
    return (
      <div>
        {groupName.map((group, index) => (
          <div key={index}>
            <div>
              <h5>{group.name}</h5>
            </div>
          </div>
        ))}
      </div>
    )
  }


  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-center leading-relaxed w-[360px]">
        No momento, não há divisões registradas. Comece a{' '}
        <Link className="underline hover:text-gray-50 transition-all" href="/new/group">adicionar despesas</Link> para iniciar a divisão com seus amigos.
      </p>
    </div>
  )

}