import { GetServerSideProps } from "next";
import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import { validarUsuarioAutenticado } from "../../utils/utils";
import caminhoLogo from "../../../public/img/caminho-logo.png";
import jsPDF from "jspdf";
import Image from "next/image";

export default function Relatorio() {
  const doc = new jsPDF();

  function gerarCabecalho() {
    doc.addImage(caminhoLogo.src, "PNG", 2, 5, 40, 20);
    doc.text("Caminho Necocatecumenal - Relatorio de Comunidades", 45, 15);
    doc.text("Teste PDF sendo gerado no CNC", 10, 50);
    doc.save("excluir-isso");
  }

  return (
    <RootLayout>
      <TituloDashboard titulo="Relatórios" subTitulo="selecione o tipo de relatorios que deseja extrair" />
      <div className="">
        <h3>Teste</h3>
        <Image src={caminhoLogo.src} alt="Caminho logo" width={200} height={200} />
        <button className="bg-green-400 p-4 rounded-md" onClick={gerarCabecalho}>Teste</button>
      </div>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return validarUsuarioAutenticado(ctx);
};
