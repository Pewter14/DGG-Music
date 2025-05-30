 const API_KEY = 'AIzaSyBbXaxgTkhog1czT0ojlEDLa411YgRKN60';

  const btn     = document.querySelector('.search-bar button');
  const input   = document.querySelector('.search-bar input');
  const results = document.getElementById('results');
  const player  = document.getElementById('player');

  btn.addEventListener('click', async (e) => {
    e.preventDefault(); // evita recarregar a página
    const q = input.value.trim();
    if (!q) return alert('Digite algo para buscar');
    results.innerHTML = '<li style="color:white;">Carregando…</li>';
    player.style.display = 'none';

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        new URLSearchParams({
          part: 'snippet',
          q,
          type: 'video',
          maxResults: '6',
          key: API_KEY
        })
      );
      const json = await res.json();
      if (json.error) {
        console.error(json.error);
        throw new Error(json.error.message);
      }

      const items = json.items || [];
      if (!items.length) {
        results.innerHTML = '<li style="color:white;">Nenhum resultado.</li>';
        return;
      }

      results.innerHTML = items.map(item => {
        const vid = item.id.videoId;
        const title = item.snippet.title;
        const thumb = item.snippet.thumbnails.default.url;
        return `
          <li data-video-id="${vid}" style="display:flex;align-items:center;margin:.5rem 0;cursor:pointer;color:white;">
            <img src="${thumb}" alt="" style="margin-right:10px;" />
            <span>${title}</span>
          </li>
        `;
      }).join('');
    } catch (err) {
      results.innerHTML = `<li style="color:red;">Erro: ${err.message}</li>`;
    }
  });

  results.addEventListener('click', e => {
    const li = e.target.closest('li[data-video-id]');
    if (!li) return;
    const vid = li.getAttribute('data-video-id');
    player.src = `https://www.youtube.com/embed/${vid}?autoplay=1`;
    player.style.display = 'block';
    player.scrollIntoView({ behavior: 'smooth' });
  });