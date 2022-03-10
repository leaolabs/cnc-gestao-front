import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())
const baseUrl = 'https://apicncbrasil.cn.org.br/api'

function getComunidades() {
  const { data, error } = useSWR(`${baseUrl}/comunidades`, fetcher)

  return {
    comunidadesData: data,
    isLoadingComunidade: !error && !data,
    isErrorComunidade: error
  }
}

function getLocalidades() {
  const { data, error } = useSWR(`${baseUrl}/localidades`, fetcher)

  return {
    localidadesData: data,
    isLoadingLocalidade: !error && !data,
    isErrorLocalidade: error
  }
}

function getCidades() {
  const { data, error } = useSWR(`${baseUrl}/cidades`, fetcher)

  return {
    cidadesData: data,
    isLoadingCidade: !error && !data,
    isErrorCidade: error
  }
}

function getEstados() {
  const { data, error } = useSWR(`${baseUrl}/estados`, fetcher)

  return {
    estadosData: data,
    isLoadingEstado: !error && !data,
    isErrorEstado: error
  }
}

const CNC = {
  getComunidades,
  getLocalidades,
  getCidades,
  getEstados,
}

export default CNC
