import RootLayout from "..";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import InputPequisa from "../../components/dashboard/InputPesquisa";
import TituloDashboard from "../../components/dashboard/Titulo";
import IEquipe from "../../model/IEquipe";
import ITipoEquipe from "../../model/ITipoEquipe";
import { EquipesData, TipoEquipesData } from "../api/cncApi";
import Carregando from "../carregando";
import ErroCarregamento from "../erroCarregamento";
import { removerAcento, validarUsuarioAutenticado } from "../../utils/utils";
import { IconeComunidade } from "../../utils/Icones";

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

      <div className="flex flex-wrap gap-4">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-2">
              {search.length > 0
                ? equipesFiltradas.map((e: IEquipe) =>
                    renderSquadCard(e, tipoEquipes)
                  )
                : equipes
                    .map((e: IEquipe) => renderSquadCard(e, tipoEquipes))
                    .slice(0, 21)}
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );

  function renderSquadCard(squad: IEquipe, squadTypes: ITipoEquipe[]) {
    return (
      <div
        key={`squad-id-${squad.id_equipe}`}
        className="p-2 lg:w-1/3 md:w-1/2 w-full"
      >
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src="https://dummyimage.com/100x90"
          />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">
              {squad.responsavel}
            </h2>
            <p className="text-gray-500">
              {squadTypes
                .filter((t) => t.id_tipo_equipe === squad.id_tipo_equipe)
                .map((t) => (
                  <div
                    key={`tipo-equipe-${t.id_tipo_equipe}-equipe-${squad.id_equipe}`}
                  >
                    {t.no_tipo_equipe}
                  </div>
                ))}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return validarUsuarioAutenticado(ctx);
};
