import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function Cart() {
	const [itemPedido] = useState([
		{
			id: 1,
			produto: "Lençol queen luxo",
			preço: 149.9,
			quantidade: 3,
			vlTotal: 449.7,
		},
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},,
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},,
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},,
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},,
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},,
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},,
		{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},	{
			id: 2,
			produto: "Lençol king luxo",
			preço: 122.9,
			quantidade: 4,
			vlTotal: 491.6,
		},
		{
			id: 3,
			produto: "Lençol solteiro",
			preço: 89.9,
			quantidade: 1,
			vlTotal: 89.9,
		},
	]);

	return (
		<div className="flex flex-col justify-between">
			<div>

      <div className="flex border border-slate-400 flex-col items-center">
				<h2 className="text-lg font-semibold text-slate-500 my-2">Lista de Produtos na cesta</h2>
			<h3 className="font-semibold text-slate-500 mx-2">Data:07/12/2024</h3>
			</div>
			<div className="border border-slate-400 mt-2 mb-52">
				{itemPedido.map((item,i) => (
					<div key={item.id} className="flex border border-slate-100 justify-between items-center p-2">
						<div className="w-[60%]">
							<span className="text-slate-600">{i+1}<p className=" text-slate-600">{item.produto}</p></span>
							<p className=" inline text-slate-600 ">{item.quantidade}x</p>
							<span className="text-blue-500 font-semibold">
								R$ {item.preço}0
							</span>
						</div>
						<div className="flex items-end mt-3">
							<span className="text-blue-500 font-semibold">
								R$ {item.vlTotal}0
							</span>
							<span className="mx-3 text-red-400">
								<HiOutlineTrash size={34} />
							</span>
						</div>
					</div>
				))}
			</div>
      </div>
				<div className="fixed bottom-0 left-0 right-0 bg-white">
					<div className="border my-1" />
					<h2 className="text-slate-500 font-bold text-lg text-center">
						Resumo dos Valores
					</h2>
					<div className="flex flex-col  justify-between mx-2">
						<div className="flex justify-between">
							<p className="text-slate-500 font-semibold text-lg">Valor total</p>
							<p className="text-slate-500 font-semibold text-lg">Total: R$ 342.60</p>
						</div>
              <div className="flex  h-20 items-center justify-between gap-4 my-4">
                <button className="bg-green-500 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-600">
                  Salvar Pedido
                </button>
                <button disabled className="bg-gray-300 border border-gray-400 text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-400">
                  Realizar Acerto
                </button>
						</div>
					</div>
				</div>
		</div>
	);
}
