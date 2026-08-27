let grafico;

const botao = document.getElementById("btn-calcular");

botao.addEventListener("click", function(){
    const valorInicial = Number (document.getElementById("valor-inicial").value);
    const aporteMensal = Number (document.getElementById("aporte-mensal").value);
    const taxaJuros = Number (document.getElementById("taxa-juros").value);
    const tempo = Number (document.getElementById("tempo").value);
    const periodo = document.getElementById("periodo").value;

    let meses = tempo;
    if(periodo === "anos"){
        meses = tempo * 12;
    }

    let valorFinal = valorInicial;
    let historico = [valorInicial];
    let investidoHistorico = [valorInicial];

    for (let i = 0; i < meses; i++){
        valorFinal = valorFinal * (1 + taxaJuros / 100) + aporteMensal;
        historico.push(valorFinal);
    

        let investidoAteAgora = valorInicial + (aporteMensal * (i + 1));
        investidoHistorico.push(investidoAteAgora); 

    }

    const valorInvestido = valorInicial +(aporteMensal * meses);
    const totalJuros = valorFinal - valorInvestido;

    document.getElementById("resultado-juros").innerHTML = "R$ " + totalJuros.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("resultado-investido").innerHTML = "R$ " + valorInvestido.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("resultado-final").innerHTML = "R$ " + valorFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    const ctx = document.getElementById("grafico-juros");

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historico.map ((valor, index) => index),
            datasets: [{
                label: 'Valor acumulado (R$)',
                data: historico,
                borderColor: '#6b8e23',
                backgroundColor: 'rgba(107, 142, 35, 0.1)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Total investido (R$)',
                data: investidoHistorico,
                borderColor: '#273b2d',
                backgroundColor: 'rgba(39, 59, 45, 0.1)',
                fill:true,
                tension: 0.1
            }
        ]
        }
    });
});