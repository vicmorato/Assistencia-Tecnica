const express = require('express');
const cors = require('cors');
const osRoutes = require('./routes/osRoutes'); // Certifique-se de que este caminho está correto

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Necessário para ler JSON no corpo da requisição

// Rota para ordens de serviço
app.use('/ordens-servico', osRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
