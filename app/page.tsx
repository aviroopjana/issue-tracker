import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        Hello World!
      </div>
      <Pagination itemCount={100} pageSize={10} currentPage={2}/>
    </main>
  )
}

