import { ClipLoader } from "react-spinners";
import RootLayout from ".";

interface CarregandoProps {
  objetoCarregando: string;
}

export default function Carregando(props: CarregandoProps) {
  let inicioRequest = new Date();

  return (
    <RootLayout>
      <h2 className="text-sm font-bold">
        Inicio request:{" "}
        <span className="italic font-light">{inicioRequest.toString()}</span>
      </h2>

      <h1>Carregando {props.objetoCarregando}</h1>

      <ClipLoader
        color="#ff4308"
        cssOverride={{}}
        loading
        size={60}
        speedMultiplier={1}
      />
    </RootLayout>
  );
}
