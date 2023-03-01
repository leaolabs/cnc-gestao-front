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
      ? pessoas.filter((pessoa) => pessoa.no_pessoa.includes(search))
      : [];

  function randomFoto() {
    const fotos = [foto1, foto2, foto3, foto4, foto5, foto6, foto7];
    return fotos[Math.floor(Math.random() * fotos.length)];
  }

  return (
    <BaseMaster>
      <TituloDashboard subTitulo="Irmãos" titulo="Pessoas" />

      <div className="bg-lime-600 p-4 mt-4">
        <input
          type="text"
          name="searchPessoa"
          id="searchPessoa"
          placeholder="Nome da pessoa ..."
          className="rounded-md w-full sm:max-w-max p-2 text-gray-600 font-light"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
        {pessoas
          .map((pessoa: IPessoa) => (
            <div>
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
                      width={384}
                      height={512}
                      className="w-24 h-24"
                    />
                    <h4>{pessoa.no_pessoa}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))
          .slice(0, 10)}
      </div>
    </BaseMaster>
  );
}
