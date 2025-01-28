	import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlinePrinter, HiOutlineSave } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import FetchData from "@/axios/config";


export default function AcertoCart() {
	
	const { editPedido, vend, setVend,acertos, setAcertos  } = useContext(CartContext);
	const [somaTotal, setSomaTotal] = useState([]);
	const [percentual] = useState(25);
	const [acerto] = useState(0);
	const { vendedor } = editPedido || {};
	const calcularDesconto = () => {const valorDesconto = somaTotal * (percentual / 100 );return valorDesconto;};
	const valorAtual = () => {const valorAtual = somaTotal - calcularDesconto() ;return valorAtual;}
	const total = () => vendedor?.saldo ? valorAtual() + vendedor.saldo : valorAtual();
	const faltaAcertar = () => total().toFixed(2) - acerto 

	const { id } = useParams();
		
	const getAcertos = async () =>{
		try {
			const response = await FetchData.get(`/acerto/${id}`);
			const data = response.data;
			setAcertos(data);
		} catch (error) {
			console.log(error);
		}
	}
	const getVend = async () => {
		try {
			const response = await FetchData.get("/vendedor");
			const data = response.data;
			const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
			setVend(sortedData);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getVend();
		getAcertos();
	}, []);

	console.log(acertos);
	

	const selectedVendId = editPedido?.vendedor?.id;
	const selectedVendedor = vend.find((vendedor) => vendedor._id === selectedVendId);
	let saldoAtual = selectedVendedor ? selectedVendedor.saldo : 0;
		
	return (
		<div
			className={`w-full bg-gray-200 fixed top-[112px] px-10 border border-gray-500 
		transition-all duration-500 right-0 h-[calc(100%-120px)] justify-between flex flex-col  `}
		>
			{/* ----------------------- header ----------------------- */}
			<div className="flex flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">
					Acerto Realizado
				</h2>
				<h1>
					Vendedor: {acertos?.vendedor?.nome}
				</h1>
				<h3 className="font-semibold text-slate-500 mx-2">
					Data do Acerto: {acertos?.dataAcerto ? new Date(acertos.dataAcerto).toLocaleDateString("pt-BR") : "N/A"}
				</h3>
				<div className=" mb-4 flex justify-center font-bold">
					<span className="w-[335px] ">Produto</span>
					<span className="inline w-32">Valor Total</span>
					<span>Devolvido</span>
					<span className="ml-12">Total Vendido</span>
				</div>
			</div>
			<div className="overflow-auto   grow  mb-3">
				<div className="flex  justify-center flex-col items-center ">
					{acertos?.produtos?.map((produto) => (
						<div key={produto._id} className="flex justify-center w-full mb-2">
							<div className="flex flex-col ">
									<span className="w-[350px]">{produto?.nome || 'N/A'}</span>
								<div>
									<p className=" inline text-slate-600 font-bold mr-3 text-lg">
									{produto?.quantity }
									x
									</p>
									<span className="text-blue-500 font-semibold">
									{formatCurrency(produto?.preco, 'BRL')}
									</span>
								</div>
						</div>
							<span className="w-32 font-bold">
								{formatCurrency((produto?.preco || 0) * (produto?.quantity || 0), "BRL")}
							</span>
							<span className="w-32 text-center">{produto?.devolvido || 0 }</span>
							<span className="w-32 font-bold">
									{formatCurrency((produto?.quantity - produto?.devolvido) * produto?.preco || 0, "BRL")}
							</span>
						</div>
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
								Total em Produtos {formatCurrency((acertos?.totalValor || 0), "BRL")}
							</p>
						</div>
						<div className="flex justify-start">
							<p className="text-slate-500 font-semibold text-lg">
								Total em Produtos Vendidos R$: {formatCurrency(acertos.totalVendido || 0, "BRL")}
							</p>
						</div>
						<p className="text-slate-500 font-semibold text-lg">
								Percentual de Produtos Vendidos: {((acertos.totalVendido/acertos.totalValor)*100).toFixed(2)}%
							</p>
						<div className="flex justify-start">
							<p className="text-slate-500 font-semibold text-lg">Descontos:</p>
							<span>
								<input
									className="w-20 pl-6"
									type="number"
									placeholder="%"
									value={acertos.percentual}
									max="50"
									min="0"
								/>
							</span>
							
							<p className="text-green-600 ml-4 font-bold text-xl">R$:{(acertos?.descontos || 0).toFixed(2)}</p>
						</div>
						<div className="flex justify-start">
							<p className="text-slate-950 font-semibold text-lg">
								Valor Atual R$: {formatCurrency((acertos?.saldoAtual || 0).toFixed(2), 'BRL')}
							</p>
						</div>

						{/* ----------------------- botões ----------------------- */}
					</div>
					<div>
						<div className="flex justify-start">
							<p className="text-red-500 font-semibold text-lg">
								Saldo Devedor R$:  {formatCurrency(((acertos?.saldoAntigo ?? 0)).toFixed(2), 'BRL')}		
							</p>
						</div>
						<div>
							<p className="text-black font-bold text-lg">Total R$: {formatCurrency(Number(acertos.totalAcerto).toFixed(2), 'BRL')}</p>
						</div>
						<div className="flex gap-2">
							<p className="text-slate-500 font-semibold text-lg">Acerto R$:</p>
							<span className="font-bold text-lg text-center">{formatCurrency(acertos.recebido || 0, 'BRL')}</span>
						</div>
						<div>
							<p className={`font-semibold text-lg ${faltaAcertar() < 0 ? 'text-green-600' : faltaAcertar() === 0 ? 'text-blue-500' : 'text-red-500'}`}>
								{
									acertos.novoSaldoVendedor === 0 ? (<span className="text-2xl">Quitado</span>)
									:acertos.novoSaldoVendedor < 0 ? (<span>Positivo R$: {(Math.abs(acertos.novoSaldoVendedor)).toFixed(2)}</span>)
									:(<span>Falta Acertar R$: {(Math.abs(acertos.novoSaldoVendedor).toFixed(2))}</span>)
								}
							</p>
						</div>
					</div>
					{/* ---nova divisao --- */}
					<div className="flex gap-4 my-4">
						<Link to={'/acertoprint'}>
							<button
								className="border bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black"
							>
								<HiOutlinePrinter className="animate-pulse" size={24} />
								Imprimir Acerto
							</button>
						</Link>
					</div>
				<ToastContainer />
				</div>
					<textarea
            className="border my-3 border-black w-full p-2 text-black resize-y"
            placeholder="Anotações do acerto"
            rows={2}
						value={acertos.observacao}
          />
			</div>
		</div>
	);
}