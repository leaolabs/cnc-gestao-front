import { parseCookies } from "nookies";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { LOCAL_URL_API } from "../../utils/constants";

const fetcher = (url: RequestInfo | URL): Promise<any> =>
  fetch(url).then((res) => res.json());

async function fetcherWithToken(url: RequestInfo | URL): Promise<any> {
  const { ["cnc-auth-token"]: token } = parseCookies();
  const params: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return await fetch(url, params).then((res) => res.json());
}

export function ComunidadesData() {
  const { data, error } = useSWR(`${LOCAL_URL_API}/cnc/comunidades`, fetcher);

  return {
    comunidadesData: data,
    isLoadingComunidade: !error && !data,
    isErrorComunidade: error,
  };
}

export function LocalidadesData() {
  const { data, error } = useSWRImmutable(`${LOCAL_URL_API}/cnc/localidades`, fetcher);

  return {
    localidadesData: data,
    isLoadingLocalidade: !error && !data,
    isErrorLocalidade: error,
  };
}

export function CidadesData() {
  const { data, error } = useSWRImmutable(`${LOCAL_URL_API}/cnc/cidades`, fetcher);

  return {
    cidadesData: data,
    isLoadingCidade: !error && !data,
    isErrorCidade: error,
  };
}

export function EstadosData() {
  const { data, error } = useSWRImmutable(`${LOCAL_URL_API}/cnc/estados`, fetcher);

  return {
    estadosData: data,
    isLoadingEstado: !error && !data,
    isErrorEstado: error,
  };
}

export function PaisesData() {
  const { data, error } = useSWRImmutable(`${LOCAL_URL_API}/cnc/paises`, fetcher);

  return {
    paisesData: data,
    isLoadingPais: !error && !data,
    isErrorPais: error,
  };
}

export function TipoDiocesesData() {
  const { data, error } = useSWRImmutable(`${LOCAL_URL_API}/cnc/tipo_dioceses`, fetcher);

  return {
    tipoDiocesesData: data,
    isLoadingTipoDioceses: !error && !data,
    isErrorTipoDioceses: error,
  };
}

export function TipoLocaisData() {
  const { data, error } = useSWRImmutable(`${LOCAL_URL_API}/cnc/tipo_locais`, fetcher);

  return {
    tipoLocaisData: data,
    isLoadingTipoLocais: !error && !data,
    isErrorTipoLocais: error,
  };
}

export function TipoCarismaComunidades() {
  const { data, error, isLoading } = useSWR(
    `${LOCAL_URL_API}/cnc/tipo_carisma_comunidades`,
    fetcher,
    { refreshInterval: 5000 }
  );
  return {
    tipoCarismaComunidadesData: data,
    isLoadingTipoCarismaComunidades: isLoading,
    isErrorTipoCarismaComunidades: error,
  };
}

export function TipoEquipesData() {
  const { data, error, isLoading } = useSWR(
    `${LOCAL_URL_API}/cnc/tipo_equipes`,
    fetcher
  );
  return {
    tipoEquipesData: data,
    isLoadingTipoEquipes: isLoading,
    isErrorTipoEquipes: error,
  };
}

export function EquipesData() {
  const { data, error, isLoading } = useSWR(
    `${LOCAL_URL_API}/cnc/equipes`,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    equipesData: data,
    isLoadingEquipes: isLoading,
    isErrorEquipes: error,
  };
}

export function PessoasData() {
  const { data, error } = useSWR(
    `${LOCAL_URL_API}/cnc/pessoas`,
    fetcherWithToken
  );
  return {
    pessoasData: data,
    isLoadingPessoas: !error && !data,
    isErrorPessoas: error,
  };
}

export function PessoaByIdData(id: number) {
  const { data, error } = useSWR(
    `${LOCAL_URL_API}/cnc/pessoas/${id}`,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    pessoaByIdData: data,
    isLoadingPessoaById: !error && !data,
    isErrorPessoaById: error,
  };
}
