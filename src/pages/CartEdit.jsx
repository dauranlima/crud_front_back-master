import { useContext,useRef , useState } from "react";
import { HiOutlinePrinter, HiOutlineSave,  } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import CartItemEdit from "@/components/CartItemEdit";

export default function CartEdit({ handleSaveOrder, editPedido }) {

	const {isCartOpen, cartItems}=useContext(CartContext)
	const navigate = useNavigate();
  const contentRef = useRef(null);

	const totalEditValor = editPedido?.produtos?.reduce((total, item) => (total + item.preco * item.quantity), 0) || 0;

  const notify = () => {
    toast.success(' Pedido Salvo!',{ autoClose: 2500, position: "top-left", pauseOnHover: false});
		handleSaveOrder()
    setTimeout(() => {
			navigate("/pedidos");

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
		<div className={`w-full max-w-72 ${isCartOpen ? ' translate-x-[100%]':''} sm:max-w-[560px] fixed top-[112px] translate-x-[0%] px-10 border border-gray-500 
		transition-all duration-500 bg-white right-0 h-[calc(100%-120px)] justify-between flex flex-col  `}>
{/* ----------------------- header ----------------------- */}
			<div className="flex flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">
					Lista de Produtos na cesta
				</h2>
				<h3 className="my-3 font-semibold text-slate-500 mx-2">Data: {new Date().toLocaleDateString('pt-BR')}</h3>

			</div>
{/* ----------------------- LISTA ----------------------- */}
			<div className="overflow-auto   grow  mb-12">
					{
					<div >
						{editPedido?.produtos?.map((item, index) => (<CartItemEdit key={item._id} index={index} data={item}/>)) || []}
					</div>
				// )
				}
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
							
							Total: R$ {formatCurrency(totalEditValor, 'BRL')}
						</p>
					</div>
					<div className="flex  items-center  gap-4 my-4">
											<button 
												onClick={editPedido?.produtos?.length > 0 ? notify : undefined} 
												className={`bg-green-500 flex gap-2 text-white font-semibold py-4 px-6 rounded-lg ${editPedido?.produtos?.length > 0 ? 'hover:bg-green-600' : 'opacity-50 cursor-not-allowed'}`}
												disabled={editPedido?.produtos?.length === 0}
											>
							<HiOutlineSave className=" animate-bounce" size={24}/>
							Salvar Pedido
						</button>
						{/* <button onClick={handleSaveOrder} className={`bg-green-500 flex gap-2 text-white font-semibold py-4 px-6 rounded-lg ${cartItems.length > 0 ? 'hover:bg-green-600' : 'opacity-50 cursor-not-allowed'}`}>
							<HiOutlineSave className=" animate-bounce" size={24}/>
							Salvar Peds
						</button> */}
						<button
							onClick={handlePrint}
							className="border bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black"
						>
							<HiOutlinePrinter className="animate-pulse" size={24}/>
							Imprimir
						</button>
					</div>
				</div>
			</div>
			<ToastContainer/>
		</div>
	);
}


