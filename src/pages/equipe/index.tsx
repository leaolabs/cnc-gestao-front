import { useEffect, useState } from "react";
import BaseMaster from "..";
import ITipoEquipe from "../../model/ITipoEquipe";
import { TipoEquipesData } from "../api/cncApi";
import Carregando from "../carregando";

export default function Equipe() {
  const [tipoEquipes, setTipoEquipes] = useState<ITipoEquipe[]>();

  const { tipoEquipesData, isErrorTipoEquipes, isLoadingTipoEquipes } =
    TipoEquipesData();

  useEffect(
    function persistirTipoEquipes() {
      if (tipoEquipesData) {
        setTipoEquipes(tipoEquipesData.data);
      }
    },
    [tipoEquipesData]
  );

  if (!tipoEquipes) return <Carregando />;

  return (
    <BaseMaster>
      {tipoEquipes.map((equipe: ITipoEquipe) => (
        <li key={equipe.id_tipo_equipe}>{equipe.no_tipo_equipe}</li>
      ))}
    </BaseMaster>
  );
}
