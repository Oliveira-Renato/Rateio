'use client'
import Image from 'next/image';
import { User } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';

// Defina a interface para o usuário
interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  accessToken?: string | null | undefined;
}

export default function SignIn() {
  const { data: session } = useSession();

  const handleRegistration = async () => {
    if (session) {
      const userData = {
        id: session.googleId,
        name: session.user?.name,
        email: session.user?.email,
        avatar_url: session.user?.image,
      };

      console.log(userData)

      try {
        const response = await axios.post('http://localhost:3333/register', userData);
        console.log('Registro realizado com sucesso:', response.data);
      } catch (error) {
        console.error('Erro no registro:', error);
      }
    }
  };

  useEffect(() => {
    handleRegistration();
  }, [session?.googleId]);

  if (session) {
    // Retorne o JSX para o usuário autenticado
    return (
      <div className="absolute top-0 left-0 p-4">
        <div className="flex items-center gap-3 text-center hover:text-gray-50 transition-colors">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-400">
            <Image
              className="rounded-full"
              src={session.user?.image ?? ''}
              alt="user image"
              width={50}
              height={50}
            />
          </div>
          <p className="max-w-[240px] text-sm leading-snug">{session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-gray-400 text-gray-50 px-4 rounded-sm hover:bg-gray-900 hover:text-gray-50 hover:border hover:border-gray-50"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  // Se a sessão não existir, retorne o JSX para o usuário não autenticado
  return (
    <div className="absolute top-0 left-0 p-4">
      <button
        onClick={() => signIn()}
        className="flex items-center gap-3 hover:text-gray-50 transition-colors"
      >
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-400">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <p className="max-w-[240px] text-sm leading-snug">
          <span className="underline">Entrar</span>
        </p>
      </button>
    </div>
  );
}

