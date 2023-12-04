'use client'
import Image from 'next/image';
import { User } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';

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
            className="bg-purple-500 text-white border border-white/10 py-1 px-3 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
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
        className="flex items-center gap-3 hover:text-gray-50 transition-colors"
      >
        <a href="https://rateio-app.vercel.app/api/auth/callback/google&response_type=code&scope=email%20profile`">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <p className="max-w-[240px] text-sm leading-snug">
            <span className="underline">Entrar</span>
          </p>

        </a>

      </button>
    </div>
  );
}

