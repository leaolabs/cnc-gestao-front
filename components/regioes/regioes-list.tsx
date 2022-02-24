import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())


export default function RegioesList() {

    const { data, error } = useSWR('https://apicncbrasil.cn.org.br/api/regiao_caminhos', fetcher)

    if (error) return <div>Falha ao carregar regiões do caminho</div>

    if (!data) return <div>Carregando ...</div>

    const regioes = data.data;

    return (
        <>
            <h2>Regiões do Caminho</h2>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome da região</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regioes.map((regiao: any) => (
                            <tr key={regiao.id}>
                                <td>{regiao.id_regiao_caminho}</td>
                                <td>{regiao.no_regiao_caminho}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}