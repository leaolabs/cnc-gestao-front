import { ClipLoader } from "react-spinners";
import BaseMaster from ".";

export default function Carregando() {
  let inicioRequest = new Date();

  return (
    <BaseMaster>
      <h2 className="text-sm font-bold">
        Inicio request:{" "}
        <span className="italic font-light">{inicioRequest.toString()}</span>
      </h2>
      <ClipLoader></ClipLoader>
    </BaseMaster>
  );
}
