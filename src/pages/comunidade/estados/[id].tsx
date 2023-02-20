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
        titulo={`Comunidades de ${nomeEstado}`}
        subTitulo={`Irmãos`}
      />

      <div className="">
        {cidades
          .filter((c) => c.id_estado === idEstado)
          .map((cidade) => (
            <div key={`table-tr-cidade-${cidade.id_cidade}`}>
              <div>{cidade.id_cidade}</div>
              <div>{cidade.no_cidade}</div>
              <div>123</div>
              <div>39829</div>
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
                  mais detalhes
                </Link>
              </div>
            </div>
          ))}
      </div>
    </BaseMaster>
  );
}
