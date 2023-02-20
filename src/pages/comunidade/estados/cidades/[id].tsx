import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Base from "../../..";
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
    <Base>
      <div className="row">
        <h2>Cidade: {nomeCidade}</h2>
        {localidades
          .filter((l) => l.id_cidade === +id)
          .map((localidade) => (
            <div
              key={`localidade-card-${localidade.id_localidade}`}
              className="col"
            >
              <div className="card" style={{ width: "18rem" }}>
                {/* <img src="" className="card-img-top" alt="Catedral Franca" /> */}
                <div className="card-body">
                  <h5 className="card-title">{localidade.no_localidade}</h5>
                  <p className="card-text">{localidade.tx_observacao}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {localidade.co_localidade}
                  </li>
                  <li className="list-group-item">
                    Diocese: {localidade.id_diocese}
                  </li>
                  <li className="list-group-item">
                    Tipo:{" "}
                    {tipoLocais
                      ?.filter(
                        (l) => l.id_tipo_local === localidade.id_tipo_local
                      )
                      .map((local) => local.no_tipo_local)}
                  </li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">
                    Card link
                  </a>
                  <a href="#" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Base>
  );
}
