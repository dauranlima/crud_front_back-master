import { useState } from "react";
import CartContext from "./CartContext";

export default function Provider({ children }) {
	const [isCartOpen, setIsCartOpen] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [prod, setProd] = useState([]);
	const [username, setUsername] = useState('');
	const [acertoId, setAcertoId] = useState([]);
	const [pedido, setPedido] = useState([]);
	const [editPedido, setEditPedido] = useState([])
	const [vend, setVend] = useState([]);
	const [saldoAtual, setSaldoAtual] = useState(0);
	const [selectedVend, setSelectedVend] = useState([]);


	const value = {
		isCartOpen,
		setIsCartOpen,
		prod,
		setProd,
		cartItems,
		setCartItems,
		vend,
		setVend,
		selectedVend,
		setSelectedVend,
		username,
		setUsername,
		pedido,
		setPedido,
		editPedido,
		setEditPedido,
		acertoId,
		setAcertoId,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
