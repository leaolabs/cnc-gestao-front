import Estado from "../../model/Estado"
import { EstadosData, PaisesData} from "../../pages/api/cncApi"
import Select from "react-select"
import Pais from "../../model/Pais"

export default function ComunidadeList() {
    const { estadosData, isLoadingEstado, isErrorEstado } = EstadosData()
    const { paisesData, isLoadingPais, isErrorPais } = PaisesData()

    if (isErrorEstado) return <div>Falha ao carregar cidades do caminho</div>
    if (isErrorPais) return <div>Falha ao carregar paises do caminho</div>
    
    if (isLoadingEstado) return <div>Carregando ...</div>
    if (isLoadingPais) return <div>Carregando ...</div>

    const estados: Estado[] = estadosData.data;
    const paises: Pais[] = paisesData.data;

    const optionsPaises = [];
    paises.map((pais) => {
        optionsPaises.push({
            value: pais.id_pais,
            label: pais.no_pais
        })
    })

    return (
        <>
            <div className="row">                
                <Select options={optionsPaises} />
                <br />
                <br />
                {estados.filter(e => e.id_pais === 1).map((estado: Estado) => (
                    <div key={estado.id_estado.toString()} className="col-md-3 py-1">
                        <div className="card" style={{ width: "18rem;" }}>
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                            <div className="card-body">
                                <h5 className="card-title text-center">{estado.no_estado}</h5>
                                <p className="card-text"></p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"> <b> Sigla: </b> {estado.sg_estado} </li>
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
