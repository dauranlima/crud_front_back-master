import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";
import FetchData from "../axios/config";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

const ProdList = () => {
  const [prod, setProd] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


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

  return (
    <>
    <div className="flex flex-col">
        <div>
					<p>Quantidade de produtos cadastrado: {prod.length}</p>
          <input
            className="border border-black w-full p-2 text-black"
            type="search"
            placeholder="Digite aqui para pesquisar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <div className=" max-h-[600px] overflow-auto ">
          {loading ? (<p>Carregando produtos....</p>
          ) : currentItems.length === 0 ? (
            <div><p>Sem produtos para carregar</p></div>
          ) : (
            currentItems.filter((pdt) =>{ return busca.toLowerCase() === '' ? pdt  : pdt.nome.toLowerCase().includes(busca)})
            .map((pdt) => (
              <div key={pdt._id}>
              <div  className="py-1 px-2 border border-gray-300 my-3 flex justify-between gap-5 items-start"
              >
              <div className="flex items-center gap-4">
                  <img 
                    src={"/laundry.png"} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-bold text-lg ">{pdt.nome.toLowerCase()}</h2>
                    <div>
                      <span className="font-bold"> Preço: </span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pdt.preco)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-8">
                  <button onClick={() => handleDelete(pdt._id)} className="text-red-500">
                    <HiOutlineTrash size={24} />
                  </button>
                  <Link to={`/EditProduto/${pdt._id}`}>
                    <HiPencilAlt size={24} />
                  </Link>
                </div>
              </div>
              </div>
            ))          )}
                <div className="flex justify-center gap-2 ">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:bg-gray-500"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-white bg-slate-700 rounded-md">
          {currentPage} de {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:bg-gray-500"
        >
          Próxima
        </button>
      </div>
        </div>
      </div>
    </>
  );
};export default ProdList;