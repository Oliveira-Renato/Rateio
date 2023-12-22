'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Stack } from "@mui/material";

interface GroupProps {
  id: string,
  name: string
}

interface State extends SnackbarOrigin {
  open: boolean;
}


export default function EmptyExpenses() {
  const [groupName, setGroupName] = useState<GroupProps[]>([])
  const [spinner, setSpinner] = useState(false)
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const { data: session } = useSession();


  const router = useRouter();

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false })
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false)
    }, 3000)

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
  }, [session?.googleId, spinner])

  const handleDelete = (groupId: string) => {
    setSpinner(true)
    try {
      axios.delete(`http://localhost:3333/groups/${groupId}?userId=${session?.googleId}`)
    } catch (error) {
      setSpinner(false)
      console.log(error)
    }
  };

  const handleView = (groupId: string) => {
    // Lógica para visualizar o grupo com o ID groupId
    console.log(`Visualizar grupo com ID ${groupId}`);
    router.push(`/new/division?group=${groupId}`)
  };

  if (spinner) {
    return (
      <div className="bg-gray-50 shadow-md p-4 mb-4 rounded-md">
        <h5 className="text-lg font-semibold mb-2 text-gray-950">Deletando grupo...</h5>
        <div className="flex justify-between items-center">
          <Spinner />
        </div>
      </div>
    )
  }

  if (groupName.length > 0) {
    return (
      <div className="sm:h-screen sm:my-10 sm:mx-5 md:h-full md:my-0 md:mx-0">
        <h2 className="text-3xl font-bold mb-2 text-center mt-16 mb-8">Minhas Despesas</h2>
        {groupName.map((group, index) => (
          <div key={index} className="bg-zinc-900 shadow-lg p-6 mb-6 rounded-md">
            <h5 className="text-xl font-semibold mb-4 text-gray-50">{group.name}</h5>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleDelete(group.id)}
                className="text-orange-500 hover:text-orange-600 font-bold mr-2 transition duration-300 ease-in-out"
              >
                Deletar
              </button>
              <button
                type="button"
                onClick={() => handleView(group.id)}
                className="text-purple-500 font-bold hover:text-purple-700 transition duration-300 ease-in-out"
              >
                Visualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }


  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-center leading-relaxed w-[360px]">
        No momento, não há divisões registradas. Comece a{' '}
        <Link className="underline hover:text-gray-50 transition-all"
          onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
          href={session ? "/new/group" : "/"}
        >
          adicionar despesas
        </Link>
        {' '}
        para iniciar a divisão com seus amigos.
      </p>
      <Stack>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={`(❕)  Faça login para adicionar despesas`}
          key={vertical + horizontal}
        />
      </Stack>
    </div>
  )

}