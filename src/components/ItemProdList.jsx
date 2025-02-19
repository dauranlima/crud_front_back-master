import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { useContext, useState } from "react";
import { HiMinusCircle, HiOutlineShoppingCart, HiPlusCircle } from "react-icons/hi";

export default function ItemProdList({data}) {
  const {_id, nome, preco,} = data;
  const {cartItems, setCartItems} = useContext(CartContext)
  const [count, setCount] = useState(1);

  const handleAddCart = () => {
    setCartItems([...cartItems, {...data, quantity: count}]);
  };

	return (
		<div
			key={_id}
			className=" space-x-8 mx-2 p-2 border border-gray-300 my-3 flex "
		>
			<div className="  w-[50%] flex items-center gap-4">
				<div>
					<h2 className="font-bold text-slate-600">{nome.toLowerCase()}</h2>
					<div>
						<span className="font-bold text-sm text-slate-600"> Preço: </span>{" "}
						{formatCurrency(preco, 'BRL')}
          </div>
				</div>
			</div>
				<button className="flex gap-2 items-center border border-white shadow-xl py-2 px-4  text-sm rounded-md bg-blue-500 hover:bg-blue-700 hover:scale-105 transition-transform text-white font-bold"
					onClick={() => {
					const existingItem = cartItems.find(item => item._id === _id)
					if (existingItem) {
						const updatedItems = cartItems.map(item => 
							item._id === _id ? {...item, quantity: count} : item
						)
						setCartItems(updatedItems)
					} else {
						handleAddCart()
					}
				}}>
					<HiOutlineShoppingCart size={34} />
				</button>	
			<div className="w-[20%] flex items-center justify-center gap-2">
				<button 
					className="text-green-500 hover:text-green-700"
					onClick={() => setCount(prev => prev + 1)}
				>
					<HiPlusCircle size={44} />
				</button>
				<span className="font-bold">{count}</span>
				<button 
					className="text-red-500 hover:text-red-700"
					onClick={() => setCount(prev => prev > 1 ? prev - 1 : 1)}
				>
					<HiMinusCircle size={44} />
				</button>
			</div>
			</div>
	);
}
