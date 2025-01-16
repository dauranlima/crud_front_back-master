import { useContext,useEffect,useRef , useState } from "react";
import { HiOutlineDuplicate, HiOutlinePrinter, HiOutlineSave, HiOutlineSaveAs,  } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import CartItemEdit from "@/components/CartItemEdit";

export default function CartEdit({handleSaveOrder,handleUpdateOrder,editPedido,acerto}) {

	const {isCartOpen, setEditPedido}=useContext(CartContext)
	const navigate = useNavigate();
  const contentRef = useRef(null);
	const hasAcerto = acerto ;


	const totalEditValor = editPedido?.produtos?.reduce((total, item) => (total + item.preco * item.quantity), 0) || 0;




  const saveNotify = () => {
    toast.success(' Pedido Duplicado!',{ autoClose: 2500, position: "top-left", pauseOnHover: false});
		handleSaveOrder()
    setTimeout(() => {
			navigate("/pedidos");

		}, 2500);
  }

	const editNotify = () => {
    toast.success(' Pedido Editado!',{ autoClose: 2500, position: "top-left", pauseOnHover: false});
		handleUpdateOrder()
    setTimeout(() => {
			navigate("/pedidos");

		}, 2500);
  }

	return (
		<div className={`w-full max-w-72 ${isCartOpen ? ' translate-x-[100%]':''} sm:max-w-[560px] fixed top-[112px] translate-x-[0%] px-10 border border-gray-500 
		transition-all duration-500 bg-white right-0 h-[calc(100%-120px)] justify-between flex flex-col  `}>
{/* ----------------------- header ----------------------- */}
			<div className="flex flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">
					Lista de Produtos na cesta
				</h2>
				<h3 className="my-3 font-semibold text-slate-500 mx-2">Data: {new Date(editPedido?.data).toLocaleDateString('pt-BR')}</h3>

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
												onClick={editPedido?.produtos?.length > 0 ? saveNotify : undefined} 
												className={`bg-slate-700 flex gap-2 text-white font-semibold py-4 px-6 rounded-lg ${editPedido?.produtos?.length > 0  ? 'hover:bg-slate-800' : 'opacity-50 cursor-not-allowed'}`} 
												// && !hasAcerto
												// disabled={hasAcerto || editPedido?.produtos?.length === 0}
											>
							<HiOutlineDuplicate className=" animate-bounce" size={34}/>
							Duplicar
						</button>
						<button 
												onClick={editPedido?.produtos?.length > 0 ? editNotify : undefined} 
												className={`bg-yellow-500 flex gap-2 text-white font-semibold py-4 px-6 rounded-lg ${editPedido?.produtos?.length > 0 && !hasAcerto ? 'hover:bg-yellow-600' : 'opacity-50 cursor-not-allowed'}`}
												disabled={hasAcerto || editPedido?.produtos?.length === 0}
						>
							<HiOutlineSaveAs className=" animate-bounce" size={34}/>
							Editar 
						</button>
						<Link to="/cartprintedit">
							<button
								className="border bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black"
							>
								<HiOutlinePrinter className="animate-pulse" size={34}/>
								Imprimir
							</button>
						</Link>
					</div>
				</div>
			</div>
			<ToastContainer/>
		</div>
	);
}


