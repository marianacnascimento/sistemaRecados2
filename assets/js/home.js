let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
const formulario = document.querySelector('#tabela-registros')
let inputDescricao = document.querySelector('#input-descricao')
let inputDetalhamento = document.querySelector('#input-detalhamento')

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session)
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    
    adicionarNovoRegistro();
    formulario.reset()
})

function adicionarNovoRegistro() {
    let descricao = inputDescricao.value;
    let detalhamento = inputDetalhamento.value;
    let transactions = data.transactions;

    let register = {
        detalhamento,
        descricao
    };

    transactions.push(register);

    saveData(data);
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    updateData();
}


function updateData() {
    clearLines();
    createLines();
}

function createLines() {
    let transactions = data.transactions;
    let table = document.getElementById('tabela-recados');
    

    transactions.forEach((elem, index) => {
        let linha = table.insertRow(index);

        let idLinha = linha.insertCell(-1);
        let textIdLinha = document.createTextNode(index + 1);
        idLinha.appendChild(textIdLinha);

        let descricao = linha.insertCell(-1);
        let textoDescricao = document.createTextNode(elem.descricao);
        descricao.appendChild(textoDescricao);

        let detalhamento = linha.insertCell(-1);
        let textoDetalhamento = document.createTextNode(elem.detalhamento);
        detalhamento.appendChild(textoDetalhamento);

        let editar = linha.insertCell(-1);
        let div = document.createElement('div');
        div.innerHTML = `<button type="button" class="btn btn-primary btn-sm btn-editar">Editar</button>
        <button type="button" class="btn btn-secondary btn-sm btn-apagar">Apagar</button>`;
        editar.appendChild(div);
    })

    let botaoApagar = document.querySelectorAll('.btn-apagar');
    botaoApagar.forEach((btn, index) => btn.addEventListener('click', () => removerRegistro(index)));
    let botaoEditar = document.querySelectorAll('.btn-editar');
    botaoEditar.forEach((btn, index) => btn.addEventListener('click', () => editarRegistro(index)));
}

function clearLines() {
    let table = document.getElementById('tabela-recados');
    let tableLength = table.childNodes.length - 1;

    while (tableLength > 0) {
        let child = table.firstElementChild;
        table.removeChild(child);
        tableLength--;
    }
}

function removerRegistro(index) {
    let transactions = data.transactions;
    transactions.splice(index, 1);
    saveData(data);
}

function editarRegistro(index) {
    let descricao = window.prompt('Insira uma nova descrição');
    let detalhamento = window.prompt('Insira um novo detalhamento');
    let transactions = data.transactions;
    document.location.reload(true)

    let register = {
        detalhamento,
        descricao
    };

    transactions[index] = register;
    saveData(data);

}

window.addEventListener('load', () => {
    createLines();
});