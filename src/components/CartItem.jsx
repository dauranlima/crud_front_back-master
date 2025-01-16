import { HiOutlineTrash } from "react-icons/hi";
import formatCurrency from "@/utils/FormatCurrency";
import { useContext, useEffect } from "react";
import CartContext from "@/context/CartContext";

export default function CartItem({ data }) {
	
  const {_id, nome, preco,quantity} = data;
  const valorTotalUnitario = preco * quantity;
	const { cartItems, setCartItems} = useContext(CartContext);

 
	const removeFromCart = (_id) => {
		const updatedItems = cartItems.filter((item) => item._id !== _id);
		setCartItems(updatedItems);
  };
	

    const updatedItems = cartItems.map((item) => ({
      ...item,
      valorTotalUnitario: (item.preco * item.quantity),
    }));

	useEffect(() => {
		setCartItems(updatedItems);
	}, [setCartItems]);



	return (
		<section className="flex flex-col overflow-auto">
			<div key={_id} className="flex border border-red-100 justify-between items-center p-2">
				<div>
					<span className="text-slate-600">
						<p className=" text-slate-600">
						{nome}
              </p>
					</span>
					<p className=" inline text-slate-600 mr-3 font-bold text-lg">
            {quantity}
            x
            </p>
					<span className="text-blue-500 font-semibold">
					{formatCurrency(preco, 'BRL')}
					</span>
				</div>
				<div className="flex items-end mt-3">
					<span className="text-blue-500 font-semibold">
						{formatCurrency(valorTotalUnitario, "BRL")}
					</span>
					<button onClick={() => removeFromCart(_id)} className="mx-3 text-red-400">
						<HiOutlineTrash size={34} />
					</button>
				</div>
			</div>
		</section>
	);
}