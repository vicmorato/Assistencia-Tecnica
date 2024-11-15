import React, { useState, useEffect } from 'react';
import DeletarOrdem from './DeletarOrdem';
import gerarPDF from './gerarPDF';
import './ListaOrdens.css';

function ListaOrdens() {
    const [ordens, setOrdens] = useState([]);
    const [editandoOrdem, setEditandoOrdem] = useState(null);
    const [finalizandoOrdem, setFinalizandoOrdem] = useState(null); // Ordem em finalização
    const [status, setStatus] = useState('');
    const [comentario, setComentario] = useState(''); // Novo campo para comentário

    useEffect(() => {
        fetchOrdens();
    }, []);

    const fetchOrdens = async () => {
        const response = await fetch('http://localhost:3000/ordens-servico');
        const data = await response.json();
        setOrdens(data);
    };

    const handleEdit = (ordem) => {
        setEditandoOrdem(ordem);
        setStatus(ordem.status);
    };

    const handleEditSubmit = async () => {
        const updatedOrdem = { status };

        const response = await fetch(`http://localhost:3000/ordens-servico/${editandoOrdem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrdem),
        });

        if (response.ok) {
            setOrdens(ordens.map(ordem => ordem.id === editandoOrdem.id ? { ...ordem, status: updatedOrdem.status } : ordem));
            setEditandoOrdem(null);
        }
    };

    const handleDeleteSuccess = (ordemId) => {
        setOrdens(ordens.filter((ordem) => ordem.id !== ordemId));
    };

    const handleFinalizarOrdem = (ordem) => {
        setFinalizandoOrdem(ordem);
    };

    const handleConfirmarFinalizacao = () => {
        if (finalizandoOrdem) {
            finalizandoOrdem.comentario = comentario;
            gerarPDF(finalizandoOrdem); // Gera o PDF com o comentário

            // Remove a ordem da lista
            setOrdens(ordens.filter(o => o.id !== finalizandoOrdem.id));

            // Limpa o comentário e fecha o modal
            setComentario('');
            setFinalizandoOrdem(null);
        }
    };

    return (
        <div>
            <h2>Ordens de Serviço Ativas</h2>
            <ul>
                {ordens.map((ordem) => (
                    <li key={ordem.id} className="ordem-item">
                        <span>
                            Cliente: {ordem.cliente}, Aparelho: {ordem.aparelho}, Problema: {ordem.problema}, Status: {ordem.status}
                        </span>
                        <button className="edit-button" onClick={() => handleEdit(ordem)}>
                            <svg className="edit-svgIcon" viewBox="0 0 512 512">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                            </svg>
                        </button>
                        <DeletarOrdem ordemId={ordem.id} onDeleteSuccess={handleDeleteSuccess} />
                        <button
                            className="finalizar-button"
                            onClick={() => handleFinalizarOrdem(ordem)}
                        >
                            Finalizar Ordem
                        </button>
                    </li>
                ))}
            </ul>

            {/* Modal para alterar status */}
            {editandoOrdem && (
                <div className="modal">
                    <h3>Alterar Status da Ordem de Serviço</h3>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="Aberto"
                                checked={status === 'Aberto'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            Aberto
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Em reparo"
                                checked={status === 'Em reparo'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            Em reparo
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Finalizado"
                                checked={status === 'Finalizado'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            Finalizado
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Sem reparo"
                                checked={status === 'Sem reparo'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            Sem reparo
                        </label>
                    </div>
                    <button onClick={handleEditSubmit}>Salvar Alterações</button>
                    <button onClick={() => setEditandoOrdem(null)}>Cancelar</button>
                </div>
            )}

            {/* Modal para finalizar ordem com comentário */}
            {finalizandoOrdem && (
                <div className="modal finalizar-modal">
                    <h3>Finalizar Ordem de Serviço</h3>
                    <textarea
                        placeholder="Adicione um comentário sobre o serviço realizado"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                    <button onClick={handleConfirmarFinalizacao}>Confirmar</button>
                    <button onClick={() => setFinalizandoOrdem(null)}>Cancelar</button>
                </div>
            )}
        </div>
    );
}

export default ListaOrdens;
 