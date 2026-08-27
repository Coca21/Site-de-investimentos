const formulario = document.getElementById("form-login");
const mensagemErro = document.getElementById("login-erro");

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    mensagemErro.textContent = "";

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ usuario: usuario, senha: senha })
    })
    .then(function(resposta){
        if (resposta.ok) {
            window.location.href = "admin.html";
        } else {
            return resposta.text().then(function(mensagem){
                mensagemErro.textContent = mensagem;
            });
        }
    })
    .catch(function(erro){
        mensagemErro.textContent = "Erro ao conectar com o servidor.";
        console.log(erro);
    });
});
