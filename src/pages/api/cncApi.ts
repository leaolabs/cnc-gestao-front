import useSWR from "swr";

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export function ComunidadesData() {
  const { data, error } = useSWR(`${BASE_URL}/comunidades`, fetcher);

  return {
    comunidadesData: data,
    isLoadingComunidade: !error && !data,
    isErrorComunidade: error,
  };
}

export function LocalidadesData() {
  const { data, error } = useSWR(`${BASE_URL}/localidades`, fetcher);

  return {
    localidadesData: data,
    isLoadingLocalidade: !error && !data,
    isErrorLocalidade: error,
  };
}

export function CidadesData() {
  const { data, error } = useSWR(`${BASE_URL}/cidades`, fetcher);

  return {
    cidadesData: data,
    isLoadingCidade: !error && !data,
    isErrorCidade: error,
  };
}

export function EstadosData() {
  const { data, error } = useSWR(`${BASE_URL}/estados`, fetcher);

  return {
    estadosData: data,
    isLoadingEstado: !error && !data,
    isErrorEstado: error,
  };
}

export function PaisesData() {
  const { data, error } = useSWR(`${BASE_URL}/paises`, fetcher);

  return {
    paisesData: data,
    isLoadingPais: !error && !data,
    isErrorPais: error,
  };
}

export function TipoDiocesesData() {
  const { data, error } = useSWR(`${BASE_URL}/tipo_dioceses`, fetcher);

  return {
    tipoDiocesesData: data,
    isLoadingTipoDioceses: !error && !data,
    isErrorTipoDioceses: error,
  };
}

export function TipoLocaisData() {
  const { data, error } = useSWR(`${BASE_URL}/tipo_locais`, fetcher);

  return {
    tipoLocaisData: data,
    isLoadingTipoLocais: !error && !data,
    isErrorTipoLocais: error,
  };
}
