import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Logo from "../components/dashboard/Logo";
import Nav from "../components/nav/Nav";

export default function BaseMaster({ children }: any) {
  return (
    <>
      <Script src="/js/cnc.js" />
      <Head>
        <title>CNC Gestão</title>
        <meta name="description" content="CNC Gestão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative min-h-screen md:flex">
          {/* mobile menu bar */}
          <div className="md:hidden bg-gray-700 text-gray-100 flex justify-between">
            {/* logo */}
            <Link href={"#"} className="block p-4 text-white font-bold">
              <div className="flex space-x-2">
                <Logo />
              </div>
            </Link>

            {/* mobile menu button */}
            <button className="mobile-menu-button p-4 hover:bg-gray-600 focus:bg-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* sidebar */}
          <div className="sidebar bg-green-700 text-blue-100 w-64 space-y-6 px-2 py-7 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0">
            {/* logo */}
            <Link href={"#"}>
              <Logo />
            </Link>

            {/* nav */}
            <nav>
              <Nav descricao="Home" url="/"></Nav>
              <Nav descricao="Pessoas" url="/pessoa"></Nav>
              <Nav descricao="Equipe" url="/equipe"></Nav>
              <Nav descricao="Comunidade" url="/comunidade"></Nav>
            </nav>
          </div>

          {/* content */}
          <div className="flex-1 p-10 text-2xl font-bold bg-red-200">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
