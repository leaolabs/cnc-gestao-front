import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import InputPequisa from "../../components/dashboard/InputPesquisa";
import { IconePessoa } from "../../utils/Icones";

export default function Pessoa() {
  return (
    <RootLayout>
      <TituloDashboard
        subTitulo={`Carisma irmãos`}
        titulo="Parte em construção"
      />

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
