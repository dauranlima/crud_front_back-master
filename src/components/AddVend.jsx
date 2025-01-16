import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchData from "../axios/config";
import { ToastContainer, toast } from 'react-toastify';


  const AddVend = () => {

  const navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [documento, setDocumento] = useState("");
  const [cidade, setCidade] = useState("")
	const [saldo, setSaldo] = useState("");

  const notify = () => {
    if (nome && endereco && telefone && documento && cidade) {
      toast.info('Vendedor cadastrado com sucesso!')
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }
  const createSeller = async (e) => {
    e.preventDefault();
    await FetchData.post("/vendedor", {
      nome: nome.toUpperCase(),
      endereco,
      telefone,
      documento,
      cidade,
      saldo,
    });
  };

  const mascaraCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const telefoneRegex = /^\d{2}-\d{5}-\d{4}$/;
	const mascaraTelefone = (value) => {
		if (telefoneRegex.test(value)) {
			return value;
		}
		return value.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3");
	};
  

  return (
    <div className="mx-2">
      <h1 className="font-bold text-slate-500 text-xl mb-4">Novo Cadastro</h1>
      <form onSubmit={(e) => createSeller(e)} className="flex flex-col gap-3 ">
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
          onChange={(e) => setEndereco(e.target.value)}
        />

        <label>TELEFONE:</label>
        <input
          type="text"
          required
          maxLength="11"
          placeholder="Digite o Telefone:"
					value={telefone}
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
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
          onChange={(e) => setCidade(e.target.value)}
        />
        <label>SALDO:</label>
        <input
          type="number"
          required
          placeholder="Digite o Saldo devedor da vendedora:"
          className="border uppercase border-slate-500 p-2 rounded-lg text-black bg-roxo-claro"
          onChange={(e) => setSaldo(e.target.value)}
        />

        <button
          onClick={notify}
          type="submit"
          className="bottom-0 w-full font-bold bg-green-500  py-3 px-6 rounded-lg text-white "
        >
          Cadastrar Vendedora
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};export default AddVend;