// src/components/ListaOrdens.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaOrdens = () => {
    const [ordens, setOrdens] = useState([]);

    useEffect(() => {
        const fetchOrdens = async () => {
            try {
                const response = await axios.get('http://localhost:3000/ordens-servico/');
                setOrdens(response.data);
            } catch (error) {
                console.error('Erro ao buscar ordens de serviço:', error);
            }
        };

        fetchOrdens();
    }, []);

    return (
        <div>
            <h2>Ordens de Serviço Ativas</h2>
            <ul>
                {ordens.map(ordem => (
                    <li key={ordem.id}>
                        Cliente: {ordem.cliente}, Aparelho: {ordem.aparelho}, Problema: {ordem.problema}, Status: {ordem.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaOrdens;
