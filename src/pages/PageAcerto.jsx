import AcertoLista from "@/components/AcertoLista";
import BigButton from "@/components/BigButton";
import { Link } from "react-router-dom";


export default function PageAcerto() {

	return (
		<div className="mx-2">
			<h1 className="font-bold text-xl text-center text-slate-700-500 mb-2">
				Lista de Acertos
			</h1>
			<div>
				<Link to={"/pedidosvend"}>
					<BigButton className={'bg-blue-500 hover:bg-blue-700 hover:text-white'}>Criar Novo Pedido</BigButton>
				</Link>

			</div>
			<div className="border border-1 mt-3"/>
			<AcertoLista/>

		</div>
	);
}
