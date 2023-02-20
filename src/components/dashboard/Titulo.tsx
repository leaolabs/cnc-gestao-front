interface TituloDashboardProps {
  titulo: string;
  subTitulo: string;
}

export default function TituloDashboard(props: TituloDashboardProps) {
  return (
    <>
      <h1 className="text-5xl">{props.titulo}</h1>
      <h3 className="font-extralight">{props.subTitulo}</h3>
    </>
  );
}
