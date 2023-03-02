interface TituloDashboardProps {
  titulo: string;
  subTitulo: string;
  icone?: JSX.Element;
}

export default function TituloDashboard(props: TituloDashboardProps) {
  return (
    <div className="flex items-center p-4">
      {props.icone}
      <h1 className="text-5xl pr-4 text-lime-900">{props.titulo}</h1>
      <h3 className="font-extralight text-lime-700">{props.subTitulo}</h3>
    </div>
  );
}
