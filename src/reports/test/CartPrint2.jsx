import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { useContext, useRef } from "react";
import { HiOutlinePrinter } from "react-icons/hi";
import { Document, Page, View, PDFViewer, Text } from "@react-pdf/renderer";
import { styles } from "./Styles/CartPrint2";
export default function CartPrint2() {
	const { cartItems, selectedVend, totalCart } = useContext(CartContext);

	const CartPDF = () => (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<View>
						<img src="/supplier.png" alt="logo" height={90} width={90} />
					</View>
					<View>
						<Text style={styles.title}>Lista de produtos do pedido</Text>
					</View>
				</View>
					{/* <div className="flex gap-4 border border-black p-3 mt-5">
						<div>
							<img src="/supplier.png" alt="logo" height={90} width={90} />
						</div>
						<div className="flex items-center mx-auto w-96 text-black font-semibold py-4 px-6 rounded-lg">
							<h1 className="text-2xl font-bold ">
								Lista de produtos do pedido
							</h1>
						</div>
					</div> */}
				{cartItems.map((item) => (
					<div key={item._id} className="flex gap-4 border p-3">
						<div className="flex w-full gap-3">
							<p className="text-slate-900 font-semibold">{item.nome}</p>
							<span className="text-slate-500 font-bold">{item.quantity}X</span>
							<span className="text-slate-500 font-bold">
								VALOR UNITÁRIO: {formatCurrency(item.preco, "BRL")}
							</span>
						</div>
						<div className="flex items-center justify-end w-full gap-3 text-black">
							<span className="font-bold">
								{formatCurrency(item.valorTotalUnitario, "BRL")}
							</span>
						</div>
					</div>
				))}
				<div className="flex flex-col gap-4 border items-center space-y-3 border-black p-3 mt-5">
					<div className="flex flex-col items-center mx-auto text-black font-semibold">
						<h1 className="text-2xl mb-5 font-bold ">Resumo</h1>
						<p>Vendedora: {nome}</p>
						<p>Total de Itens: {cartItems.length}</p>
						<p>Valor Total do Pedido:{formatCurrency(totalCart, "BRL")}</p>
					</div>
					<p className="font-thin italic">
						Data da impressão: {new Date().toLocaleDateString()}
					</p>
				</div>
			</Page>
		</Document>
	);

	return (
		<>
			<div className="w-full h-[750px]">
				<PDFViewer width="100%" height="100%">
					<CartPDF />
				</PDFViewer>
			</div>
		</>
	);
}
