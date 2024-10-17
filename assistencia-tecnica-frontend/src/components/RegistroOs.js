// src/components/RegistroOs.js

import React, { useState } from 'react';
import axios from 'axios';

const RegistroOs = () => {
    const [cliente, setCliente] = useState('');
    const [aparelho, setAparelho] = useState('');
    const [problema, setProblema] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/ordens-servico/', {
                cliente,
                aparelho,
                problema,
            });
            alert('Ordem de serviço registrada com sucesso!');
            setCliente('');
            setAparelho('');
            setProblema('');
        } catch (error) {
            alert('Erro ao registrar ordem de serviço');
        }
    };

    return (
        <div>
            <h2>Registrar Ordem de Serviço</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome do Cliente:
                    <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
                </label>
                <label>
                    Modelo do Aparelho:
                    <input type="text" value={aparelho} onChange={(e) => setAparelho(e.target.value)} required />
                </label>
                <label>
                    Descrição do Problema:
                    <textarea value={problema} onChange={(e) => setProblema(e.target.value)} required />
                </label>
                <button type="submit">Registrar OS</button>
            </form>
        </div>
    );
};

export default RegistroOs;
