import { useContext,useRef , useState } from "react";
import { HiOutlineAnnotation, HiOutlinePrinter, HiOutlineSave, HiOutlineTrash } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';

export default function Carrinho() {

	const navigate = useNavigate();
  const contentRef = useRef(null);

	const [itemPedido] = useState([
		{
			id: 1,
			produto: "blusa codigo laranja",
			preço: 3,
			quantidade: 2,
			vlTotal: 6
		},
		{
			id: 2,
			produto: "Pano branco", 
			preço: 500.58,
			quantidade: 2,
			vlTotal: 1001.16
		},
		{
			id: 3,
			produto: "Calça Jeans",
			preço: 89.90,
			quantidade: 1,
			vlTotal: 89.90
		},
		{
			id: 4,
			produto: "Tênis Esportivo",
			preço: 199.99,
			quantidade: 1,
			vlTotal: 199.99
		},
		{
			id: 5,
			produto: "Camiseta Básica",
			preço: 29.90,
			quantidade: 3,
			vlTotal: 89.70
		},
		{
			id: 6,
			produto: "Vestido Floral",
			preço: 159.90,
			quantidade: 1,
			vlTotal: 159.90
		},
		{
			id: 7,
			produto: "Shorts Academia",
			preço: 45.50,
			quantidade: 2,
			vlTotal: 91.00
		},
		{
			id: 8,
			produto: "Shorts Academia",
			preço: 45.50,
			quantidade: 2,
			vlTotal: 91.00
		},
	]);


  const notify = () => {
    toast.success(' Pedido Salvo!',{ autoClose: 2500, position: "top-left", pauseOnHover: false});
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
		<div className={`w-full top-[112px] px-10 border border-gray-500 
		transition-all duration-500 bg-white right-0 h-[calc(100%-120px)] justify-between flex flex-col  `}>
{/* ----------------------- header ----------------------- */}
			<div className="flex flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">
					Lista de Produtos na cesta
				</h2>
				<h3 className="font-semibold text-slate-500 mx-2">Data:07/12/2024</h3>
			</div>
{/* ----------------------- LISTA ----------------------- */}
			<div className="overflow-auto mb-12">
				{itemPedido.length === 0 ? (
					<>
					<div className="flex items-center justify-center flex-col gap-2">
						<img className="h-32 w-32" src="/business.png" alt="basket"/>
						<p className="text-center text-slate-500 font-semibold">Cesta vazia</p>
					</div>
					</>
				) : (
					<div>
						{itemPedido.map((item, i) => (
							<div key={item.id}
							
								className="flex border border-slate-100 justify-between items-center p-2"
							>
								<div ref={contentRef}>
									<span className="text-slate-600">
										{i + 1}
										<p className=" text-slate-600">{item.produto}</p>
									</span>
									<p className=" inline text-slate-600 ">{item.quantidade}x</p>
									<span className="text-blue-500 font-semibold">
										R$ {item.preço.toFixed(2)}
									</span>
								</div>
								<div className="flex items-end mt-3">
									<span className="text-blue-500 font-semibold">
										R$ {item.vlTotal.toFixed(2)}
									</span>

								</div>
							</div>
						))}
					</div>
				)}
			</div>
{/* ----------------------- resumo dos valores ----------------------- */}
			<div>
				<h2 className="text-slate-500 font-bold text-lg text-center">
					Resumo dos Valores
				</h2>
				<div className=" mx-2">
					<div className="flex justify-between">
						<p className="text-slate-500 font-semibold text-lg">Valor total</p>
						<p className="text-slate-500 font-semibold text-lg">
							Total: R$ {itemPedido.reduce((acc, item) => acc + item.vlTotal, 0).toFixed(2)}
						</p>
					</div>
					<div className="flex justify-center  items-center  gap-4 my-4">
					<Link
						to={`/pedidosvend/${pdt._id}`}
					>
						<button onClick={notify} className="bg-green-500 flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-600">
								<HiOutlineSave className=" animate-bounce" size={24}/>
								Salvar Pedido
						</button>
					</Link>
						<button
							onClick={handlePrint}
							className="border bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black"
						>
							<HiOutlinePrinter className="animate-pulse" size={24}/>
							Imprimir
						</button>					<button
							onClick={handlePrint}
							className="border bg-sky-600 flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-indigo-500 hover:text-black  border-indigo-500"
						>
							<HiOutlineAnnotation className="animate-pulse" size={24}/>
							Acerto
						</button>
					</div>
				</div>
			</div>
			<ToastContainer/>
		</div>
	);
}