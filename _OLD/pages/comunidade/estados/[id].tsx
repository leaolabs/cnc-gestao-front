import { useRouter } from "next/router";
import Base from "../..";
import TableBody from "../../../components/comunidade/cidade/TableBody";

export default function EstadoId() {
    
    const router = useRouter()
    const { id, nomeEstado } = router.query

    return (
        <Base>
            <h2>Comunidades - {nomeEstado}</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Comunidades</th>
                            <th scope="col">Irmãos</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>

                    <TableBody idEstado={+id} />

                </table>
            </div>
        </Base>
    )
}