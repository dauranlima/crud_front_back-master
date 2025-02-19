import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { useContext, useRef } from "react";
import { HiOutlinePrinter } from "react-icons/hi";
import generatePDF, { Margin } from "react-to-pdf";

export default function CartPrintEdit() {

	const { editPedido } = useContext(CartContext);

	const getContentPdf = useRef();

  
	const options = {
		method: "open",
		page: {
			margin: Margin.SMALL,
			format: "A4",
			orientation: "portrait",
		},
	};

	return (
		<>
			<button
				onClick={() => generatePDF(getContentPdf, { options, filename: `pedido-${editPedido.vendedor.nome}.pdf` })}
				className="border mt-2 bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black">
				<HiOutlinePrinter className="animate-pulse" size={24} />
				Imprimir
			</button>
			<div ref={getContentPdf}>
			<div>
				<div className="flex gap-4 border border-black p-3 mt-5">
					<div>
            <img src="/supplier.png" alt="logo" height={90} width={90}/>
          </div>
					<div className="flex items-center mx-auto w-96 text-black font-semibold py-4 px-6 rounded-lg">
            <h1 className="text-2xl font-bold ">Lista de produtos do pedido</h1>
          </div>
				</div>
      </div>
          {editPedido?.produtos?.map((item) => (
            <div key={item?._id} className="flex gap-4 border p-3" >
              <div className="flex w-full gap-3">
                <p className="text-slate-900 font-semibold">{item?.nome}</p>
                <span className="text-slate-500 font-bold">{item?.quantity}X</span>
                <span className="text-slate-500 font-bold">VALOR UNITÁRIO: {formatCurrency(item?.preco, 'BRL')}</span>
              </div>
              <div className="flex items-center justify-end  gap-3 text-black">
                <span className="font-bold">{formatCurrency((item?.quantity * item?.preco),'BRL')}</span>
							</div>
            </div>
          ))}
				<div className="flex flex-col gap-4 border items-center space-y-3 border-black p-3 mt-5">
					<div className="flex flex-col items-center mx-auto text-black font-semibold">
            <h1 className="text-2xl mb-5 font-bold ">Resumo</h1>
            <p>Vendedora: {editPedido.vendedor?.nome}</p>
            <p>Total de Itens: {editPedido.produtos?.length}</p>
						<p>Valor Total do Pedido: {formatCurrency(editPedido.totalValor, 'BRL')}</p>
          </div>
            <p className="font-thin italic">Data da impressão: {new Date(editPedido.data).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="font-thin italic">Data da re-impressão: {new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
				</div> 
			</div>
		</>
	);
}
