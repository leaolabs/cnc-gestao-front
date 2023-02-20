import Link from "next/link";
import { useEffect, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { ClipLoader } from "react-spinners";
import BaseMaster from "..";
import IEstado from "../../model/IEstado";
import IPais from "../../model/IPais";
import { PaisesData, EstadosData } from "../api/cncApi";

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

  if (!paises) return <ClipLoader />;
  if (!estados) return <ClipLoader />;

  let optionsPaises:
    | OptionsOrGroups<{ value: number; label: string }, any>
    | undefined = [];

  paises.map((p) => {
    optionsPaises.push({
      value: p.id_pais,
      label: p.no_pais,
    });
  });

  function onChangeSelectPais(option: { value: number; label: string }): void {
    const paisSelecionado = paises.find((p) => p.id_pais === option.value);
    setPais(paisSelecionado);
  }

  return (
    <BaseMaster>
      <h1>Pagina comunidade</h1>
      <Select
        onChange={(op) => onChangeSelectPais(op)}
        options={optionsPaises}
        defaultValue={{ value: 1, label: "Brasil" }}
        placeholder="Selecione um pais"
      />

      <div className="">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
        ​
        {estados
          .filter((uf) => uf.id_pais === pais.id_pais)
          .map((estado: IEstado) => (
            <div key={`estado-id-${estado.id_estado}`} className="">
              {estado.no_estado}
              {estado.sg_estado}

              <Link
                href={{
                  pathname: `estados/[id]`,
                  query: {
                    id: estado.id_estado,
                    nomeEstado: estado.no_estado,
                  },
                }}
              >
                Mais detalhes
              </Link>
            </div>
          ))}
      </div>
    </BaseMaster>
  );
}
