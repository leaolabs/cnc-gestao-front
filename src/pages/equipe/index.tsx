import { useEffect, useState } from "react";
import RootLayout from "..";
import InputPequisa from "../../components/dashboard/InputPesquisa";
import TituloDashboard from "../../components/dashboard/Titulo";
import IEquipe from "../../model/IEquipe";
import ITipoEquipe from "../../model/ITipoEquipe";
import { IconeComunidade } from "../../utils/Icones";
import removerAcento from "../../utils/utils";
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
    if (tipoEquipesData) setTipoEquipes(tipoEquipesData.data);
  }, [tipoEquipesData]);

  useEffect(() => {
    if (equipesData) setEquipes(equipesData.data);
  }, [equipesData]);

  if (!tipoEquipes) return <Carregando objetoCarregando="Tipo Equipes" />;
  if (!equipes) return <Carregando objetoCarregando="Equipes" />;

  if (isErrorEquipes) return <ErroCarregamento objetoQueDeuErro="Equipes" />;
  if (isErrorTipoEquipes)
    return <ErroCarregamento objetoQueDeuErro="Tipo de equipes" />;

  const equipesFiltradas =
    search.length > 0
      ? equipes.filter((e) => {
          if (!e.responsavel) {
            return "";
          }
          const nomeEquipe = removerAcento(e.responsavel || "").toLowerCase();
          const nomeEquipePesquisa = removerAcento(search).toLowerCase();
          return nomeEquipe.includes(nomeEquipePesquisa);
        })
      : [];

  return (
    <RootLayout>
      <TituloDashboard titulo="Equipe" subTitulo="Equipes do caminho" />

      <InputPequisa
        onChange={(e) => setSearch(e.target.value)}
        valor={search}
        placeholder="Nome da pessoa ..."
        icone={IconeComunidade}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {search.length > 0
          ? equipesFiltradas.map((e: IEquipe) =>
              renderCardEquipe(e, tipoEquipes)
            )
          : equipes
              .map((equipe: IEquipe) => renderCardEquipe(equipe, tipoEquipes))
              .slice(0, 21)}
      </div>
    </RootLayout>
  );

  function renderCardEquipe(equipe: IEquipe, tipoEquipes: ITipoEquipe[]) {
    return (
      <div
        key={`equipe-${equipe.id_equipe}`}
        className="bg-teal-400 p-3 rounded-md"
      >
        <h3 className="text-lg">{equipe.responsavel}</h3>
        {tipoEquipes
          .filter((t) => t.id_tipo_equipe === equipe.id_tipo_equipe)
          .map((t) => (
            <div
              key={`tipo-equipe-${t.id_tipo_equipe}-equipe-${equipe.id_equipe}`}
            >
              <h3 className="text-sm font-light">Tipo :{t.no_tipo_equipe}</h3>
            </div>
          ))}
      </div>
    );
  }
}
