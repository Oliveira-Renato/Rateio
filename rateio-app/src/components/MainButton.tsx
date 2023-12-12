'use client'
import { useSession } from "next-auth/react";

export default function MainButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <a href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=https://rateio-app-oliveira-renato.vercel.app/api/auth/callback/google&response_type=code&scope=email%20profile`} className='bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-700 transition duration-300 ease-in-out'>
          Comece Agora
        </a>
      </>
    )
  }

  return (
    <div>
      <a href="/new/group" className='bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-700 transition duration-300 ease-in-out'>
        Criar Nova Despesa
      </a>
    </div>
  )
}