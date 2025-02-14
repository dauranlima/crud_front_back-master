import ProdList from "@/components/ProdList";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Produto() {

  const btnRef = useRef();

  useEffect(()=>{
    btnRef.current.focus();
  },[])

  return (
    <div className="mx-2">
      <div>
        <h1 className="text-3xl font-bold ">Lista de Produtos</h1>
      </div>
      <div className="flex justify-end ">
        <Link ref={btnRef} to="/AddProduto"  className="bg-yellow-400 rounded-md shadow-md flex items-center gap-3 px-3 my-2 py-4 hover:bg-yellow-500">
        <FaPlusCircle size={18} />
          Cadastrar Produtos
        </Link>
        </div>
    <ProdList/>
    </div>
  )
}
