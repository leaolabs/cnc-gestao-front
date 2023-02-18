import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CNC Gestão</title>
        <meta name="description" content="CNC Gestão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <header className="bg-green-800 p-5">
            <div className="flex justify-start items-center text-white">
              <h2 className="font-black text-4xl">CNC</h2>
              <h2 className="font-extralight text-5xl pl-2"> Gestão</h2>
            </div>
          </header>

          <div className="bg-red-400 grid grid-cols-6">
            
            <div className="bg-yellow-500 col-span-1">
              <h3>Relatóio</h3>
              <h3>Pessoas</h3>
              <h3>Comunidades</h3>
              <h3>Carismasl</h3>
            </div>

            <div className="col-span-5">
              <div className="bg-blue-400 h-full">
                <h1>ronaldo</h1>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-pink-500 p-5 text-white font-light text-center">
        Desenvolvido por Leonardo Nascimento Cintra - 2023
      </footer>
    </>
  );
}
