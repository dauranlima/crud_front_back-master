import BigButton from "@/components/BigButton";
import CardVend from "@/components/CardVend";
import { Link } from "react-router-dom";

export default function Home() {
  return (

    <div className="flex flex-col justify-center items-center gap-5 mx-2">
      <Link to={"/pedidos"}>
        <BigButton className={"bg-indigo-600"}>Lista de Pedidos</BigButton>
      </Link>
      <Link to={"/produtos"}>
        <BigButton className={"bg-indigo-600"}> Produtos</BigButton>
      </Link>
      <Link to={"/addVendedora"} >
        <BigButton className={"bg-indigo-600"}> Cadastro de Vendedoras </BigButton>
      </Link>
      <CardVend/>
    </div>
  );
}
