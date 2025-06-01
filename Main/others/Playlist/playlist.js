
const musicas = [
  {
    titulo: "Céu Vermelho",
    artista: "Lira Urbana",
    duracao: "3:42"
  },
  {
    titulo: "Noite Sem Fim",
    artista: "Sombras do Sul",
    duracao: "4:15"
  },
  {
    titulo: "Reflexos",
    artista: "EchoBeat",
    duracao: "3:58"
  }
];


function renderizarMusicas() {
  const container = document.querySelector('.music-list');
  container.innerHTML = '';

  musicas.forEach((musica, index) => {
    const item = document.createElement('div');
    item.className = 'music-item';
    item.innerHTML = `
      <i class="fa-solid fa-music"></i>
      <div class="music-info">
        <h3>${musica.titulo}</h3>
        <p>${musica.artista}</p>
      </div>
      <div class="music-duration">${musica.duracao}</div>
    `;
    container.appendChild(item);
  });
}

// Chamando a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarMusicas);
