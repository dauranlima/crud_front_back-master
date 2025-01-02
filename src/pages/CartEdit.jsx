import { useContext,useRef , useState } from "react";
import { HiOutlinePrinter, HiOutlineSave,  } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { EraserIcon } from "lucide-react";
import CartItemEdit from "@/components/CartItemEdit";

export default function CartEdit({ handleSaveOrder, editPedido }) {

	const {isCartOpen, cartItems}=useContext(CartContext)
	const navigate = useNavigate();
  const contentRef = useRef(null);
	const totalPrice = cartItems.reduce((acc, item) => acc + (item.preco * item.quantity) , 0)

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
				<h3 className="font-semibold text-slate-500 mx-2">Data: {new Date().toLocaleDateString('pt-BR')}</h3>
				<button
					onClick={() => {cartItems.length = 0;
						window.location.reload()
					}}
					className="flex  items-center  gap-2 my-3 text-blue-500 hover:text-blue-700"
				>
					<EraserIcon size={34} />
					Limpar Cesta</button>
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
							{/* Total: R$ {formatCurrency( totalPrice, 'BRL')} */}
							Total: R$ {formatCurrency(editPedido?.totalValor || 0, 'BRL')}
						</p>
					</div>
					<div className="flex  items-center  gap-4 my-4">
											<button 
												onClick={cartItems.length > 0 ? notify : undefined} 
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