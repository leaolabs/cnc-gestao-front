interface InputPesquisaProps {
  placeholder: string;
  svgIcone: JSX.Element;
  onChange: (valor: any) => void;
  valor: any;
}

export default function InputPequisa(props: InputPesquisaProps) {
  return (
    <div className="bg-lime-300 p-2 mt-3 rounded-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {props.svgIcone}
        </div>
        <input
          type="text"
          name="search"
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.valor}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg hover:bg-lime-100 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        />
      </div>
    </div>
  );
}
