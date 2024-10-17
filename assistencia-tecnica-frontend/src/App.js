// src/App.js

import React from 'react';
import RegistroOs from './components/RegistroOs';
import ListaOrdens from './components/ListaOrdens';
import './styles.css'; // Importação do arquivo de estilos

function App() {  // Verifique se você tem apenas uma declaração de 'App'
    return (
        <div>
            <h1>Sistema de Gestão de Assistência Técnica</h1>
            <RegistroOs /> 
            <ListaOrdens />

        </div>
    );
}

export default App; // Certifique-se de que esta é a única exportação do arquivo
