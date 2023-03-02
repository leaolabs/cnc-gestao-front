import Image from "next/image";
import BaseMaster from "..";
import TituloDashboard from "../../components/dashboard/Titulo";
import IPessoa from "../../model/IPessoa";
import Carregando from "../carregando";
import foto1 from "public/img/sem-foto/1.jpg";
import foto2 from "public/img/sem-foto/2.jpg";
import foto3 from "public/img/sem-foto/3.jpg";
import foto4 from "public/img/sem-foto/4.jpg";
import foto5 from "public/img/sem-foto/5.jpg";
import foto6 from "public/img/sem-foto/6.jpg";
import foto7 from "public/img/sem-foto/7.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PessoasData } from "../api/cncApi";
import utils from "../../utils/utils";

export default function Pessoa() {
  const [search, setSearch] = useState("");
  const [pessoas, setPessoas] = useState<IPessoa[]>();

  const { pessoasData } = PessoasData();

  useEffect(() => {
    if (pessoasData) {
      setPessoas(pessoasData.data);
    }
  }, [pessoasData]);

  if (!pessoas) return <Carregando />;

  const pessoasFiltradas =
    search.length > 0
      ? pessoas.filter((pessoa) => {
          const nome = utils.removerAcento(pessoa.no_pessoa).toLowerCase();
          const nomePesquisa = utils.removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : [];

  return (
    <BaseMaster>
      <TituloDashboard subTitulo="Irmãos" titulo="Pessoas" />

      <div className="bg-lime-600 p-4 mt-4">
        <input
          type="text"
          name="search"
          placeholder="Nome da pessoa ..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="rounded-md w-full sm:max-w-max p-2 text-gray-600 font-light"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
        {search.length > 0
          ? pessoasFiltradas
              .map((pessoa: IPessoa) => renderCardPessoa(pessoa))
              .slice(0, 20)
          : pessoas
              .map((pessoa: IPessoa) => renderCardPessoa(pessoa))
              .slice(0, 10)}
      </div>
    </BaseMaster>
  );

  function randomFoto() {
    const fotos = [foto1, foto2, foto3, foto4, foto5, foto6, foto7];
    return fotos[Math.floor(Math.random() * fotos.length)];
  }

  function renderCardPessoa(pessoa: IPessoa): JSX.Element {
    return (
      <div key={pessoa.id_pessoa}>
        <Link
          key={pessoa.id_pessoa}
          href={{
            pathname: "pessoa/[id]",
            query: {
              id: pessoa.id_pessoa,
              nomePessoa: pessoa.no_pessoa,
            },
          }}
        >
          <div key={pessoa.id_pessoa} className="">
            <div className="flex bg-red-300 items-center m-2 p-2">
              <Image
                src={randomFoto()}
                alt="sem foto"
                className="w-24 h-24 rounded-lg"
              />
              <h4 className="pl-2 font-normal">{pessoa.no_pessoa}</h4>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
