const btn              = document.getElementById('btn-search');
const input            = document.getElementById('query');
const resultsContainer = document.getElementById('results');
const playerContainer  = document.getElementById('player-container');

btn.addEventListener('click', async () => {
  const q = input.value.trim();
  if (!q) return alert('Digite algo para buscar');

  resultsContainer.innerHTML = '<li>Carregando…</li>';
  playerContainer.innerHTML  = '';

  try {
    const res  = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // data é um Array de posts
    const posts = Array.isArray(data) ? data : [];
    if (!posts.length) {
      resultsContainer.innerHTML = '<li>Nenhum resultado encontrado.</li>';
      return;
    }

    // renderiza lista
    resultsContainer.innerHTML = posts.map((p, i) => {
      const name = p.name || 'Sem título';
      const eId  = p.eId || ''; 
      return `<li data-eid="${eId}">${i+1}. <strong>${name}</strong></li>`;
    }).join('');
  } catch (err) {
    resultsContainer.innerHTML = `<li class="error">Erro: ${err.message}</li>`;
    console.error(err);
  }
});

resultsContainer.addEventListener('click', e => {
  const li  = e.target.closest('li[data-eid]');
  if (!li) return;
  const eId = li.getAttribute('data-eid');
  if (!eId) {
    playerContainer.innerHTML = '<p class="error">Este item não possui player embed.</p>';
    return;
  }

  // monta o iframe embed do Whyd
  playerContainer.innerHTML = `
    <iframe
      width="100%"
      height="120"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://openwhyd.org${eId}/embed">
    </iframe>
  `;
});
