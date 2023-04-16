import Link from "next/link";
import { useState } from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { BiArrowFromRight, BiChurch } from "react-icons/bi";
import { BsChevronDoubleDown } from "react-icons/bs";
import { MdOutlineSpaceDashboard, MdOutlineEmojiPeople } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

interface ISubmenuItem {
  title: string;
  href: string;
}

interface IMenus {
  title: string;
  href: string;
  submenu?: boolean;
  submenuItems?: ISubmenuItem[];
  spacing?: boolean;
  icone?: JSX.Element;
}

const menus: IMenus[] = [
  { href: "/", title: "Dashboard", icone: <MdOutlineSpaceDashboard /> },
  {
    href: "/",
    title: "Carimas",
    icone: <MdOutlineEmojiPeople />,
    submenu: true,
    submenuItems: [
      { href: "/carisma", title: "Levantados" },
      { href: "/carisma", title: "Matrimonio" },
    ],
  },
  { href: "/equipe", title: "Equipe", spacing: true, icone: <IoIosPeople /> },
  { href: "/pessoa", title: "Pessoas", icone: <IoPeopleSharp /> },
  {
    href: "/comunidade",
    title: "Comunidades",
    icone: <BiChurch />,
    spacing: true,
  },
  { href: "/relatorio", title: "Relatorios", icone: <TbReport /> },
  {
    href: "https://github.com/leaolabs/cnc-gestao-front",
    title: "Projeto (fonte)",
    icone: <FaGithub />,
  },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div
      className={`bg-green-800 h-screen p-5 pt-8
        ${sidebarOpen ? "w-72" : "w-20"} duration-300 relative`}
    >
      <BiArrowFromRight
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`bg-white text-3xl rounded-full absolute -right-3 top-9 border border-green-600 cursor-pointer
          ${!sidebarOpen && "rotate-180"} `}
      />

      <div className="inline-flex">
        <AiFillEnvironment
          className={`bg-amber-600 text-4xl rounded cursor-pointer block float-left mr-2 duration-500
            ${sidebarOpen && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300
             ${!sidebarOpen && "scale-0"}`}
        >
          CNC Gestão
        </h1>
      </div>

      <div className="pt-2">
        {menus.map((menu, index) => (
          <div key={`menu-${index}`}>
            <Link href={menu.href}>
              <li
                key={index}
                className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-lime-700 rounded-md mt-2"
              >
                <span className="text-2xl block float-left">
                  {menu.icone ? menu.icone : <MdOutlineSpaceDashboard />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-300 ${
                    !sidebarOpen && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && sidebarOpen && (
                  <BsChevronDoubleDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </li>

              {menu.submenu && submenuOpen && sidebarOpen && (
                <ul>
                  {menu.submenuItems?.map((submenuItem, index) => (
                    <Link key={`subitem-menu-${index}`} href={submenuItem.href}>
                      <li
                        key={index}
                        className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-lime-700 rounded-md mt-2 px-5"
                      >
                        {submenuItem.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
