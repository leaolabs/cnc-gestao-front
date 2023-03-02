import { useEffect, useState } from "react";
import BaseMaster from "..";
import IEquipe from "../../model/IEquipe";
import ITipoEquipe from "../../model/ITipoEquipe";
import { EquipesData, TipoEquipesData } from "../api/cncApi";
import Carregando from "../carregando";

export default function Equipe() {
  const [tipoEquipes, setTipoEquipes] = useState<ITipoEquipe[]>();
  const [equipes, setEquipes] = useState<IEquipe[]>();

  const { tipoEquipesData } = TipoEquipesData();
  const { equipesData } = EquipesData();

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

  if (!tipoEquipes) return <Carregando />;

  return (
    <BaseMaster>
      {tipoEquipes.map((equipe: ITipoEquipe) => (
        <li key={equipe.id_tipo_equipe}>{equipe.no_tipo_equipe}</li>
      ))}

      <br />

      {equipes?.map((equipe: IEquipe) => (
        <li>{equipe.responsavel}</li>
      ))}
    </BaseMaster>
  );
}
