import BigButton from "@/components/BigButton";
import { Link} from "react-router-dom";
export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center gap-5 mx-2">
      <div className="flex flex-col gap-4 my-10">
      <Link to={"/pedidos"}>
        <BigButton className={"bg-slate-800 hover:bg-red-800 hover:text-white"}>Pedidos</BigButton>
      </Link>
      <Link to={"/acertolista"} >
        <BigButton className={"bg-slate-800 hover:bg-blue-800 hover:text-white"}> Acertos </BigButton>
      </Link>
      <Link to={"/produtos"}>
        <BigButton className={"bg-slate-800 hover:bg-yellow-600 hover:text-white"}> Produtos</BigButton>
      </Link>
      <Link to={"/vendedoras"} >
        <BigButton className={"bg-slate-800 hover:bg-pink-600 hover:text-white"}> Vendedoras </BigButton>
      </Link>
      </div>
      </div>
  );
}