// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegistroOs from './components/RegistroOs';
import ListaOrdens from './components/ListaOrdens';
import DeletarOrdem from './components/DeletarOrdem';
import './styles.css'; 

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="menu-container">
                    <ul className="menu">
                        <li>
                            <Link to="/registro-os">Registrar Ordem de Serviço</Link>
                        </li>
                        <li>
                            <Link to="/ordens-ativas">Ordens de Serviço Ativas</Link>
                        </li>
                    </ul>
                </nav>

                <main className="content">
                    <Routes>
                        {/* Redireciona a rota raiz para uma rota existente, como "ordens-ativas" */}
                        <Route path="/" element={<Navigate to="/ordens-ativas" />} />
                        <Route path="/registro-os" element={<RegistroOs />} />
                        <Route path="/ordens-ativas" element={<ListaOrdens />} />
                        <Route path="/deletar-ordem" element={<DeletarOrdem />} /> 
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
