import Link from "next/link"
import { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import ICidade from "../../../model/ICidade"
import { CidadesData } from "../../../pages/api/cncApi"

interface TableBodyProps {
    idEstado: number
}


export default function TableBody(props: TableBodyProps): JSX.Element {

    const { cidadesData, isLoadingCidade, isErrorCidade } = CidadesData()
    const [cidades, setCidades] = useState<ICidade[]>()
    useEffect(function persistirCidades() {
        if (cidadesData) setCidades(cidadesData.data)

    }, [cidadesData])

    if (!cidades) return <ClipLoader />

    return (
        <tbody>
            {cidades.filter(c => c.id_estado === props.idEstado).map((cidade) => (
                <tr key={`table-tr-cidade-${cidade.id_cidade}`}>
                    <td>{cidade.id_cidade}</td>
                    <td>{cidade.no_cidade}</td>
                    <td>123</td>
                    <td>39829</td>
                    <td>
                        <Link href={{
                            pathname: "cidades/[id]",
                            query: {
                                id: cidade.id_cidade,
                                nomeCidade: cidade.no_cidade
                            }
                        }}>
                            mais detalhes
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}