// src/App.js

import React from 'react';
import RegistroOs from './components/RegistroOs';
import ListaOrdens from './components/ListaOrdens';
import './styles.css'; // Importação do arquivo de estilos

function App() {
    return (
        <div>
            <h1>
                <span>Sistema de Gestão</span><br />
                <span>de Assistência Técnica</span>
            </h1>
            <div className="phone-container">
                <img src="https://images.unsplash.com/photo-1510717029971-27681a0e9da9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Aparelho" className="phone" />
            </div>
            <RegistroOs class="register-os" /> 
            <ListaOrdens />
        </div>
    );
}



export default App; // Certifique-se de que esta é a única exportação do arquivo
