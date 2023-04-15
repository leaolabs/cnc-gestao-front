import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import IEstado from "../../model/IEstado";
import IPais from "../../model/IPais";
import {
  PaisesData,
  EstadosData,
  CidadesData,
  LocalidadesData,
} from "../api/cncApi";
import Carregando from "../carregando";
import { GetServerSideProps } from "next";
import { validarUsuarioAutenticado } from "../../utils/utils";
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import ICidade from "../../model/ICidade";
import { BeatLoader } from "react-spinners";
import ILocalidade from "../../model/ILocalidade";

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
  const [cidades, setCidades] = useState<ICidade[]>();

  const { paisesData, isLoadingPais, isErrorPais } = PaisesData();
  useEffect(() => {
    if (paisesData) {
      setPaises(paisesData.data);
    }
  }, [paisesData]);

  const { estadosData, isLoadingEstado, isErrorEstado } = EstadosData();
  useEffect(
    function persistEstados() {
      if (estadosData) {
        setEstados(estadosData.data);
      }
    },
    [estadosData]
  );

  const { cidadesData } = CidadesData();
  useEffect(() => (cidadesData ? setCidades(cidadesData.data) : undefined));

  const { localidadesData } = LocalidadesData();
  const [localidades, setLocalidades] = useState<ILocalidade[]>();
  useEffect(() =>
    localidadesData ? setLocalidades(localidadesData.data) : undefined
  );

  if (!paises) return <Carregando objetoCarregando="Paises" />;
  if (!estados) return <Carregando objetoCarregando="Estados (UF)" />;

  let optionsPaises: any[] = [];

  paises.map((p) => {
    optionsPaises.push({
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

  function renderTableCellCidade(estado: IEstado) {
    return (
      <div className="flex justify-center">
        {cidades ? (
          <div>
            <Badge>
              {cidades.filter((c) => c.id_estado === estado.id_estado).length}
            </Badge>
          </div>
        ) : (
          <BeatLoader />
        )}
      </div>
    );
  }

  function renderTableCellParoquia(estado: IEstado) {
    let paroquias = 0;
    if (estados && cidades && localidades) {
      const cidadesComParoquia = cidades.filter(
        (c) => c.id_estado === estado.id_estado
      );

      for (let i = 0; i < cidadesComParoquia.length; i++) {
        paroquias += localidades.filter(
          (l) => l.id_cidade === cidadesComParoquia[i].id_cidade
        ).length;
      }
    }

    return (
      <div className="flex justify-center">
        {estados && cidades && localidades ? (
          <div>
            <Badge color={paroquias === 0 ? "red" : "green"}>{paroquias}</Badge>
          </div>
        ) : (
          <BeatLoader />
        )}
      </div>
    );
  }

  return (
    <RootLayout>
      <div className="p-6 w-full">
        <TituloDashboard
          titulo="Comunidade"
          subTitulo="Selecione um país / estado"
        />

        <Select
          className="mt-6 mb-3 shadow-lg"
          onChange={(op) => onChangeSelectPais(op)}
          options={optionsPaises}
          defaultValue={{ value: 1, label: "Brasil" }}
          placeholder="Selecione um pais"
        />

        <div className="flex justify-center">
          <Card className="mt-4 max-w-screen-xl shadow-2xl">
            <Table className="">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    {pais.no_pais} - UF - Estados
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Cidades
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Paróquias
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Mais detalhes
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {estados
                  .filter((uf) => uf.id_pais === pais.id_pais)
                  .map((estado: IEstado) => (
                    <TableRow key={`${estado.id_estado}`}>
                      <TableCell>
                        {estado.sg_estado} - {estado.no_estado}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderTableCellCidade(estado)}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderTableCellParoquia(estado)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="xs" variant="secondary" color="green">
                          Mais detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return validarUsuarioAutenticado(ctx);
};
