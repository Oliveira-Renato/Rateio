'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function MainButton() {
  const scrollRef = useRef<HTMLAnchorElement | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/new/group');

    if (window.innerWidth < 960 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960 && scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'auto' });
      }
    };

    // Adiciona um ouvinte de evento de redimensionamento para tratar a mudança de tamanho da tela
    window.addEventListener('resize', handleResize);

    // Remove o ouvinte de evento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <a
        className='bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-700 transition duration-300 ease-in-out cursor-pointer'
        onClick={handleButtonClick}
        ref={scrollRef}
      >
        Criar Nova Despesa
      </a>
    </div>
  )
}