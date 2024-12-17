import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchData from "../axios/config";


const EditVend = () => {
  
  const navigate = useNavigate();

  const [editarProduto, setEditarProduto] = useState({
    nome:'',
    preco:'',
  })

  const { id } = useParams();
  
  const getVend = async () => {
    try {
      const response = await FetchData.get(`/vendedor/${id}`);
      const data = response.data;
      setEditarProduto({
        nome: data.nome,
        preco: data.preco,
      })
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getVend();
  }, []);
  
  const handleEditarProduto = (e, key) => {
    setEditarProduto({...editarProduto, [key]: e.target.value})
  }

  const updateProd = async (e) => {
      e.preventDefault()
      await FetchData.put(`/vendedor/${id}`, {
        nome: editarProduto.nome,
        preco: editarProduto.preco,
      });
      navigate("/");
      console.log(editarProduto)
  }
  return (
    <div className="mx-2">
      <h1 className="font-bold mb-4">EDITAR VENDEDORA</h1>
      <form onSubmit={getProds} className="flex flex-col gap-3 ">
        <label>Nome:</label>
        <input
          type="text"
          autoCapitalize="on"
          maxLength={100}
          placeholder="Digite o Nome:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
          value={editarProduto.nome}
          onChange={(e) => handleEditarProduto(e,'nome')}
        />
        <label>Preço:</label>
        <input
          type="number"
          placeholder="Digite o Preço:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
          value={editarProduto.preco}
          onChange={(e) => handleEditarProduto(e,'preco')}
        />
        <button
          type="submit"
          onClick={updateProd}
          className="font-bold bg-green-500 w-fit py-3 px-6 rounded-lg text-white ">
          Editar Produto
        </button>
      </form>
    </div>
  );
};

export default EditVend;