import Select from "react-select"
import { useEffect, useState } from "react"
import Link from "next/link"
import ClipLoader from "react-spinners/ClipLoader"

import { EstadosData, PaisesData } from "../../pages/api/cncApi"
import IEstado from "../../model/IEstado"
import IPais from "../../model/IPais"

const initialState: IPais = {
    id_pais: 1,
    co_ddi: 55,
    no_continente: "América",
    no_pais: "Brasil",
    sg_pais: "BR"
}

export default function ComunidadeList(): JSX.Element {

    const [paises, setPaises] = useState<IPais[]>()
    const [pais, setPais] = useState<IPais>(initialState)
    const [estados, setEstados] = useState<IEstado[]>()

    const { paisesData, isLoadingPais, isErrorPais } = PaisesData()
    useEffect(function persistPaises() {
        if (paisesData) {
            setPaises(paisesData.data)
        }
    }, [paisesData])

    const { estadosData, isLoadingEstado, isErrorEstado } = EstadosData()
    useEffect(function persistEstados() {
        if (estadosData) {
            setEstados(estadosData.data)
        }
    }, [estadosData])


    if (!paises) return <ClipLoader />
    if (!estados) return <ClipLoader />

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
                defaultValue={{ value: 1, label: "Brasil" }}
                options={optionsPaises} />


            <div className="row row-cols-1 row-cols-md-3 g-4">
                {estados.filter(uf => uf.id_pais === pais.id_pais).map((estado: IEstado) => (
                    <div key={`estado-id-${estado.id_estado}`} className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{estado.no_estado}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{estado.sg_estado}</h6>
                                <p className="card-text">
                                    Comunidades: TODO <br />
                                </p>
                                <Link href={{
                                    pathname: `estados/[id]`,
                                    query: {
                                        id: estado.id_estado,
                                        nomeEstado: estado.no_estado
                                    }
                                }} >
                                    Mais detalhes
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
