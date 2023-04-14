import Image from "next/image";
import RootLayout from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import IPessoa from "../../model/IPessoa";
import Carregando from "../carregando";
import pessoaSemFoto from "public/img/sem-foto.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocalidadesData, PessoasData } from "../api/cncApi";
import ILocalidade from "../../model/ILocalidade";
import ErroCarregamento from "../erroCarregamento";
import InputPequisa from "../../components/dashboard/InputPesquisa";
import { IconePessoa } from "../../utils/Icones";
import { removerAcento, validarUsuarioAutenticado } from "../../utils/utils";
import { GetServerSideProps } from "next";

export default function Pessoa() {
  const [search, setSearch] = useState("");
  const [pessoas, setPessoas] = useState<IPessoa[]>();
  const [localidades, setLocalidades] = useState<ILocalidade[]>();

  const { pessoasData, isErrorPessoas } = PessoasData();
  const { localidadesData, isErrorLocalidade } = LocalidadesData();

  useEffect(() => {
    if (localidadesData) setLocalidades(localidadesData.data);
  }, [localidadesData]);

  useEffect(() => {
    if (pessoasData) setPessoas(pessoasData.data);
  }, [pessoasData]);

  if (isErrorLocalidade)
    return <ErroCarregamento objetoQueDeuErro="Localidades" />;
  if (isErrorPessoas) return <ErroCarregamento objetoQueDeuErro="Pessoas" />;

  if (!localidades) return <Carregando objetoCarregando="Localidades" />;
  if (!pessoas) return <Carregando objetoCarregando="Pessoas" />;

  const pessoasFiltradas =
    search.length > 0
      ? pessoas.filter((p) => {
          const nome = removerAcento(p.no_pessoa).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : [];

  return (
    <RootLayout>
      <TituloDashboard
        subTitulo={`${pessoas.length} irmãos`}
        titulo="Pessoas"
      />

      <InputPequisa
        onChange={(e) => setSearch(e.target.value)}
        valor={search}
        placeholder="Nome da pessoa ..."
        icone={IconePessoa}
      />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {search.length > 0
          ? pessoasFiltradas
              .map((p: IPessoa) => renderCardPessoa(p, localidades))
              .slice(0, 24)
          : pessoas
              .map((p: IPessoa) => renderCardPessoa(p, localidades))
              .slice(0, 12)}
      </div>
    </RootLayout>
  );

  function renderCardPessoa(
    p: IPessoa,
    localidades: ILocalidade[]
  ): JSX.Element {
    return (
      <div key={p.id_pessoa}>
        <Link
          key={p.id_pessoa}
          href={{
            pathname: "pessoa/[id]",
            query: {
              id: p.id_pessoa,
              nomePessoa: p.no_pessoa,
            },
          }}
        >
          <div key={p.id_pessoa} className="">
            <div className="flex bg-lime-200 items-center m-2 p-2 rounded-md gap-3">
              <Image
                src={pessoaSemFoto}
                alt="sem foto"
                className="w-24 h-24 rounded-lg"
              />
              <div>
                <h4 className="font-normal text-base">{p.no_pessoa}</h4>
                <h3 className="text-sm font-light">
                  {localidades
                    .filter((local) => local.id_localidade === p.id_localidade)
                    .map((localidade) => (
                      <span key={`localidade-${localidade.id_localidade}`}>
                        {localidade.no_localidade}
                      </span>
                    ))}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return validarUsuarioAutenticado(ctx);
};
