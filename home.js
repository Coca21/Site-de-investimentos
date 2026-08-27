const formulario = document.getElementById("form-cadastro");

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("e-mail").value;
    const celular = document.getElementById("celular").value;

    if (nome === "" || email === "" || celular === ""){
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch("http://localhost:3000/cadastro",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome: nome, email: email, celular: celular})
    })
    .then(function(resposta){
        return resposta.text();
    })
    .then(function(mensagem){
        alert(mensagem);
        formulario.reset();
    })
    .catch(function(erro){
        alert("Erro ao enviar cadatro. Tente novamente.");
        console.log(erro);
    });
});