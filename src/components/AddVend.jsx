import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchData from "../axios/config";
import { ToastContainer, toast } from 'react-toastify';


  const AddVend = () => {

  const navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [documento, setDocumento] = useState("");

  const notify = () => toast('Vendedor cadastrado com sucesso!')
const mascaraTelefone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  const createProduct = async (e) => {
    e.preventDefault();
    await FetchData.post("/produtos", {
      nome: nome.toUpperCase(),
      preco,
      documento
    });
    navigate("/produtos");
  };

  const mascaraCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  return (
    <div className="mx-2">
      <h1 className="font-bold text-slate-500 text-xl mb-4">Novo Cadastro</h1>
      <form onSubmit={(e) => createProduct(e)} className="flex flex-col gap-3 ">
        <label>Nome:</label>
        <input
          type="text"
          required
          autoCapitalize="on"
          placeholder="NOME COMPLETO:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black"
          onChange={(e) => setNome(e.target.value)}
        />
        <label>ENDEREÇO:</label>
        <input
          type="text"
          required
          placeholder="Digite o Endereço:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          onChange={(e) => setPreco(e.target.value)}
        />

        <label>TELEFONE:</label>
        <input
          type="text"
          required
          maxLength="14"
          placeholder="Digite o Telefone:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          onChange={(e) => setPreco(mascaraTelefone(e.target.value))}
        />
        <label>DOCUMENTO:</label>
        <input
          type="text"
          required
          maxLength="14"
          placeholder="Digite o CPF:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          value={documento}
          onChange={(e) => setDocumento(mascaraCPF(e.target.value))}
        />
        <label>CIDADE:</label>
        <input
          type="text"
          required
          placeholder="Digite o Cidade:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          onChange={(e) => setPreco(e.target.value)}
        />

        <button
          onClick={notify}
          type="submit"
          className="bottom-0 w-full font-bold bg-green-500  py-3 px-6 rounded-lg text-white "
        >
          Cadastrar
        </button>
      </form>
      
    </div>
  );
};export default AddVend;