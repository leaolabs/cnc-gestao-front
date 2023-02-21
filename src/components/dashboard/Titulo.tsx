interface TituloDashboardProps {
  titulo: string;
  subTitulo: string;
  icone?: JSX.Element;
}

export default function TituloDashboard(props: TituloDashboardProps) {
  return (
    <div className="flex items-center">
      {props.icone}
      <h1 className="text-5xl pr-4">{props.titulo}</h1>
      <h3 className="font-extralight">{props.subTitulo}</h3>
    </div>
  );
}
