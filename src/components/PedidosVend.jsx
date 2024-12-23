import {HiOutlineAnnotation,HiOutlineClipboardList,} from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import FetchData from "../axios/config";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";
import CartContext from "@/context/CartContext";
import ItemProdList from "./itemProdList";

const PedidosVend = () => {
	const [busca, setBusca] = useState("");
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 7;
	const { isCartOpen, setIsCartOpen, cartItems, prod, setProd} =
	useContext(CartContext);

	const toogleCart = () => {
		setIsCartOpen(!isCartOpen);
	};

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
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	const filteredProducts = prod.filter((pdt) => {
		return busca.toLowerCase() === ""
			? pdt
			: pdt.nome.toLowerCase().includes(busca);
	});

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredProducts.slice(indexOfFirstItem,indexOfLastItem,);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	return (
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
				<button
					onClick={toogleCart}
					className={
						"flex items-center gap-2 p-3 bg-blue-500 shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4  "
					}
				>
					<HiOutlineClipboardList size={40} />
					Itens Adicionados
					{cartItems.length > 0 && <span className="absolute top-0 right-0 rounded-full flex bg-red-500 h-6 w-6 justify-center items-center">{cartItems.length}</span>}
				</button>
				<Link
					className="flex items-center gap-2 p-2 bg-black shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4"
					to={"/"}
				>
					<HiOutlineAnnotation size={40} />
					Realizar Acerto
				</Link>
			</div>
			{/* --------------LISTA ---------------------- */}
			<div>
				{loading ? (<p>Carregando produtos....</p>) : currentItems.length === 0 ? (
					<div>
						<p>Sem produtos para carregar</p>
					</div>
				) : (
					currentItems.filter((pdt) => {return busca.toLowerCase() === ""? pdt: pdt.nome.toLowerCase().includes(busca);})
						.map((pdt) => ( <ItemProdList key={pdt._id} data={pdt}  /> )))}
				{/* ------------------- paginação------------------- */}
				<div className="flex justify-center gap-2 ">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-500"
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
						className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-500"
					>
						Próxima
					</button>
				</div>
				<Cart isCartOpen={isCartOpen} />
			</div>
		</div>
	);
};
export default PedidosVend;
