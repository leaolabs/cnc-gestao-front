import Summary from "../components/summary";

export default function Base({ children }) {
  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

        <Summary />

        {children}
      </main>
    </>
  )
}
