import {HiOutlineAnnotation,HiOutlineClipboardList, HiOutlineTrash,} from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import FetchData from "../axios/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import CartContext from "@/context/CartContext";
import CartEdit from "@/pages/CartEdit";
import ItemProdListEdit from "./ItemProdListEdit";
import { ToastContainer, toast } from 'react-toastify';


const PedidosVendbyId = () => {
	const [busca, setBusca] = useState("");
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const { isCartOpen, setIsCartOpen, editPedido, setEditPedido,vend,setVend, prod, setProd, acertos, setAcertos} = useContext(CartContext);
	const navigate = useNavigate();

	const { id } = useParams();
	
	const getAcertos = async () => {
		try {
			const response = await FetchData.get(`/acerto`);
			const data = response.data;
			setAcertos(data);
		} catch (error) {
			console.log(error);
		}
	}

	const getPedidos = async () => {
		try {
			const response = await FetchData.get(`/pedido/${id}`);
			const data = response.data;
			setEditPedido(data);
		} catch (error) {
			console.log(error);
		}
	};
	
	const notify = () => {
    toast.error(' Pedido Excluido!',{ autoClose: 1500, position: "top-right", pauseOnHover: false});
		deleteOrder()
    setTimeout(() => {
			navigate("/pedidos");
		}, 2500);
  }

	const deleteOrder = async () => {
		try {
			await FetchData.delete(`/pedido/${id}`)
		} catch (error) {
			alert("Erro ao excluir o pedido: " + error.message)
			console.error("Erro ao excluir o pedido:", error)
		}
	}

	const getVend = async () => {
		try {
			const response = await FetchData.get("/vendedor");
			const data = response.data;
			setVend(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateOrder = async () => {
		if (!editPedido.vendedor.nome) {
			alert("Por favor, selecione uma vendedora antes de salvar o pedido");
			return;
		}

		if (editPedido?.produtos?.length === 0) {
			alert("O carrinho está vazio. Adicione produtos antes de salvar o pedido");
			return;
		}

		const orderData = {
			produtos: editPedido.produtos.map((item) => ({
				nome: item.nome,
				quantity: item.quantity,
				preco: item.preco,
			})),
			vendedor:{
				id: editPedido.vendedor.id,
				nome: editPedido.vendedor.nome,
				cidade: editPedido.vendedor.cidade,
				saldo: editPedido.vendedor.saldo,
			},
			data: new Date().toISOString(),
			totalValor: editPedido?.produtos?.reduce((total, item) => (total + item.preco * item.quantity), 0) || 0,
		};

		try {
			await FetchData.put(`/pedido/${id}`, orderData);
			setIsCartOpen(false);
		} catch (error) {
			alert("Erro ao editar o pedido: " + error.message);
			console.error("Erro ao editar o pedido:", error);
		}
	};


	const handleSaveOrder = async () => {

		const orderData = {
			produtos: editPedido.produtos.map((item) => ({
				nome: item.nome,
				quantity: item.quantity,
				preco: item.preco,
			})),
			vendedor:{
				id: editPedido.vendedor.id,
				nome: editPedido.vendedor.nome,
				cidade: editPedido.vendedor.cidade,
				saldo: editPedido.vendedor.saldo,
			},
			data: new Date().toISOString(),
			totalValor: editPedido?.produtos?.reduce((total, item) => (total + item.preco * item.quantity), 0) || 0,
		};

		try {
			await FetchData.post("/pedido", orderData);
			setIsCartOpen(false);
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
		getVend();
		getProds();
		getPedidos();
		getAcertos();
		const timer = setTimeout(() => {
			setLoading(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	const selectedVendId = editPedido?.vendedor?.id;
	const selectedVendedor = vend.find((vendedor) => vendedor._id === selectedVendId);
	let saldoAtual = selectedVendedor ? selectedVendedor.saldo : 0;

	const selectedPedId = editPedido?._id;
	const selectedPedido = acertos?.find((pedido) => pedido?.pedidoId === selectedPedId) || null;
	const acertoID = selectedPedido?._id || null;
	
	const filteredProducts = prod.filter((pdt) => {
		return busca.toLowerCase() === "" ? pdt : pdt.nome.toLowerCase().includes(busca);});

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredProducts.slice(indexOfFirstItem,indexOfLastItem,);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	return (
		<div className="flex flex-col">
			<div>
				<label className="text-gray-800 font-bold text-lg"  htmlFor="vendedora">Vendedora</label>
			<input
				type="text" 
				name="vendedora" 
				className="border font-bold border-black w-full py-2 px-2" 
				value={editPedido?.vendedor?.nome || ''} 
				onChange={(e)=> {setEditPedido}}	
			/>
			</div>
			<p className="font-bold my-3 text-red-500">Saldo Devedor R$: {saldoAtual.toFixed(2)}</p>
			<div className="flex justify-evenly ">
				<button
					onClick={toogleCart}
					className={
						"flex relative items-center gap-2 p-3 bg-blue-500 hover:bg-blue-700 shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4  "
					}
				>
					<HiOutlineClipboardList size={40} />
					Itens Adicionados
					{editPedido?.produtos?.length > 0 && <span className="absolute top-0 right-0 rounded-full flex bg-red-500 h-6 w-6 justify-center items-center">{editPedido?.produtos?.length}</span>}
				</button>
					{!acertoID && (
						<Link
							className="flex items-center gap-2 p-2 bg-black shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4"
							to={`/acertos/${id}`}
						>
							<HiOutlineAnnotation size={40} />
							Realizar Acerto
						</Link>
					)}
				{!acertoID && (
					<button
						onClick={notify}
						className={
							"flex items-center gap-2 p-3 bg-red-500 hover:bg-red-700 shadow-2xl drop-shadow-xl text-white font-bold rounded-lg m-4  "
						}
					>
						<HiOutlineTrash size={40} />
						Excluir Pedido
					</button>
				) 
			}
			</div>
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
					
						currentItems.filter((pdt) => busca.toLowerCase() === "" ? false : pdt.nome.toLowerCase().includes(busca.toLowerCase())
						).map((pdt) => ( <ItemProdListEdit key={pdt._id} data={pdt} />)))}

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
				<CartEdit acerto={acertoID} editPedido={editPedido} handleUpdateOrder={handleUpdateOrder} handleSaveOrder={handleSaveOrder} />
			</div>
			<ToastContainer/>
		</div>
	);
};
export default PedidosVendbyId;
