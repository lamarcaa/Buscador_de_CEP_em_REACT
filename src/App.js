import { useState } from 'react';
import { FaSistrix } from "react-icons/fa";
import './style.css';
import api from './services/api.js';

function App() {

  const [input, setInput] = useState ('');
  const [cep, setCep] = useState({});

  async function handleSearch()
  {
    if (input === '')
    {
      alert ('Preencha algum CEP')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    } catch {
      alert ('CEP inválido');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP..." 
        value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FaSistrix size={25} color='#333'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && 
      (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

   
    </div>
  );
}

export default App;
