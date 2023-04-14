import { GetServerSideProps } from "next";
import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import { validarUsuarioAutenticado } from "../../utils/utils";

export default function Relatorio() {
  return (
    <RootLayout>
      <TituloDashboard titulo="Relatorio" subTitulo="" />
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return validarUsuarioAutenticado(ctx);
};
