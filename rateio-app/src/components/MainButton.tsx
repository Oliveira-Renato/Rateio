'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function MainButton() {
  const scrollRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <>
        <button
          onClick={() => signIn()}
          className='bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-700 transition duration-300 ease-in-out'>
          Comece Agora
        </button>
      </>
    )
  }

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          router.push('/new/group'); // Substitua 'sua-nova-rota' pela rota desejada
          if (scrollRef.current !== null) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        ref={scrollRef}
      >
        Criar Nova Despesa
      </button>
    </div>
  )
}