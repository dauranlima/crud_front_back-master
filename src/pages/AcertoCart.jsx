	import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlinePrinter, HiOutlineSave } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import AcertoCartItem from "@/components/AcertoCartItem";
import FetchData from "@/axios/config";

export default function AcertoCart() {
	
	const { editPedido, vend  } = useContext(CartContext);
	const navigate = useNavigate();
	const contentRef = useRef(null);
	const totalPrice = editPedido.totalValor || [];
	const [somaTotal, setSomaTotal] = useState([]);
	const [percentual, setPercentual] = useState(25);
	const [acerto, setAcerto] = useState(0);
	const { vendedor } = editPedido || {};

	
	const atualizarSomaTotal = (newValue) => setSomaTotal(newValue);
	const calcularDesconto = () => {const valorDesconto = somaTotal * (percentual / 100 );return valorDesconto;};
	const valorAtual = () => {const valorAtual = somaTotal - calcularDesconto() ;return valorAtual;}
	const total = () => vendedor?.saldo ? valorAtual() + vendedor.saldo : valorAtual();
	const faltaAcertar = () => total().toFixed(2) - acerto 
		const notify = () => {
		toast.success(" Acerto Salvo!", {
			autoClose: 2500,
			position: "top-right",
			pauseOnHover: false,
		});
		setTimeout(() => {
			navigate("/pedidos");
		}, 2500);
	};
	const handlePrint = () => {
		const doc = new jsPDF();
		doc.html(contentRef.current, {
			callback: (doc) => {
				doc.save("carrinho.pdf");
			},
		});
		window.print();
	};

	const handleSaveAcerto = async () => {

		const AcertoData = {
			produtos: editPedido.produtos.map((item) => ({
				nome: item.nome,
				quantity: item.quantity,
				preco: item.preco,
			})),
			vendedor:{
				nome: editPedido.vendedor.nome,
				cidade: editPedido.vendedor.cidade,
				saldo: editPedido.vendedor.saldo,
			},
			data: new Date().toISOString(),
			totalValor: editPedido?.produtos?.reduce((total, item) => (total + item.preco * item.quantity), 0) || 0,
		};

		try {
			await FetchData.post("/acerto", AcertoData);
		} catch (error) {
			alert("Erro ao salvar o Acerto: " + error.message);
			console.error("Erro ao salvar o acerto:", error);
		}
	};	
		
	return (
		<div
			className={`w-full bg-gray-200 fixed top-[112px] px-10 border border-gray-500 
		transition-all duration-500 right-0 h-[calc(100%-120px)] justify-between flex flex-col  `}
		>
			{/* ----------------------- header ----------------------- */}
			<div className="flex flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">
					Lista de Produtos na cesta
				</h2>
				<h3 className="font-semibold text-slate-500 mx-2">
					Data do acerto: {new Date().toLocaleDateString("pt-BR")}
				</h3>
				<div className=" mb-4 flex justify-center font-bold">
					<span className="w-80 ">Produto</span>
					<span className="inline w-32">Valor Total</span>
					<span>Devolvido</span>
					<span className="ml-12">Total Vendido</span>
				</div>
			</div>
			<div className="overflow-auto   grow  mb-3">
				<div className="flex  justify-center flex-col items-center ">
					{editPedido?.produtos?.map((item) => (
						<AcertoCartItem
							key={item._id}
							data={item}
							atualizarSomaTotal={atualizarSomaTotal}
						/>
					))}
				</div>
			</div>
			{/* ----------------------- resumo dos valores ----------------------- */}
			<div className="flex border-t border-gray-400 flex-col items-center">
				<h2 className="text-slate-500 font-bold text-lg text-center">
					Resumo dos Valores
				</h2>
				<div className="flex h-40 items-center space-y-1 justify-center px-4  py-2 gap-10 rounded-md">
					<div className=" mx-2 flex flex-col ">
						<div className="flex justify-start">
							<p className="text-slate-500 font-semibold text-lg">
								Total em Produtos {formatCurrency(totalPrice, "BRL")}
							</p>
						</div>
						<div className="flex justify-start">
							<p className="text-slate-500 font-semibold text-lg">
								Total em Produtos Vendidos R$: {somaTotal}
							</p>
						</div>
						<div className="flex justify-start">
							<p className="text-slate-500 font-semibold text-lg">Descontos:</p>
							<span>
								<input
									className="w-20 pl-6"
									type="number"
									placeholder="%"
									value={percentual}
									max="50"
									min="0"
									onChange={(e) => setPercentual(Math.min(50, Math.max(0, e.target.value)))}
								/>
							</span>
							
							<p className="text-green-600 ml-4 font-bold text-xl">R$: {calcularDesconto().toFixed(2)}</p>
						</div>
						<div className="flex justify-start">
							<p className="text-slate-950 font-semibold text-lg">
								Valor Atual R$: {valorAtual().toFixed(2)}
							</p>
						</div>

						{/* ----------------------- botões ----------------------- */}
					</div>
					<div>
						<div className="flex justify-start">
							<p className="text-red-500 font-semibold text-lg">
								Saldo Devedor R$:  {formatCurrency((vendedor?.saldo || 0).toFixed(2), 'BRL')}		
							</p>
						</div>
						<div>
							<p className="text-black font-bold text-lg">Total R$: {formatCurrency(Number(total()).toFixed(2), 'BRL')}</p>
						</div>
						<div className="flex gap-2">
							<p className="text-slate-500 font-semibold text-lg">Acerto R$:</p>
							<span>
								<input
									required
									className="w-24 pl-3  font-bold"
									type="number"
									placeholder="R$"
									onChange={(e)=> setAcerto(e.target.value)}
								/>
							</span>
						</div>
						<div>
							<p className={`font-semibold text-lg ${faltaAcertar() < 0 ? 'text-green-600' : faltaAcertar() === 0 ? 'text-blue-500' : 'text-red-500'}`}>
								{
									faltaAcertar() === 0 ? (<span className="text-2xl">Quitado</span>)
									:faltaAcertar() < 0 ? (<span>Positivo R$: {(Math.abs(faltaAcertar())).toFixed(2)}</span>)
									:(<span>Falta Acertar R$: {(Math.abs(faltaAcertar()).toFixed(2))}</span>)
								}
							</p>
						</div>
					</div>
					{/* ---nova divisao --- */}
					<div className="flex gap-4 my-4">
						<button
							onClick={notify}
							className="bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-600"
						>
							<HiOutlineSave className=" animate-bounce" size={24} />
							Salvar Acerto
						</button>
						<button
							onClick={handlePrint}
							className="border bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black"
						>
							<HiOutlinePrinter className="animate-pulse" size={24} />
							Imprimir
						</button>
					</div>
				<ToastContainer />
				</div>
			</div>
		</div>
	);
}