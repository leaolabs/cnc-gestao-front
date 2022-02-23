import Link from "next/link";

export default function Nav() {
    return (
        <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link active" aria-current="page">
                                    <span className="bi bi-house"></span>
                                    &nbsp; Dashboard
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="bi bi-file-earmark-bar-graph"></span>
                                &nbsp; Relatórios
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link href="/pessoa/pessoa/">
                                <a className="nav-link">
                                    <span className="bi bi-person-bounding-box"></span>
                                    &nbsp; Pessoas
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Outras configurações</span>
                        <a className="link-secondary" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <Link href="/regioes/regioes/">
                                <a className="nav-link">
                                    <span className="bi bi-geo-alt"></span>
                                    &nbsp; Regiões
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="bi bi-people-fill"></span>
                                &nbsp; Comunidades
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}