import jsPDF from 'jspdf';

function gerarPDF(ordem) {
    const { cliente, aparelho, problema, status, comentario } = ordem;

    const doc = new jsPDF();

    // Checando se todos os campos necessários estão definidos e não são nulos
    const textoCliente = cliente || "Cliente não informado";
    const textoAparelho = aparelho || "Aparelho não informado";
    const textoProblema = problema || "Problema não informado";
    const textoStatus = status || "Status não informado";
    const textoComentario = comentario || "Sem comentários";

    // Adicionando o texto ao PDF em posições seguras
    doc.text(`Cliente: ${textoCliente}`, 10, 10);
    doc.text(`Aparelho: ${textoAparelho}`, 10, 20);
    doc.text(`Problema: ${textoProblema}`, 10, 30);
    doc.text(`Status: ${textoStatus}`, 10, 40);
    doc.text(`Comentário: ${textoComentario}`, 10, 50);

    // Baixando o PDF
    doc.save('Relatorio_Servico.pdf');
}

export default gerarPDF;
