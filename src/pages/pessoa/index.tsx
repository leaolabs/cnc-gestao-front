import Image from "next/image";
import BaseMaster from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import IPessoa from "../../model/IPessoa";
import Carregando from "../carregando";
import pessoaSemFoto from "public/img/sem-foto.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocalidadesData, PessoasData } from "../api/cncApi";
import utils from "../../utils/utils";
import ILocalidade from "../../model/ILocalidade";
import ErroCarregamento from "../erroCarregamento";

export default function Pessoa() {
  const [search, setSearch] = useState("");
  const [pessoas, setPessoas] = useState<IPessoa[]>();
  const [localidades, setLocalidades] = useState<ILocalidade[]>();

  const { pessoasData, isErrorPessoas } = PessoasData();
  // const { localidadesData } = LocalidadesData();
  // useEffect(() => {
  //   if (localidadesData) setLocalidades(localidadesData.data);
  // }, [localidadesData]);

  useEffect(() => {
    if (pessoasData) setPessoas(pessoasData.data);
  }, [pessoasData]);

  if (isErrorPessoas) return <ErroCarregamento />;
  if (!pessoas) return <Carregando />;

  const pessoasFiltradas =
    search.length > 0
      ? pessoas.filter((p) => {
          const nome = utils.removerAcento(p.no_pessoa).toLowerCase();
          const nomePesquisa = utils.removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : [];

  return (
    <BaseMaster>
      <TituloDashboard subTitulo="Irmãos" titulo="Pessoas" />

      <div className="bg-lime-300 p-2 mt-3 rounded-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {renderIconePessoa()}
          </div>
          <input
            type="text"
            name="search"
            placeholder="Nome da pessoa ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg hover:bg-lime-100 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {search.length > 0
          ? pessoasFiltradas
              .map((p: IPessoa) => renderCardPessoa(p))
              .slice(0, 24)
          : pessoas.map((p: IPessoa) => renderCardPessoa(p)).slice(0, 12)}
      </div>
    </BaseMaster>
  );

  function renderIconePessoa() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-500 dark:text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  }

  function renderCardPessoa(p: IPessoa): JSX.Element {
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
                {/* <h3 className="text-sm font-light">
                  {localidades
                    .filter((local) => local.id_localidade === p.id_localidade)
                    .map((localidade) => (
                      <h1>{localidade.no_localidade}</h1>
                    ))}
                </h3> */}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
