import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function Home() {
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
              CNC Gestão
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
            <Link
              href={"#"}
              className="text-white flex items-center space-x-2 px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <span className="text-2xl font-extrabold">CNC Gestão</span>
            </Link>

            {/* nav */}
            <nav>
              <Link
                href={"#"}
                className="block py-2.5 px-4 rounded transition duration-200 text-green-100 hover:text-white hover:bg-green-600"
              >
                Home
              </Link>
              <Link
                href={"#"}
                className="block py-2.5 px-4 rounded transition duration-200 text-green-100 hover:text-white hover:bg-green-600"
              >
                Sobre
              </Link>
              <Link
                href={"#"}
                className="block py-2.5 px-4 rounded transition duration-200 text-green-100 hover:text-white hover:bg-green-600"
              >
                Carismas
              </Link>
              <Link
                href={"#"}
                className="block py-2.5 px-4 rounded transition duration-200 text-green-100 hover:text-white hover:bg-green-600"
              >
                Comunidades
              </Link>
              <Link
                href={"#"}
                className="block py-2.5 px-4 rounded transition duration-200 text-green-100 hover:text-white hover:bg-green-600"
              >
                Catequistas
              </Link>
            </nav>
          </div>

          {/* content */}
          <div className="flex-1 p-10 text-2xl font-bold bg-red-200">
            content goes here
          </div>
        </div>
      </main>
    </>
  );
}
