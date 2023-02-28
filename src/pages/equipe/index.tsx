import BaseMaster from "..";
import { useFetchCncApi } from "../../hooks/useFetch";
import IEstado from "../../model/IEstado";
import Carregando from "../carregando";

export default function Equipe() {
  const { data } = useFetchCncApi<IEstado[]>("estados");

  if (!data) return <Carregando />;

  return (
    <BaseMaster>
      {data.map((estado) => (
        <li key={estado.id_estado}>{estado.no_estado}</li>
      ))}
    </BaseMaster>
  );
}
