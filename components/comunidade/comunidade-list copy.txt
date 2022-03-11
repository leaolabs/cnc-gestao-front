import Cidade from "../../model/Cidade"
import Comunidade from "../../model/Comunidade"
import Estado from "../../model/Estado"
import Localidade from "../../model/Localidade"
import CNC from '../../pages/api/cnc'

export default function ComunidadeList() {
    const { comunidadesData, isLoadingComunidade, isErrorComunidade } = CNC.getComunidades()
    const { localidadesData, isLoadingLocalidade, isErrorLocalidade } = CNC.getLocalidades()
    const { cidadesData, isLoadingCidade, isErrorCidade } = CNC.getCidades()
    const { estadosData, isLoadingEstado, isErrorEstado } = CNC.getEstados()

    if (isErrorComunidade) return <div>Falha ao carregar comunidades do caminho</div>
    if (isErrorLocalidade) return <div>Falha ao carregar localidades do caminho</div>
    if (isErrorCidade) return <div>Falha ao carregar cidades do caminho</div>
    if (isErrorEstado) return <div>Falha ao carregar cidades do caminho</div>

    if (isLoadingComunidade) return <div>Carregando ...</div>
    if (isLoadingLocalidade) return <div>Carregando ...</div>
    if (isLoadingCidade) return <div>Carregando ...</div>
    if (isLoadingEstado) return <div>Carregando ...</div>

    const comunidades: Comunidade[] = comunidadesData.data;
    const localidades: Localidade[] = localidadesData.data;
    const cidades: Cidade[] = cidadesData.data;
    const estados: Estado[] = estadosData.data;

    function getCidade(id_cidade: number) {
        return cidades.filter(cidade => cidade.id_cidade === id_cidade)
    }

    function getEstado(id_estado:number) {
        return estados.filter(uf => uf.id_estado === id_estado)
    }

    return (
        <>
            <div className="row">
                {comunidades.map((comunidade: Comunidade) => (
                    <div id={comunidade.id_comunidade.toString()} className="col-md-3 py-1">
                        <div className="card" style={{ width: "18rem;" }}>
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                            <div className="card-body">
                                <h5 className="card-title text-center">ALAGOAS</h5>
                                <p className="card-text"></p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Comunidade: {comunidade.nu_comunidade}</li>
                                <li className="list-group-item">Quantidade de irmãos: {comunidade.nu_qtde_irmaos}</li>
                                <li className="list-group-item">Outras info: {comunidade.tx_observacao} </li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link">Mais detalhes</a>
                                <a href="#" className="card-link">Enviar email</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
