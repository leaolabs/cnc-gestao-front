import BaseMaster from "..";
import { useFetchCncApi } from "../../hooks/useFetch";
import IPessoa from "../../model/IPessoa";
import Carregando from "../carregando";

export default function Pessoa() {
  const { data } = useFetchCncApi<IPessoa[]>("pessoas");

  if (!data) return <Carregando />;

  return (
    <BaseMaster>
      <h1>Pagina pessoa</h1>
      {data.map((pessoa) => (
        <div key={pessoa.id_pessoa}>{pessoa.no_pessoa}</div>
      ))}
    </BaseMaster>
  );
}
