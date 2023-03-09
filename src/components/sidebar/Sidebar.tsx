import Link from "next/link";
import { useState } from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { BiArrowFromRight } from "react-icons/bi";
import { BsChevronDoubleDown } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";

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

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const menus: IMenus[] = [
    { href: "/", title: "Dashboard" },
    {
      href: "/",
      title: "Carimas",
      submenu: true,
      submenuItems: [
        { href: "/carisma", title: "Levantados" },
        { href: "/carisma", title: "Matrimonio" },
      ],
    },
    { href: "/equipe", title: "Equipe", spacing: true },
    { href: "/pessoa", title: "Pessoas" },
    { href: "/comunidade", title: "Comunidades", spacing: true },
    { href: "/relatorio", title: "Relatorios" },
  ];

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
          <>
            <Link key={`menu-${index}`} href={menu.href}>
              <li
                key={index}
                className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-lime-700 rounded-md mt-2"
              >
                <span className="text-2xl block float-left">
                  <MdOutlineSpaceDashboard />
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
          </>
        ))}
      </div>
    </div>
  );
}
