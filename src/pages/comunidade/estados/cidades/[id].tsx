import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseMaster from "../../..";
import TituloDashboard from "../../../../components/dashboard/Titulo";
import ILocalidade from "../../../../model/ILocalidade";
import ITipoDiocese from "../../../../model/ITipoDiocese";
import ITipoLocal from "../../../../model/ITipoLocal";
import {
  LocalidadesData,
  TipoDiocesesData,
  TipoLocaisData,
} from "../../../api/cncApi";
import Carregando from "../../../carregando";

export default function CidadeId() {
  const router = useRouter();
  const { id, nomeCidade } = router.query;

  let idCidade = 0;
  if (typeof id != "undefined") {
    idCidade = +id;
  }

  const { localidadesData, isLoadingLocalidade, isErrorLocalidade } =
    LocalidadesData();
  const [localidades, setLocalidades] = useState<ILocalidade[]>();
  useEffect(
    function persistirLocalidades() {
      if (localidadesData) setLocalidades(localidadesData.data);
    },
    [localidadesData]
  );

  const { tipoDiocesesData, isLoadingTipoDioceses, isErrorTipoDioceses } =
    TipoDiocesesData();
  const [tipoDioceses, setTipoDioceses] = useState<ITipoDiocese[]>();
  useEffect(
    function persistirTipoDioceses() {
      if (tipoDiocesesData) setTipoDioceses(tipoDiocesesData.data);
    },
    [tipoDiocesesData]
  );

  const { tipoLocaisData, isLoadingTipoLocais, isErrorTipoLocais } =
    TipoLocaisData();
  const [tipoLocais, setTipoLocais] = useState<ITipoLocal[]>();
  useEffect(
    function persistTipoLocais() {
      if (tipoLocaisData) setTipoLocais(tipoLocaisData.data);
    },
    [tipoLocaisData]
  );

  if (!localidades) return <Carregando />;
  if (!tipoDioceses) return <Carregando />;

  return (
    <BaseMaster>
      <TituloDashboard
        titulo={`${nomeCidade}`}
        subTitulo={`Paróquias: ${
          localidades.filter((l) => l.id_cidade === idCidade).length
        }`}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {localidades
          .filter((l) => l.id_cidade === idCidade)
          .map((localidade) => (
            <div
              key={`localidade-card-${localidade.id_localidade}`}
              className="bg-cyan-400 border border-red-500 font-light rounded-lg text-base"
            >
              {localidade.no_localidade}
              <br />
              {localidade.tx_observacao}
              <br />
              {localidade.co_localidade}
              <br />
              Diocese: {localidade.id_diocese}
              <br />
              Tipo:{" "}
              {tipoLocais
                ?.filter((l) => l.id_tipo_local === localidade.id_tipo_local)
                .map((local) => local.no_tipo_local)}
            </div>
          ))}
      </div>
    </BaseMaster>
  );
}