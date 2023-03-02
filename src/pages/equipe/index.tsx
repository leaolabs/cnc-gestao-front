import { useEffect, useState } from "react";
import BaseMaster from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import IEquipe from "../../model/IEquipe";
import ITipoEquipe from "../../model/ITipoEquipe";
import { EquipesData, TipoEquipesData } from "../api/cncApi";
import Carregando from "../carregando";
import ErroCarregamento from "../erroCarregamento";

export default function Equipe() {
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
      {tipoEquipes.map((equipe: ITipoEquipe) => (
        <li key={equipe.id_tipo_equipe}>{equipe.no_tipo_equipe}</li>
      ))}

      <br />

      {equipes?.map((equipe: IEquipe) => (
        <li key={equipe.id_equipe}>{equipe.responsavel}</li>
      ))}
    </BaseMaster>
  );
}
