import RootLayout from ".";

interface ErroCarregamentoProps {
  objetoQueDeuErro: string;
}

export default function ErroCarregamento(
  props: ErroCarregamentoProps
): JSX.Element {
  return (
    <RootLayout>
      <h2 className="text-sm font-bold">
        Ocorreu um erro ao carregar dados da API de {props.objetoQueDeuErro}
      </h2>
    </RootLayout>
  );
}
