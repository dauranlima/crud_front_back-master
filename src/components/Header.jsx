import CartContext from "@/context/CartContext";
import { useContext } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  const {username} = useContext(CartContext);

	return (
		<main className="fixed z-50 top-0 left-0 right-0">
			<header className="bg-indigo-600 flex justify-between py-6 px-8 gap-4 items-center mb-4">
				<Link to="/" className="flex ] items-center gap-4">
					<img src={"/supplier.png"} className="w-16 h-16  " />
				</Link>
				<Link
					to="/"
					className="text-white font-bold text-md"
				>
					CONTROLE DE PEDIDOS
				</Link>	
				<div className="flex border p-3  rounded-xl gap-2">
					<div className="flex text-white">
						<HiOutlineUser size={24} />
							{username}
					</div>
					<Link to="/login" className="text-white font-bold underline">
						Sair
					</Link>
				</div>
			</header>
		</main>
	);
};

export default Header;
