export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* left */}
      <div>
        left
      </div>
      {/* right */}
      <div className="flex flex-col p-16">
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
