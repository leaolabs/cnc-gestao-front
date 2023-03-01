import useSWR from "swr";

const URL_CNC_BRASIL: string = "https://apicncbrasil.cn.org.br/api";
const LOCAL_URL: string = "http://localhost:3000";

async function getToken(): Promise<any> {
  const response = await fetch(`${LOCAL_URL}/api/cnc`);
  const data = await response.json();
  return data.token;
}

const fetcher = (url: RequestInfo | URL): Promise<any> =>
  fetch(url).then((res) => res.json());

async function fetcherWithToken(url: RequestInfo | URL): Promise<any> {
  const token = await getToken();
  const params: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return await fetch(url, params).then((res) => res.json());
}

export function ComunidadesData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/comunidades`, fetcher);

  return {
    comunidadesData: data,
    isLoadingComunidade: !error && !data,
    isErrorComunidade: error,
  };
}

export function LocalidadesData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/localidades`, fetcher);

  return {
    localidadesData: data,
    isLoadingLocalidade: !error && !data,
    isErrorLocalidade: error,
  };
}

export function CidadesData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/cidades`, fetcher);

  return {
    cidadesData: data,
    isLoadingCidade: !error && !data,
    isErrorCidade: error,
  };
}

export function EstadosData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/estados`, fetcher);

  return {
    estadosData: data,
    isLoadingEstado: !error && !data,
    isErrorEstado: error,
  };
}

export function PaisesData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/paises`, fetcher);

  return {
    paisesData: data,
    isLoadingPais: !error && !data,
    isErrorPais: error,
  };
}

export function TipoDiocesesData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/tipo_dioceses`, fetcher);

  return {
    tipoDiocesesData: data,
    isLoadingTipoDioceses: !error && !data,
    isErrorTipoDioceses: error,
  };
}

export function TipoLocaisData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/tipo_locais`, fetcher);

  return {
    tipoLocaisData: data,
    isLoadingTipoLocais: !error && !data,
    isErrorTipoLocais: error,
  };
}

export function TipoEquipesData() {
  const { data, error } = useSWR(
    `${URL_CNC_BRASIL}/tipo_equipes`,
    fetcherWithToken
  );
  return {
    tipoEquipesData: data,
    isLoadingTipoEquipes: !error && !data,
    isErrorTipoEquipes: error,
  };
}

export function PessoasData() {
  const { data, error } = useSWR(`${URL_CNC_BRASIL}/pessoas`, fetcherWithToken);
  return {
    pessoasData: data,
    isLoadingPessoas: !error && !data,
    isErrorPessoas: error,
  };
}
