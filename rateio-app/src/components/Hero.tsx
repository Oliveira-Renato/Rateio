export default function Hero() {
  return (
    <div>
      {/* <Image src={ } alt='Bla' /> */}


      <div className='container mx-auto text-center py-20'>
        <h1 className='text-4xl font-bold mb-4'>Simplificando a Divisão de Despesas em Viagens em Grupo</h1>

        <p className='text-lg mb-8'>
          Organize suas viagens com amigos de forma fácil e justa. Divida despesas, mantenha a transparência e foque nas memórias.
        </p>

        <a href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback/google&response_type=code&scope=email%20profile`} className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 ease-in-out'>
          Comece Agora
        </a>
      </div>
    </div>
  )
}