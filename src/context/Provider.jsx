import { useState } from "react";
import CartContext from "./CartContext";

export default function Provider({ children }) {
	const [isCartOpen, setIsCartOpen] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [prod, setProd] = useState([]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		prod,
		setProd,
		cartItems,
		setCartItems,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
