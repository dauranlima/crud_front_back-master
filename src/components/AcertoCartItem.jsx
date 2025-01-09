import CartContext from "@/context/CartContext";
import formatCurrency from "@/utils/FormatCurrency";
import { useContext, useEffect, useState } from "react";
export default function AcertoCartItem({ data, atualizarSomaTotal }) {

  const {_id, nome, preco, quantity} = data;

	const { editPedido, setEditPedido } = useContext(CartContext);

	const [devolvido, setDevolvido]=useState('0')
  const valorTotalUnitario = preco * quantity;
	const [valorVendido, setValorVendido] = useState([valorTotalUnitario])


	const valor = 129;

	
	const handleDevolvidoValue = (e) =>{
		setDevolvido(Number(e.target.value))
    if (Number(e.target.value) > quantity) {
			setDevolvido(quantity)
      return
    }
	}
	
	const handleEditValorVendido = () => {
		const existingItem = editPedido?.produtos?.find(item => item._id === _id)
		if (existingItem) {
			let novoValor = (quantity - devolvido) * preco;
			const updatedItems = editPedido?.produtos?.map(item => 
				item._id === _id ? {...item, valorVendido: novoValor} : item ) || [];
		setValorVendido(novoValor)
		setEditPedido({...editPedido, produtos: updatedItems})
		} else {						handleAddCart()
		}
	}

	useEffect(() => {
		handleEditValorVendido()
	}, [devolvido])

	const valorTotalVendido = editPedido.produtos?.reduce((acc, item) => acc + item.valorVendido, 0)
	atualizarSomaTotal(valorTotalVendido)

	return (
		<>
		<section className="flex flex-col overflow-auto">
			<div key={_id} className="flex border justify-center items-center p-2">
				<div className="w-96">
					<span className="text-slate-600">
						<p className=" text-slate-600">
              {nome}
              </p>
					</span>
					<p className=" inline text-slate-600 font-bold mr-3 text-lg">
            {quantity }
            x
            </p>
					<span className="text-blue-500 font-semibold">
					{formatCurrency(preco, 'BRL')}
					</span>
				</div>
				<div className="flex w-32   items-end mt-3">
					<span className="text-blue-500 font-semibold">
					R$ {Number(valorTotalUnitario)}
					</span>
				</div>
				<div className="flex w-32 mt-3">
					<input type="number" min="0" value={devolvido}
					className="w-20 border border-gray-300 h-10 p-3"
					onChange={handleDevolvidoValue}
					/>
				</div>
				<div className="flex w-32 mt-3">
					<span className="text-blue-500 font-semibold">
						R$ {Number(valorVendido)}
					</span>
				</div>
			</div>
		</section>
	
	</>
	);
}