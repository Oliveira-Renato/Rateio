import Link from "next/link";


export default function EmptyExpenses() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-center leading-relaxed w-[360px]">
        No momento, não há divisões registradas. Comece a{' '}
        <Link className="underline hover:text-gray-50 transition-all" href="/new/group">adicionar despesas</Link> para iniciar a divisão com seus amigos.
      </p>
    </div>
  )
}