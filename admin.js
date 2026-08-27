async function buscarCadastros() {
    const resposta = await fetch("http://localhost:3000/cadastros", {
        credentials: "include"
    });
    const cadastros = await resposta.json();

    document.getElementById("corpo-tabela-admin").innerHTML = "";

    cadastros.forEach(function(cadastro) {
        const linha=`
            <tr>
                <td>${cadastro.nome}</td>
                <td>${cadastro.email}</td>
                <td>${cadastro.celular}</td>
                <td><button class="btn-excluir" data-id="${cadastro.id}">Excluir</button></td>
            </tr>
        `;

        document.getElementById("corpo-tabela-admin").innerHTML += linha;

    });
}

async function excluirCadastro(id) {
    const resposta = await fetch(`http://localhost:3000/cadastro/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (resposta.ok) {
        buscarCadastros();
    } else {
        alert("Erro ao excluir cadastro.");
    }
}

document.getElementById("corpo-tabela-admin").addEventListener("click", function(evento){
    if (evento.target.classList.contains("btn-excluir")) {
        const id = evento.target.dataset.id;
        excluirCadastro(id);
    }
});

buscarCadastros();
