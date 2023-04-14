import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAPIClient } from "../services/cnc";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function RootLayout({ children }: any): JSX.Element {
  const { user } = useContext(AuthContext);
  // exemplo aqui https://youtu.be/pvrKHpXGO8E?list=PL85ITvJ7FLohhULgUFkYBf2xcXCG6yfVV&t=2799

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["cnc-auth-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
