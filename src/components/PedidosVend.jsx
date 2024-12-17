import { HiMinusCircle, HiOutlineClipboardList, HiOutlineShoppingCart, HiPlusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import FetchData from "../axios/config";
import { Link } from "react-router-dom";
import { ScanQrCodeIcon } from "lucide-react";

const PedidosVend = () => {
  const [prod, setProd] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const getProds = async () => {
    try {
      const response = await FetchData.get("/produtos");
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
    getProds();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (_id) => {
    const confirmed = confirm(" Tem certeza que deseja deletar esse produto");
    if (confirmed) {
      await FetchData.delete("/produtos/" + _id).then(({ data }) => {
        const newArray = prod.filter((item) => item._id !== prod._id);
        setProd(newArray);
        getProds();
      });
    }
  };

  const filteredProducts = prod.filter((pdt) => {
    return busca.toLowerCase() === '' ? pdt : pdt.nome.toLowerCase().includes(busca);
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5;
    const halfMaxButtons = Math.floor(maxButtons / 2);

    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

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
        <div className="flex justify-evenly ">
          <Link className="flex items-center gap-2 p-2 bg-black shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4" to={'/'}><ScanQrCodeIcon size={40} />Ler QRCode</Link>
          <Link className="flex items-center gap-2 p-2 bg-blue-500 shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4 " to={'/cart'}><HiOutlineClipboardList size={40} />Itens Adicionados</Link>
        </div>
        <div className=" max-h-[600px] overflow-scroll">
          {loading ? (<p>Carregando produtos....</p>
          ) : currentItems.length === 0 ? (
            <div><p>Sem produtos para carregar</p></div>
          ) : (
            currentItems.filter((pdt) =>{ return busca.toLowerCase() === '' ? pdt  : pdt.nome.toLowerCase().includes(busca)})
            .map((pdt) => (
              <>
              <div key={pdt._id} className=" space-x-8 mx-2 p-2 border border-gray-300 my-3 flex justify-between "
              >
              <div className="  w-[50%] flex items-center gap-4">
                  <div>
                    <h2 className="font-bold text-slate-600">{pdt.nome.toLowerCase()}</h2>
                    <div>
                      <span className="font-bold text-sm text-slate-600"> Preço: </span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pdt.preco)}
                    </div>
                  </div>
                </div>
                <div className="w-[20%] flex items-center justify-center gap-2">
                  <button className="text-green-500 hover:text-green-700">
                    <HiPlusCircle size={44} />
                  </button>
                  <span className="font-bold">0</span>
                  <button className="text-red-500 hover:text-red-700">
                    <HiMinusCircle size={44} />
                  </button>
                </div>
                <div className="flex gap-2 items-center border border-white shadow-xl py-2 px-4  text-sm rounded-md bg-blue-500 text-white font-bold">
                  <Link to={`/addCart/${pdt._id}`}>
                    <HiOutlineShoppingCart size={24} />
                  </Link>
                </div>
              </div>
              </>
            ))          )}
                <div className="flex justify-center gap-2 ">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-500"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-white bg-slate-700 rounded-md">
          {currentPage} de {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-500"
        >
          Próxima
        </button>
      </div>
        </div>
      </div>
    </>
  );
};export default PedidosVend;