// Função para renderizar lista de partidas
function renderList(id, matches) {
  const ul = document.getElementById(id);
  ul.innerHTML = matches.map(m => `
    <li>
      ${m.utcDate.slice(0,10)}: ${m.homeTeam.name} ${m.score.fullTime.home} - ${m.score.fullTime.away} ${m.awayTeam.name}
    </li>
  `).join('');
}

function renderError(id, msg) {
  document.getElementById(id).innerHTML = `<li>${msg}</li>`;
}

// Carrega 5 últimos jogos
async function fetchRecent() {
  const res = await fetch('/api/recent');
  const data = await res.json();
  renderList('recent-list', data);
}

// Busca por time
document.getElementById('search-form').addEventListener('submit', async e => {
  e.preventDefault();
  const team = document.getElementById('team-input').value;
  const res = await fetch(`/api/search?team=${encodeURIComponent(team)}`);
  const data = await res.json();
  if (data.error) renderError('search-list', data.error);
  else renderList('search-list', data.slice(0,5));
});

// Inicialização
fetchRecent();