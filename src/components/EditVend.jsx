import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchData from "../axios/config";
import { ToastContainer,toast } from "react-toastify";


const EditVend = () => {
  
  const navigate = useNavigate();
  const [editarVend, setEditarVend] = useState({
		nome: "",
		endereco: "",
		telefone: "",
		documento: "",
		cidade: "",
		saldo: "",
  })

  const { id } = useParams();
  
  const notify = () => {
		if (
			editarVend.nome &&
			editarVend.endereco &&
			editarVend.telefone &&
			editarVend.documento &&
			editarVend.cidade &&
			editarVend.saldo
		) {
      toast.success('Vendedor Editado com sucesso!')
      setTimeout(() => {
        navigate("/vendedoras");
      }, 2000);
  }
}
  const getVend = async () => {
    try {
      const response = await FetchData.get(`/vendedor/${id}`);
      const data = response.data;
      setEditarVend({
        nome: data.nome,
				endereco: data.endereco,
				telefone: data.telefone,
				documento: data.documento,
				cidade: data.cidade,
				saldo: data.saldo,
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVend();
  }, []);
  
  const handleEditarVend = (e, key) => {
    setEditarVend({...editarVend, [key]: e.target.value})
  }

  const updateVend = async (e) => {
      e.preventDefault()
      await FetchData.put(`/vendedor/${id}`, {
			nome: editarVend.nome,
			endereco: editarVend.endereco,
			telefone: editarVend.telefone,
			documento: editarVend.documento,
			cidade: editarVend.cidade,
			saldo: editarVend.saldo,
      });
  }
  return (
    <div className="mx-2">
      <h1 className="font-bold mb-4">EDITAR VENDEDORA</h1>
      <form onSubmit={updateVend} className="flex flex-col gap-3 ">
      <label>Nome:</label>
        <input
          type="text"
          required
          autoCapitalize="on"
          placeholder="NOME COMPLETO:"
					value={editarVend.nome}
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
          onChange={(e) => handleEditarVend(e,"nome")}
        />
        <label>ENDEREÇO:</label>
        <input
          type="text"
					value={editarVend.endereco}
          required
          placeholder="Digite o Endereço:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
					onChange={(e) => handleEditarVend(e, "endereco")}
        />

        <label>TELEFONE:</label>
        <input
          type="text"
          required
          maxLength="12"
          placeholder="Digite o Telefone:"
					value={editarVend.telefone}
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
					onChange={(e) => handleEditarVend(e, "telefone")}
        />
        <label>DOCUMENTO:</label>
        <input
          type="text"
          required
          maxLength="14"
          placeholder="Digite o CPF:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black "
          value={editarVend.documento}
					onChange={(e) => handleEditarVend(e, "documento")}
        />
        <label>CIDADE:</label>
        <input
          type="text"
          required
					value={editarVend.cidade}
          placeholder="Digite o Cidade:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
					onChange={(e) => handleEditarVend(e, "cidade")}
        />
        <label className="font-bold">SALDO:</label>
        {/* <input
          type="number"
          required
					value={editarVend.saldo < 0 ? (Number(-editarVend.saldo).toFixed(2)) : Number(editarVend.saldo).toFixed(2)}
          placeholder="Digite o Saldo devedor da vendedora:"
          className={`border font-bold ${editarVend.saldo < 0 ? 'text-green-500' : 'text-red-500'} uppercase border-slate-500 p-2 rounded-lg`}
					onChange={(e) => handleEditarVend(e,"saldo")}
        /> */}
        <input
        type="text"
        required
          value={editarVend.saldo < 0 ? (-editarVend.saldo) : editarVend.saldo}
          placeholder="Digite o Saldo devedor da vendedora:"
          className={`border font-bold ${editarVend.saldo < 0 ? 'text-green-500' : 'text-red-500'} uppercase border-slate-500 p-2 rounded-lg`}
					onChange={(e) => handleEditarVend(e,"saldo")}
        />
        <button
          type="submit"
          onClick={notify}
          className="font-bold bg-green-500 w-fit py-3 px-6 rounded-lg text-white ">
          Editar Vendedora
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default EditVend;