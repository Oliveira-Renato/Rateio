import Hero from '@/components/Hero'
import SignIn from '@/components/SignIn'

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
        <SignIn />

        {/* Hero */}
        <Hero />

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
