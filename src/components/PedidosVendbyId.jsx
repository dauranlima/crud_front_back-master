import {HiOutlineAnnotation,HiOutlineClipboardList, HiOutlineSave,} from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import FetchData from "../axios/config";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";
import CartContext from "@/context/CartContext";
import ItemProdList from "./itemProdList";

const PedidosVendbyId = () => {
	const [busca, setBusca] = useState("");
	const [vend, setVend] = useState("");
	const {pedido, setPedido} = useContext(CartContext);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 7;
	const { isCartOpen, setIsCartOpen, cartItems, setCartItems, prod, setProd} = useContext(CartContext);


	const handleClearCart = () => {
		setCartItems([]);
	};
	
	const handleSaveOrder = async () => {
		if (!vend) {
			alert("Por favor, selecione uma vendedora antes de salvar o pedido");
			return;
		}

		if (cartItems.length === 0) {
			alert("O carrinho está vazio. Adicione produtos antes de salvar o pedido");
			return;
		}

		const orderData = {
			produtos: cartItems.map((item) => ({
				produto: item.nome,
				quantidade: item.quantity,
				preco: item.preco,
			})),
			vendedor: vend,
			data: new Date().toISOString(),
			totalValor: cartItems.reduce(
				(acc, item) => acc + item.preco * item.quantity,
				0
			),
		};

		try {
			const response = await FetchData.post("/pedido", orderData);
			console.log(response.data)
			setIsCartOpen(false);
			handleClearCart();
		} catch (error) {
			alert("Erro ao salvar o pedido: " + error.message);
			console.error("Erro ao salvar o pedido:", error);
		}
	};
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
		return busca.toLowerCase() === "" ? pdt : pdt.nome.toLowerCase().includes(busca);});

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredProducts.slice(indexOfFirstItem,indexOfLastItem,);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	return (
		<div className="flex flex-col">
			<div>
				<select
					className="border border-black w-full p-2 text-black"
					value={vend}
					onChange={(e) => setVend(e.target.value)}
				>
					<option value="">Selecione uma vendedora</option>
					<option value="vendedora1">Vendedora 1</option>
					<option value="vendedora2">Vendedora 2</option>
					<option value="vendedora3">Vendedora 3</option>
					<option value="vendedora4">Vendedora 4</option>
					<option value="vendedora5">Vendedora 5</option>
					<option value="vendedora6">Vendedora 6</option>
					<option value="vendedora7">Vendedora 7</option>
					<option value="vendedora8">Vendedora 8</option>
					<option value="vendedora9">Vendedora 9</option>
					<option value="vendedora10">Vendedora 10</option>
				</select>
			</div>
			<div className="flex justify-evenly ">
				<button
					onClick={toogleCart}
					className={
						"flex items-center gap-2 p-3 bg-blue-500 hover:bg-blue-700 shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4  "
					}
				>
					<HiOutlineClipboardList size={40} />
					Itens Adicionados
					{cartItems.length > 0 && <span className="absolute top-0 right-0 rounded-full flex bg-red-500 h-6 w-6 justify-center items-center">{cartItems.length}</span>}
				</button>
				<Link
					className="flex items-center gap-2 p-2 bg-black shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4"
					to={"/acerto"}
				>
					<HiOutlineAnnotation size={40} />
					Realizar Acerto
				</Link>
				
			</div>
			{/* --------------LISTA ---------------------- */}
			<div>
			<div>
				<input
					className="border border-black w-full p-2 text-black"
					type="search"
					placeholder="Digite aqui para pesquisar produtos"
					value={busca}
					onChange={(e) => setBusca(e.target.value)}
				/>
			</div>
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
				<Cart handleSaveOrder={handleSaveOrder} />
			</div>
		</div>
	);
};
export default PedidosVendbyId;
