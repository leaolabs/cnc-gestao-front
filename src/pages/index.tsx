import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";

export default function RootLayout({ children }: any): JSX.Element {
  return (
    <>
      <Head>
        <title>CNC Gestão</title>
        <meta name="description" content="CNC Gestão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex">
          <Sidebar />
          <div className="p-7">{children}</div>
        </div>
      </main>
    </>
  );
}
