import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())
const baseUrl: string = 'https://apicncbrasil.cn.org.br/api'


export function ComunidadesData() {
  const { data, error } = useSWR(`${baseUrl}/comunidades`, fetcher)

  return {
    comunidadesData: data,
    isLoadingComunidade: !error && !data,
    isErrorComunidade: error
  }
}

export function LocalidadesData() {
  const { data, error } = useSWR(`${baseUrl}/localidades`, fetcher)

  return {
    localidadesData: data,
    isLoadingLocalidade: !error && !data,
    isErrorLocalidade: error
  }
}

export function CidadesData() {
  const { data, error } = useSWR(`${baseUrl}/cidades`, fetcher)

  return {
    cidadesData: data,
    isLoadingCidade: !error && !data,
    isErrorCidade: error
  }
}

export function EstadosData() {
  const { data, error } = useSWR(`${baseUrl}/estados`, fetcher)

  return {
    estadosData: data,
    isLoadingEstado: !error && !data,
    isErrorEstado: error
  }
}

export function PaisesData() {
  const { data, error } = useSWR(`${baseUrl}/paises`, fetcher)

  return {
    paisesData: data,
    isLoadingPais: !error && !data,
    isErrorPais: error
  }
}

export function TipoDiocesesData() {
  const { data, error } = useSWR(`${baseUrl}/tipo_dioceses`, fetcher)

  return {
    tipoDiocesesData: data,
    isLoadingTipoDioceses: !error && !data,
    isErrorTipoDioceses: error
  }
}

export function TipoLocaisData() {
  const { data, error } = useSWR(`${baseUrl}/tipo_locais`, fetcher)

  return {
    tipoLocaisData: data,
    isLoadingTipoLocais: !error && !data,
    isErrorTipoLocais: error
  }
}
