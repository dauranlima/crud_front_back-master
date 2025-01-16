import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { useContext, useRef } from "react";
import { HiOutlinePhone, HiOutlinePrinter } from "react-icons/hi";
import generatePDF, { Margin } from "react-to-pdf";

export default function AcertoPrint() {

	const { acertos  } = useContext(CartContext);

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
				onClick={() => generatePDF(getContentPdf, options)}
				className="border mt-2 bg-black flex gap-2 text-white font-semibold py-4 px-6 rounded-lg hover:bg-white hover:text-black  border-black">
				<HiOutlinePrinter className="animate-pulse" size={24} />
				Gerar PDF
			</button>
			<div ref={getContentPdf}>
			<div>
				<div className="flex gap-4 border border-black p-3 mt-5">
					<div>
            <img src="/supplier.png" alt="logo" height={90} width={90}/>
          </div>
					<div className="flex flex-col items-center mx-auto w-96 text-black font-semibold py-4 px-6 rounded-lg">
            <h1 className="text-2xl font-bold ">Comprovante do Acerto</h1>
            <p className="font-thin italic">Data do Acerto: {new Date(acertos.dataAcerto).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Vendedora: {acertos.vendedor?.nome}</p>
            <p>Total de Itens: {acertos.produtos?.length}</p>
          </div>
				</div>
        <div className="flex gap-10 my-3 items-center justify-center">
            <p className="my-2">Contato:(45) 9 9983-5121 | Gilmar</p>
            <p className="my-2">Contato:(45) 9 9925-9180 | William</p>
        </div>
      </div>
      {acertos?.produtos?.map((item) => (
            <div key={item?._id} className="flex gap-2 border p-3" >
              <div className="flex w-full gap-3">
                <p className="text-slate-900 font-semibold">{item?.nome}</p>
                <span className="text-slate-500 font-bold">{item?.quantity}X</span>
                <span className="text-slate-500 font-bold">VALOR UNITÁRIO: {formatCurrency(item?.preco, 'BRL')}</span>
                <span className="text-slate-500 font-bold">DEVOLVIDO: {item.devolvido}</span>
              </div>
              <div className="flex items-center justify-end  gap-10 text-black">
                <span className="font-bold">Total:{formatCurrency((item?.quantity * item?.preco),'BRL')}</span>
                <span className="font-bold">T.Vendido:{formatCurrency((item?.quantity - item?.devolvido) * item?.preco || 0, "BRL")}</span>
              </div>
            </div>
          ))}
            <h1 className="text-2xl my-5 text-center underline font-bold ">Resumo dos Valores</h1>
        <div className="flex border items-center space-y-3 border-black p-3 mt-5">
					<div className="flex flex-col items-center mx-auto text-black font-semibold">
            <p>Total de Itens: {acertos.produtos?.length}</p>
            <p>Total em Produtos: {formatCurrency(acertos.totalValor, 'BRL')}</p>
						<p>Valor Total Vendido: {formatCurrency(acertos.totalVendido, 'BRL')}</p>
            <p className="text-blue-600 mb-2 font-bold">Descontos: {acertos.percentual}%: <span>{acertos.descontos.toFixed(2)}</span></p>
						<div className="border-2 border-black w-72"></div>
						<p className="text-lg font-bold">Valor Atual: {formatCurrency(acertos.saldoAtual, 'BRL')}</p>
          </div>
          <div className="flex flex-col items-center mx-auto text-black font-semibold">
            <p className="text-red-600 font-bold text-lg">Saldo Devedor: {acertos.saldoAntigo.toFixed(2)}</p>
            <p className="font-bold">Total: {formatCurrency(acertos.totalAcerto, 'BRL')}</p>
						<p className="font-bold mb-2 text-orange-600">Valor pago: {formatCurrency(acertos.recebido, 'BRL')}</p>
						<div className="border-2 border-black w-72"></div>
						<p className="text-lg text-red-600 font-bold">Falta Acertar: {formatCurrency(acertos.novoSaldoVendedor.toFixed(2), 'BRL')}</p>
          </div>
				</div> 
        <p className="font-bold">Obs:.</p>
        <p className="italic mb-20">{acertos.observacao}</p>
				<div className="flex justify-between">
          <div>
            <p className="border border-black border-dashed w-96"></p>
            <p className="font-light mb-10 ">Assinatura do Vendedor</p>
          </div>
          <div>
            <p className="border border-black border-dashed w-96"></p>
            <p className="font-light mb-10 ">Assinatura do Emitente </p>
          </div>
        </div>


			</div>
		</>
	);
}
