import { useRouter } from "next/router";
import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";

export default function PessoaId() {
  const router = useRouter();
  const { id, nomePessoa } = router.query;

  return (
    <RootLayout>
      <TituloDashboard titulo={`${nomePessoa}`} subTitulo="Dados da pessoa" />
      <div>
        <h1>
          Pessoa {nomePessoa} | ID: {id}
        </h1>
      </div>
    </RootLayout>
  );
}
