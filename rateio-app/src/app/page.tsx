import { User } from 'lucide-react'
//import { Image } from 'next/image'

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* left */}
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
        {/* blur  */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] rounded-full blur-full -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50" />

        {/* stripes  */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {/* Sign in */}
        <div className='container mx-auto text-center'>
          <a href="" className="flex items-center gap-3 text-center hover:text-gray-50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
              <User className='h-5 w-5 text-gray-500' />
            </div>

            <p className='max-w-[240px] text-sm leading-snug'>
              <span className='underline'>Crie sua conta</span> e comece a organizar suas despesas com facilidade!
            </p>
          </a>
        </div>

        {/* Hero */}
        <div>
          {/* <Image src={ } alt='Bla' /> */}


          <div className='container mx-auto text-center py-10'>
            <h1 className='text-4xl font-bold mb-4'>Simplificando a Divisão de Despesas em Viagens em Grupo</h1>

            <p className='text-lg mb-8'>
              Organize suas viagens com amigos de forma fácil e justa. Divida despesas, mantenha a transparência e foque nas memórias.
            </p>

            <a href='#' className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 ease-in-out'>
              Comece Agora
            </a>
          </div>
        </div>

      </div>

      {/* right */}
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center leading-relaxed w-[360px]">
            No momento, não há divisões registradas. Comece a{' '}
            <a className="underline hover:text-gray-50 transition-all" href="">adicionar despesas</a> para iniciar a divisão com seus amigos.
          </p>
        </div>
      </div>
    </main>
  )
}
