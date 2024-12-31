import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchData from "../axios/config";
import { ToastContainer, toast } from 'react-toastify';
  const AddProd = () => {

  const navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  
  const createProduct = async (e) => {
    e.preventDefault();
    await FetchData.post("/produtos", {
      nome: nome.toUpperCase(),
      preco,
    });
    navigate("/produtos");
  };

const notify = () => toast("Produto Cadastrado com Sucesso!")

  return (
    <div className="mx-2">
      <h1 className="font-bold text-3xl mb-4">CADASTRO DE PRODUTO</h1>
      <form onSubmit={(e) => createProduct(e)} className="flex flex-col gap-3 ">
        <label>Nome:</label>
        <input
          type="text"
          required
          autoCapitalize="on"
          placeholder="Descrição do Produto:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Preço:</label>
        <input
          type="text"
          required
          placeholder="Digite o Preço R$:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          onChange={(e) => setPreco(e.target.value)}
        />
        <button
          type="submit"
          onClick={{notify}}
          className="font-bold bg-green-500 w-fit py-3 px-6 rounded-lg text-white "
        >
          Cadastrar
        </button>

      </form>
      <ToastContainer/>
    </div>
  );
};export default AddProd;
