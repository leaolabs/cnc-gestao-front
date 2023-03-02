import { useEffect, useState } from "react";
import BaseMaster from "..";
import InputPequisa from "../../components/dashboard/InputPesquisa";
import TituloDashboard from "../../components/dashboard/Titulo";
import IEquipe from "../../model/IEquipe";
import ITipoEquipe from "../../model/ITipoEquipe";
import svgIconePessoa from "../../utils/svg";
import { EquipesData, TipoEquipesData } from "../api/cncApi";
import Carregando from "../carregando";
import ErroCarregamento from "../erroCarregamento";

export default function Equipe() {
  const [search, setSearch] = useState("");
  const [tipoEquipes, setTipoEquipes] = useState<ITipoEquipe[]>();
  const [equipes, setEquipes] = useState<IEquipe[]>();

  const { tipoEquipesData, isErrorTipoEquipes } = TipoEquipesData();
  const { equipesData, isErrorEquipes } = EquipesData();

  useEffect(() => {
    if (tipoEquipesData) {
      setTipoEquipes(tipoEquipesData.data);
    }
  }, [tipoEquipesData]);

  useEffect(() => {
    if (equipesData) {
      setEquipes(equipesData.data);
    }
  }, [equipesData]);

  if (!tipoEquipes) return <Carregando objetoCarregando="Tipo Equipes" />;
  if (!equipes) return <Carregando objetoCarregando="Equipes" />;

  if (isErrorEquipes) return <ErroCarregamento objetoQueDeuErro="Equipes" />;
  if (isErrorTipoEquipes)
    return <ErroCarregamento objetoQueDeuErro="Tipo de equipes" />;

  return (
    <BaseMaster>
      <TituloDashboard titulo="Equipe" subTitulo="Equipes do caminho" />

      <InputPequisa
        onChange={(e) => alert("recurso nao implementado ainda")}
        placeholder="Nome da equipe ..."
        svgIcone={svgIconePessoa()}
        valor={search}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {equipes
          ?.map((equipe: IEquipe) => (
            <div
              key={`equipe-${equipe.id_equipe}`}
              className="bg-teal-400 p-3 rounded-md"
            >
              <h3 className="text-lg">{equipe.responsavel}</h3>
              {tipoEquipes
                .filter((t) => t.id_tipo_equipe === equipe.id_tipo_equipe)
                .map((t) => (
                  <div>
                    <h3 className="text-sm font-light">
                      Tipo :{t.no_tipo_equipe}
                    </h3>
                  </div>
                ))}
            </div>
          ))
          .slice(0, 12)}
      </div>
    </BaseMaster>
  );
}
