import {
	HiOutlineDocumentSearch,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import FetchData from "../axios/config";
import { Link } from "react-router-dom";

const VendPedido = () => {
	const [pedido, setPedido] = useState([]);
	const [busca, setBusca] = useState("");
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const getPedidos = async () => {
		try {
			const response = await FetchData.get("/pedido");
			const data = response.data;
			const sortedData = data.sort((a, b) => new Date(a.data) - new Date(b.data));
			setPedido(sortedData);
			setLoading(false);
			console.log(pedido);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getPedidos();
		const timer = setTimeout(() => {
			setLoading(false);
		}, 10000);
		return () => clearTimeout(timer);
	}, []);

	const filteredOrders = pedido.filter((ped) => {
		return busca.toLowerCase() === ""
			? ped
			: ped.vendedor.toLowerCase().includes(busca);
	});
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredOrders.slice(indexOfFirstItem,indexOfLastItem,);
	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

	return (
		<>
			<div className="flex flex-col">
				<div>
					<input
						className="border border-black w-full p-2 text-black"
						type="search"
						placeholder="Digite aqui para pesquisar um pedido"
						value={busca}
						onChange={(e) => setBusca(e.target.value)}
					/>
				</div>

				<div>
          {/* -----------LISTA------------- */}
          
					{loading ? (<p>Carregando pedidos....</p>
          ) : currentItems.length === 0 ? (
            <div><p>Não há pedidos para carregar</p></div>
          ) : (
            currentItems
						.filter((ped) =>{
							return busca.toLowerCase() === '' 
							? ped
							: ped.vendedor.toLowerCase().includes(busca)
						})
            .map((ped) => (
              <div key={ped._id}>
              <div   className="py-1 px-2 border bg-slate-300 border-gray-500 rounded-lg my-3 flex justify-between gap-5 items-center">
              <div className="flex items-center gap-4">
                  <div>
                    <h2 className="font-bold text-lg ">{ped.vendedor}</h2>
                    <div>
                    <p className="font-bold text-lg ">Data: {new Date(ped.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <Link className="text-slate-800" to={`/pedidosvendbyid/${ped._id}`}>
                    <HiOutlineDocumentSearch className="text-indigo-700 hover:text-pink-400"  size={48} />
                  </Link>
                </div>
              </div>
              </div>
            )))}
					{/* --------------paginação ---------------------- */}
					<div className="flex justify-center gap-2 ">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-pink-600 disabled:bg-gray-500"
						>
							Anterior
						</button>
						<span className="px-4 py-2 text-white bg-slate-700 rounded-md">
							{currentPage} de {totalPages}
						</span>
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
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
