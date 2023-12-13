import MainButton from "./MainButton";

export default function Hero() {
  return (
    <div>
      {/* <Image src={ } alt='Bla' /> */}
      <div className='mx-auto text-center py-20'>
        <h1 className='text-4xl font-bold mb-4'>Simplificando a Divisão de Despesas em Viagens em Grupo 💸</h1>

        <p className='text-lg mb-8'>
          Organize suas viagens com amigos de forma fácil e justa. Divida despesas, mantenha a transparência e foque nas memórias.
        </p>

        <MainButton />
      </div>
    </div>
  )
}