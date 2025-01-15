import BigButton from "@/components/BigButton";
import { Link} from "react-router-dom";
export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center gap-5 mx-2">
      <div className="flex flex-col gap-4 my-10">
      <Link to={"/pedidos"}>
        <BigButton className={"bg-indigo-600"}>Pedidos</BigButton>
      </Link>
      <Link to={"/acertolista"} >
        <BigButton className={"bg-indigo-600"}> Acertos </BigButton>
      </Link>
      <Link to={"/produtos"}>
        <BigButton className={"bg-indigo-600"}> Produtos</BigButton>
      </Link>
      <Link to={"/vendedoras"} >
        <BigButton className={"bg-indigo-600"}> Vendedoras </BigButton>
      </Link>
      </div>
      </div>
  );
}