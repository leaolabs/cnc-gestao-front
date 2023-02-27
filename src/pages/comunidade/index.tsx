import Link from "next/link";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import BaseMaster from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import IEstado from "../../model/IEstado";
import IPais from "../../model/IPais";
import { PaisesData, EstadosData } from "../api/cncApi";
import Carregando from "../carregando";

const initialState: IPais = {
  id_pais: 1,
  co_ddi: 55,
  no_continente: "América",
  no_pais: "Brasil",
  sg_pais: "BR",
};

export default function Comunidade(): JSX.Element {
  const [paises, setPaises] = useState<IPais[]>();
  const [pais, setPais] = useState<IPais>(initialState);
  const [estados, setEstados] = useState<IEstado[]>();


  const { paisesData, isLoadingPais, isErrorPais } = PaisesData();
  useEffect(
    function persistPaises() {
      if (paisesData) {
        setPaises(paisesData.data);
      }
    },
    [paisesData]
  );

  const { estadosData, isLoadingEstado, isErrorEstado } = EstadosData();
  useEffect(
    function persistEstados() {
      if (estadosData) {
        setEstados(estadosData.data);
      }
    },
    [estadosData]
  );

  if (!paises) return <Carregando />;
  if (!estados) return <Carregando />;

  let optionsPaises: any[] = [];

  paises.map((p) => {
    optionsPaises?.push({
      value: p.id_pais,
      label: p.no_pais,
    });
  });

  function onChangeSelectPais(
    option: SingleValue<{ value: number; label: string }>
  ): void {
    const paisSelecionado = paises?.find((p) => p.id_pais === option?.value);
    if (paisSelecionado) setPais(paisSelecionado);
  }

  return (
    <BaseMaster>
      <TituloDashboard
        titulo="Comunidade"
        subTitulo="Selecione um país / estado"
      />

      <Select
        className="mt-2"
        onChange={(op) => onChangeSelectPais(op)}
        options={optionsPaises}
        defaultValue={{ value: 1, label: "Brasil" }}
        placeholder="Selecione um pais"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {estados
          .filter((uf) => uf.id_pais === pais.id_pais)
          .map((estado: IEstado) => (
            <Link
              key={`estado-id-${estado.id_estado}`}
              href={{
                pathname: `comunidade/estados/[id]`,
                query: {
                  id: estado.id_estado,
                  nomeEstado: estado.no_estado,
                },
              }}
            >
              <div className="flex justify-center border border-green-700 rounded-lg p-2 font-light hover:font-bold bg-amber-50 hover:bg-amber-100 text-green-900">
                <div className="pr-3 hidden sm:block">{estado.no_estado}</div>
                <div className="font-semibold">{estado.sg_estado}</div>
              </div>
            </Link>
          ))}
      </div>
    </BaseMaster>
  );
}
