import { useContext,useRef, useState } from "react";
import { HiOutlinePrinter, HiOutlineSave,  } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { EraserIcon } from "lucide-react";
import AcertoCartItem from "@/components/AcertoCartItem";

export default function AcertoCart() {

	const {editPedido}=useContext(CartContext)
	const navigate = useNavigate();
  const contentRef = useRef(null);
	const totalPrice = editPedido.valorTotal || []
	const [totalVendido, setTotalVendido] = useState(10);
  const notify = () => {
    toast.success(' Pedido Salvo!',{ autoClose: 2500, position: "top-left", pauseOnHover: false});
		createOrder()
    setTimeout(() => {
			navigate("/");

		}, 2500);
  }
	const handlePrint = () => {
    const doc = new jsPDF();
    doc.html(contentRef.current, {
      callback: (doc) => {
        doc.save('carrinho.pdf');
      },
    });
    window.print();
  };
	return (
		<div className={`w-full bg-gray-200 fixed top-[112px] px-10 border border-gray-500 
		transition-all duration-500 right-0 h-[calc(100%-120px)] justify-between flex flex-col  `}>
{/* ----------------------- header ----------------------- */}
			<div className="flex flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">Lista de Produtos na cesta</h2>
				<h3 className="font-semibold text-slate-500 mx-2">Data do acerto: {new Date().toLocaleDateString('pt-BR')}</h3>
				<div className=" mb-4 flex justify-center font-bold">
					<span className='w-80 '>Produto</span>
					<span className="inline w-32">Valor Unitário</span>
					<span>Devolvido</span>
					<span className="ml-12">Total Vendido</span>
				</div>
			</div>
			<div className="overflow-auto   grow  mb-3">
					<div className="flex  justify-center flex-col items-center " >
						{editPedido?.produtos?.map((item) => (
							<AcertoCartItem 
								key={item._id}
								data={item}
							/>
						))}
					</div>
			</div>
{/* ----------------------- resumo dos valores ----------------------- */}
			<div className="flex border-t border-gray-400 flex-col items-center">
				<h2 className="text-slate-500 font-bold text-lg text-center">Resumo dos Valores</h2>
				<div className="flex h-40 items-center space-y-1 justify-center px-4  py-2 gap-10 rounded-md">

				<div className=" mx-2 flex flex-col ">
					<div className="flex justify-start">
						<p className="text-slate-500 font-semibold text-lg">Total em produtos:{totalPrice}</p>
					</div>
					<div className="flex justify-start">
						<p className="text-slate-500 font-semibold text-lg">Total de Produtos vendidos R$:553,00</p>
					</div>
					<div className="flex justify-start">
						<p className="text-slate-500 font-semibold text-lg">Descontos:</p>
						<span><input className="w-20 pl-6" type="number" placeholder="%" /></span>
						<p className="text-green-600 font-bold text-xl">R$ 138,00</p>
					</div>
					<div className="flex justify-start">
						<p className="text-slate-950 font-semibold text-lg">Valor Atual R$:414,00</p>
					</div>

					{/* ----------------------- botões ----------------------- */}
				</div>
				<div>
					<div className="flex justify-start">
						<p className="text-red-500 font-semibold text-lg">Saldo Devedor Atual R$:150,00</p>
					</div>
				<div className="flex gap-2">
						<p className="text-slate-500 font-semibold text-lg">Acerto R$:</p>
						<span><input className="w-24 pl-6 font-bold" type="number" placeholder="R$" /></span>
					</div>
					<div>
						<p className="text-black font-bold text-lg">Total R$:564,00</p>
					</div>
					<div>
						<p className="text-red-500 font-semibold text-lg">Falta Acertar R$:464,00</p>
					</div>
				</div>
				{/* ---nova divisao --- */}
				<div className="flex gap-4 my-4">
					<button onClick={notify} className="bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-600">
						<HiOutlineSave className=" animate-bounce" size={24}/>
						Salvar Acerto
					</button>
					<button
						onClick={handlePrint}
						className="border bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black"
					>
						<HiOutlinePrinter className="animate-pulse" size={24}/>
						Imprimir
					</button>
				</div>
			</div>
			<ToastContainer/>
		</div>
				</div>
	);
}




// const [itemPedido] = useState([
// 	// {
// 	// 	id: 1,
// 	// 	produto: "blusa codigo laranja",
// 	// 	preço: 3,
// 	// 	quantidade: 2,
// 	// 	vlTotal: 6
// 	// },
// 	// {
// 	// 	id: 2,
// 	// 	produto: "Pano branco", 
// 	// 	preço: 500.58,
// 	// 	quantidade: 2,
// 	// 	vlTotal: 1001.16
// 	// },
// 	// {
// 	// 	id: 3,
// 	// 	produto: "Calça Jeans",
// 	// 	preço: 89.90,
// 	// 	quantidade: 1,
// 	// 	vlTotal: 89.90
// 	// },
// 	// {
// 	// 	id: 4,
// 	// 	produto: "Tênis Esportivo",
// 	// 	preço: 199.99,
// 	// 	quantidade: 1,
// 	// 	vlTotal: 199.99
// 	// },
// 	// {
// 	// 	id: 5,
// 	// 	produto: "Camiseta Básica",
// 	// 	preço: 29.90,
// 	// 	quantidade: 3,
// 	// 	vlTotal: 89.70
// 	// },
// 	// {
// 	// 	id: 6,
// 	// 	produto: "Vestido Floral",
// 	// 	preço: 159.90,
// 	// 	quantidade: 1,
// 	// 	vlTotal: 159.90
// 	// },
// 	// {
// 	// 	id: 7,
// 	// 	produto: "Shorts Academia",
// 	// 	preço: 45.50,
// 	// 	quantidade: 2,
// 	// 	vlTotal: 91.00
// 	// },
// 	// {
// 	// 	id: 8,
// 	// 	produto: "Shorts Academia",
// 	// 	preço: 45.50,
// 	// 	quantidade: 2,
// 	// 	vlTotal: 91.00
// 	// },
// ]);