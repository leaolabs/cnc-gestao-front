import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import InputPequisa from "../../components/dashboard/InputPesquisa";
import { IconePessoa } from "../../utils/Icones";
import { GetServerSideProps } from "next";
import { validarUsuarioAutenticado } from "../../utils/utils";

export default function Carisma() {
  return (
    <RootLayout>
      <TituloDashboard subTitulo={"Pagina em construção"} titulo="Carisma" />

      <InputPequisa
        onChange={(e) => alert("nao implementado ainda")}
        valor={""}
        placeholder="Nome do carisma ..."
        icone={IconePessoa}
      />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <h2>Implementar carisma</h2>
      </div>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return validarUsuarioAutenticado(ctx);
};
