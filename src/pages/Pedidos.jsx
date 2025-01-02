import BigButton from "@/components/BigButton";
import VendPedido from "@/components/VendPedido";
import { Link } from "react-router-dom";


export default function Pedidos() {

	return (
		<div className="mx-2">
			<h1 className="font-bold text-xl text-center text-slate-700-500 mb-2">
				Lista de Pedidoss
			</h1>
			<div>
				<Link to={"/pedidosvend"}>
					<BigButton className={'bg-indigo-600 hover:bg-indigo-800 hover:text-white'}>Criar Novo Pedido</BigButton>
				</Link>
			</div>
			<div className="border border-1 mt-3"/>
			<VendPedido/>

		</div>
	);
}
