import Select from "react-select"
import { useEffect, useState } from "react"
import Estado from "../../model/Estado"
import Pais from "../../model/Pais"
import { EstadosData, PaisesData } from "../../pages/api/cncApi"


export default function ComunidadeList(): JSX.Element {

    const [estados, setEstados] = useState<Estado[]>()
    const [pais, setPais] = useState<Pais>(null)

    const { paisesData, isLoadingPais, isErrorPais } = PaisesData()

    if (isErrorPais) return <div>Falha ao carregar paises do caminho</div>
    if (isLoadingPais) return <div>Carregando ...</div>

    const paises: Pais[] = paisesData.data;

    const optionsPaises = [];

    paises.map((pais) => {
        optionsPaises.push({
            value: pais.id_pais,
            label: pais.no_pais
        })
    })

    function handleChange(option: { value: number, label: string }): void {
        const paisSelecionado = paises.find(p => p.id_pais === option.value)
        setPais(paisSelecionado)
    }

    // const { estadosData, isLoadingEstado, isErrorEstado } = EstadosData()

    // if (isErrorEstado) return <div>Falha ao carregar cidades do caminho</div>

    // if (isLoadingEstado) return <div>Carregando ...</div>

    const [estado, setEstado] = useState([])


    return (
        <div className="row">

            <Select
                placeholder="Selecione um pais"
                onChange={op => handleChange(op)}
                options={optionsPaises} />

            <br /> <br />

            {pais !== null ? (
                <div className="col-md-3 py-1">
                    <div className="card" style={{ width: "18rem" }}>
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Bandeira do Estado" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                        <div className="card-body">
                            <h5 className="card-title text-center">{pais.no_pais}</h5>
                            <p className="card-text"></p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"> <b> Sigla: </b> SP </li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link">Mais detalhes</a>
                            <a href="#" className="card-link">Enviar email</a>
                        </div>
                    </div>
                </div>
            ) : false}
        </div>
    )
}
