async function buscarCotacao(ticker) {
    const resposta = await fetch(`http://localhost:3000/cotacao/${ticker}`);
    const dados = await resposta.json();
    const acao = dados.results[0];

    const preco = acao.regularMarketPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const variacao = acao.regularMarketChangePercent.toFixed(2);
    const corVariacao = acao.regularMarketChangePercent >= 0 ? "positivo" : "negativo";
    const sinal = acao.regularMarketChangePercent >= 0 ? "+" : "";

    const setores = {
        "ITUB4": "Serviços Financeiros",
        "BBAS3": "Serviços Financeiros",
        "CMIG4": "Energia Elétrica",
        "CMIN3": "Mineração de Ferro ",
        "EGIE3": "Energia Elétrica",
        "FLRY3": "Saúde",
        "ITSA4": "Serviços Financeiros",
        "KLBN4": "Materiais Básicos",
        "PSSA3": "Serviços Financeiros",
        "SAPR4": "Saneamento",
        "SHUL4": "Bens Industriais",
        "BBDC3": "Serviços Financeiros",
        "ISAE4": "Energia Elétrica"
    };

    const setor = setores[acao.symbol] || "N/A";

    const linha = `
        <tr>
            <td>
                <img src="${acao.logourl}" alt="${acao.symbol}" class="logo-acao">
                ${acao.symbol}
            </td>
            <td>R$ ${preco}</td>
            <td class="${corVariacao}">${sinal}${variacao}%</td>
            <td>${setor}</td>
        </tr>
    `;

    document.getElementById("corpo-tabela").innerHTML += linha;
}

const tickers = ["ITUB4", "BBAS3", "CMIG4", "CMIN3", "EGIE3", "FLRY3", "ITSA4", "KLBN4", "PSSA3", "SAPR4", "SHUL4", "BBDC3", "ISAE4"];

tickers.forEach(function(ticker) {
    buscarCotacao(ticker);
});