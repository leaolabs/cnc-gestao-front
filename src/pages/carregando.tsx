import { ClipLoader } from "react-spinners";
import RootLayout from ".";

interface CarregandoProps {
  objetoCarregando: string;
}

export default function Carregando(props: CarregandoProps) {
  return (
    <RootLayout>
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
