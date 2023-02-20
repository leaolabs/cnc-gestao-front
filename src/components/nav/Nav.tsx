import Link from "next/link";

interface NavProps {
  descricao: string;
  url: string;
}

export default function Nav(props: NavProps) {
  return (
    <>
      <Link
        href={props.url}
        className="block py-2.5 px-4 rounded transition duration-200 text-green-100 hover:text-white hover:bg-green-600"
      >
        {props.descricao}
      </Link>
    </>
  );
}
