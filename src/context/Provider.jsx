import { useState } from "react";
import CartContext from "./CartContext";

export default function Provider({ children }) {
	const [isCartOpen, setIsCartOpen] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [prod, setProd] = useState([]);
	const [username, setUsername] = useState('');
	const [pedido, setPedido] = useState([]);
	const [editPedido, setEditPedido] = useState([])

	const value = {
		isCartOpen,
		setIsCartOpen,
		prod,
		setProd,
		cartItems,
		setCartItems,
		username,
		setUsername,
		pedido,
		setPedido,
		editPedido,
		setEditPedido,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
