import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import BaseMaster from "../../..";
import ILocalidade from "../../../../model/ILocalidade";
import ITipoDiocese from "../../../../model/ITipoDiocese";
import ITipoLocal from "../../../../model/ITipoLocal";
import {
  LocalidadesData,
  TipoDiocesesData,
  TipoLocaisData,
} from "../../../api/cncApi";

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

  if (!localidades) return <ClipLoader />;
  if (!tipoDioceses) return <ClipLoader />;

  return (
    <BaseMaster>
      <div className="">
        <h2>Cidade: {nomeCidade}</h2>
        {localidades
          .filter((l) => l.id_cidade === idCidade)
          .map((localidade) => (
            <div
              key={`localidade-card-${localidade.id_localidade}`}
              className=""
            >
              {localidade.no_localidade}
              {localidade.tx_observacao}
              {localidade.co_localidade}
              Diocese: {localidade.id_diocese}
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
