import { HiOutlineDocumentSearch, HiOutlineLockOpen, HiOutlinePencil, HiPlusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import FetchData from "../axios/config";
import { Link } from "react-router-dom";

const VendPedido = () => {
  const [prod, setProd] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const getVend = async () => {
    try {
      const response = await FetchData.get("/vendedor");
      const data = response.data;
      const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
      setProd(sortedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getVend();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = prod.filter((pdt) => {
    return busca.toLowerCase() === '' ? pdt : pdt.nome.toLowerCase().includes(busca);
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
    <div className="flex flex-col">
        <div>
          <input
            className="border border-black w-full p-2 text-black"
            type="search"
            placeholder="Digite aqui para pesquisar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div  className="  ">
          {loading ? (<p>Carregando vendedoras....</p>
          ) : currentItems.length === 0 ? (
            <div><p>Não há vendedoras para carregar</p></div>
          ) : (
            currentItems.filter((pdt) =>{ return busca.toLowerCase() === '' ? pdt  : pdt.nome.toLowerCase().includes(busca)})
            .map((pdt) => (
              <div key={pdt._id}>
              <div   className="py-1 px-2 border bg-slate-300 border-gray-500 rounded-lg my-3 flex justify-between gap-5 items-center">
              <div className="flex items-center gap-4">
                  <div>
                    <h2 className="font-bold text-lg ">{pdt.nome.toUpperCase()}</h2>
                    <div>
                    <p className="text-slate-600 font-semibold text-lg ">Cidade: {pdt.cidade.toLowerCase()}</p>
                    </div>
                    <div>
                    <p className="font-bold text-lg ">Data: 03/12/2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <Link className="text-slate-800" to={`/pedidosvend/${pdt._id}`}>
                    <HiOutlineDocumentSearch className="text-indigo-700 hover:text-pink-400"  size={48} />
                  </Link>
                </div>
              </div>
              </div>
            ))          )}
                <div className="flex justify-center gap-2 ">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-pink-600 disabled:bg-gray-500"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-white bg-slate-700 rounded-md">
          {currentPage} de {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-pink-600 disabled:bg-gray-500"
        >
          Próxima
        </button>
      </div>
        </div>
      </div>
    </>
  );
};

export default VendPedido;