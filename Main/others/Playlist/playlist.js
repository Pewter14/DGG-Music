const musicas = [{
        nome: "Música 1",
        src: "musicas/musica1.mp3"
    },
    {
        nome: "Música 2",
        src: "musicas/musica2.mp3"
    },
    {
        nome: "Música 3",
        src: "musicas/musica3.mp3"
    }
];

let indiceAtual = 0;
const audio = document.getElementById("audio");
const listaElement = document.getElementById("lista-musicas");

musicas.forEach((musica, index) => {
    const item = document.createElement("li");
    item.textContent = musica.nome;
    if (index === 0) item.style.fontWeight = "bold";
    listaElement.appendChild(item);
});

function carregarMusica(indice) {
    audio.src = musicas[indice].src;
    atualizarLista(indice);
}

function tocarOuPausar() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function proxima() {
    indiceAtual = (indiceAtual + 1) % musicas.length;
    carregarMusica(indiceAtual);
    audio.play();
}

function anterior() {
    indiceAtual = (indiceAtual - 1 + musicas.length) % musicas.length;
    carregarMusica(indiceAtual);
    audio.play();
}

function atualizarLista(indice) {
    const itens = listaElement.querySelectorAll("li");
    itens.forEach((item, i) => {
        item.style.fontWeight = i === indice ? "bold" : "normal";
    });
}

carregarMusica(indiceAtual);