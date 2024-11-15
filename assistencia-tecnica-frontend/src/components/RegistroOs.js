import React, { useState } from 'react';

function RegistroOs() {
    const [nome, setNome] = useState('');
    const [aparelho, setAparelho] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (nome && aparelho && descricao) {
            setErro('');

            const ordemServico = {
                cliente: nome, // Certifique-se de que o campo no backend é "cliente"
                aparelho,
                problema: descricao // O campo no backend parece ser "problema"
            };

            try {
                // Requisição POST para o backend
                const response = await fetch('http://localhost:3000/ordens-servico', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ordemServico),
                });

                if (response.ok) {
                    setNome('');
                    setAparelho('');
                    setDescricao('');
                    setSucesso('Ordem de serviço registrada com sucesso!');
                } else {
                    setErro('Erro ao registrar a ordem de serviço.');
                }
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
                setErro('Erro de conexão. Tente novamente.');
            }
        } else {
            setErro('Preencha todos os campos.');
        }
    };

    return (
        <div className="container">
            <h2>Registrar Ordem de Serviço</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Cliente</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome do cliente"
                />

                <label htmlFor="aparelho">Modelo do Aparelho</label>
                <input
                    type="text"
                    id="aparelho"
                    value={aparelho}
                    onChange={(e) => setAparelho(e.target.value)}
                    placeholder="Digite o modelo do aparelho"
                />

                <label htmlFor="descricao">Descrição do Problema</label>
                <input
                    type="text"
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descreva o problema"
                />

                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

                <button className='registrarOS' type="submit">Registrar Ordem de Serviço</button>
            </form>
        </div>
    );
}

export default RegistroOs;
