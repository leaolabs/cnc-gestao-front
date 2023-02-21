import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import BaseMaster from "../..";
import TituloDashboard from "../../../components/dashboard/Titulo";
import ICidade from "../../../model/ICidade";
import { CidadesData } from "../../api/cncApi";

export default function EstadoId() {
  const router = useRouter();
  const { id, nomeEstado } = router.query;

  let idEstado = 0;
  if (typeof id != "undefined") {
    idEstado = +id;
  }

  const { cidadesData, isLoadingCidade, isErrorCidade } = CidadesData();
  const [cidades, setCidades] = useState<ICidade[]>();
  useEffect(
    function persistirCidades() {
      if (cidadesData) setCidades(cidadesData.data);
    },
    [cidadesData]
  );

  if (!cidades) return <ClipLoader />;

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
            <div
              key={`table-tr-cidade-${cidade.id_cidade}`}
              className="bg-pink-300 hover:bg-pink-400 p-2 rounded-lg"
            >
              <div>
                <Link
                  href={{
                    pathname: "cidades/[id]",
                    query: {
                      id: cidade.id_cidade,
                      nomeCidade: cidade.no_cidade,
                    },
                  }}
                >
                  <div className="flex text-sm font-light hover:font-bold">
                    <div className="">{cidade.no_cidade}</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </BaseMaster>
  );
}
