'use client'
import Image from 'next/image'
import { User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  accessToken?: string | null | undefined;
}


export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (session && session.user) {
    // const accessToken = session.accessToken;
    let googleId = session.googleId
    const { name, email, image } = session.user


    return (
      <div className="absolute top-0 left-0 p-4">
        <div className="flex items-center gap-3 text-center hover:text-gray-50 transition-colors">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-400">
            <Image
              className="rounded-full"
              src={session.user.image ?? ''}
              alt="user image"
              width={50}
              height={50}
            />
          </div>
          <p className="max-w-[240px] text-sm leading-snug">{session.user.name}</p>
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

  return (
    <div className="absolute top-0 left-0 p-4">
      <button onClick={() => signIn()} className="flex items-center gap-3 hover:text-gray-50 transition-colors">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-400">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <p className="max-w-[240px] text-sm leading-snug">
          <span className="underline">Crie sua conta</span> e comece a organizar suas despesas com facilidade!
        </p>
      </button>
    </div>
  )
}