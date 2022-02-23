import Header from "./header";
import Nav from "./nav";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Nav />
                    {children}
                </div>
            </div>
        </>
    )
}