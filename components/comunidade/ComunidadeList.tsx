import Select from "react-select"
import { useEffect, useState } from "react"
import Estado from "../../model/Estado"
import Pais from "../../model/Pais"
import { EstadosData, PaisesData, useFetch } from "../../pages/api/cncApi"
import Link from "next/link"


export default function ComunidadeList(): JSX.Element {
    const initialState: Pais = {
        id_pais: 1,
        co_ddi: 55,
        no_continente: "America",
        no_pais: "Brasil",
        sg_pais: "BR"
    }

    const [paises, setPaises] = useState<Pais[]>()
    const [pais, setPais] = useState<Pais>(initialState)

    useEffect(function persistPaises() {
        if (paisesData) {
            setPaises(paisesData.data)
        }
    })

    const [estados, setEstados] = useState<Estado[]>()
    useEffect(function persistEstados() {
        if (estadosData) {
            setEstados(estadosData.data)
        }
    })

    const { paisesData, isLoadingPais, isErrorPais } = PaisesData()
    const { estadosData, isLoadingEstado, isErrorEstado } = EstadosData()

    if (!paises) return <div>Carregando paises...</div>
    if (!estados) return <div>Carregando estados...</div>

    const optionsPaises = [];

    paises.map((p) => {
        optionsPaises.push({
            value: p.id_pais,
            label: p.no_pais
        })
    })

    function onChangeSelectPais(option: { value: number, label: string }): void {
        const paisSelecionado = paises.find(p => p.id_pais === option.value)
        setPais(paisSelecionado)
    }

    return (
        <div className="row">

            <Select
                placeholder="Selecione um pais"
                onChange={op => onChangeSelectPais(op)}
                defaultValue={{value: 1, label: "Brasil"}}
                options={optionsPaises} />

            <br /> <br />

            {pais !== null ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {estados.filter(uf => uf.id_pais === pais.id_pais).map((estado: Estado) => (
                        <div key={`estado-id-${estado.id_estado}`} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{estado.no_estado}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{estado.sg_estado}</h6>
                                    <p className="card-text">
                                        Comunidades: TODO <br />
                                    </p>
                                    <Link href={`${pais.id_pais}`}>
                                        <a className="card-link">Mais detalhes</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : false}
        </div>
    )
}
