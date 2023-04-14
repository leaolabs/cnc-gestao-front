import { parseCookies } from "nookies";

export function removerAcento(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function validarUsuarioAutenticado(ctx: any) {
  const { ["cnc-auth-token"]: token } = parseCookies(ctx);

  if (!token) {
    console.log("User not authenticated");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    console.log("User authenticated");
  }

  return {
    props: {},
  };
}
