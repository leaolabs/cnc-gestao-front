import BaseMaster from ".";

export default function ErroCarregamento() {
  let inicioRequest = new Date();

  return (
    <BaseMaster>
      <h2 className="text-sm font-bold">
        Ocorreu um erro ao carregar dados da API
      </h2>
    </BaseMaster>
  );
}
