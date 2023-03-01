import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BaseMaster from "../..";
import TituloDashboard from "../../../components/dashboard/Titulo";
import ICidade from "../../../model/ICidade";
import ILocalidade from "../../../model/ILocalidade";
import { CidadesData, LocalidadesData } from "../../api/cncApi";
import Carregando from "../../carregando";

export default function EstadoId() {
  const router = useRouter();
  const { id, nomeEstado } = router.query;

  let idEstado = 0;
  if (typeof id != "undefined") {
    idEstado = +id;
  }

  const { cidadesData } = CidadesData();
  const [cidades, setCidades] = useState<ICidade[]>();
  useEffect(() => {
    if (cidadesData) setCidades(cidadesData.data);
  }, [cidadesData]);

  const { localidadesData } =
    LocalidadesData();
  const [localidades, setLocalidades] = useState<ILocalidade[]>();
  useEffect(() => {
    if (localidadesData) setLocalidades(localidadesData.data);
  }, [localidadesData]);

  if (!cidades) return <Carregando />;

  let contemParoquia: string = "";

  function renderizar(cidade: ICidade) {
    localidades?.filter((l) => l.id_cidade === cidade.id_cidade).length === 0
      ? (contemParoquia = "bg-red-300 hover:bg-red-400")
      : (contemParoquia = "bg-green-300 hover:bg-green-400");

    return (
      <div
        key={`cidade-${cidade.id_cidade}`}
        className={`${contemParoquia} p-2 rounded-lg`}
      >
        <div className="flex text-sm font-light hover:font-bold">
          <div className="">{cidade.no_cidade}</div>
        </div>
      </div>
    );
  }

  return (
    <BaseMaster>
      <TituloDashboard
        titulo={`${nomeEstado}`}
        subTitulo={`Lista de comunidades`}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {cidades
          .filter((c) => c.id_estado === idEstado)
          .map((cidade) => (
            <Link
              key={cidade.id_cidade}
              href={{
                pathname: "cidades/[id]",
                query: {
                  id: cidade.id_cidade,
                  nomeCidade: cidade.no_cidade,
                },
              }}
            >
              {renderizar(cidade)}
            </Link>
          ))}
      </div>
    </BaseMaster>
  );
}
