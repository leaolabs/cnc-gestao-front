import jsPDF from "jspdf";
import caminhoLogo from '../../public/caminho-logo.png'
import Base from "..";

export default function Relatorios() {

    const doc = new jsPDF();


    function gerarCabecalho() {
        doc.addImage(caminhoLogo.src, 'PNG', 2, 5, 40, 20)
        doc.text("Caminho Necocatecumenal - Relatorio de Comunidades", 45, 15)
        doc.text("Teste PDF sendo gerado no CNC", 10, 50)
        doc.save("excluir-isso")
    }

    console.log(caminhoLogo);

    return (
        <Base>
            <div>
                <h3>Teste</h3>
                <img src={caminhoLogo.src} alt="Caminho logo" />
                <button onClick={gerarCabecalho}>Teste</button>
            </div>
        </Base>
    )
}