import BigButton from "@/components/BigButton";
import VendList from "@/components/VendList";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Vendedora() {
  return (
		<div className="mx-2">
			<h1 className="font-bold text-3xl my-3 text-slate-700-500">Lista de Vendedoras</h1>
			<div className="flex justify-end">
        <Link to={"/addvendedora"}>
          <BigButton className={'rounded-md shadow-md flex items-center gap-3 my-2 py-4 bg-pink-500 hover:transition-all duration-200 hover:bg-pink-400'}>
						<FaPlusCircle size={18} />
            Cadastrar Vendedora</BigButton>
        </Link>
      </div>
      <div className="my-4">
        <VendList/>
      </div>
    </div>
  )
}