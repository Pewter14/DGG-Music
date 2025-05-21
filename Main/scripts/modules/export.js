function exportLocalStorage() {
  const data = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key   = localStorage.key(i);
    const value = localStorage.getItem(key);
    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'localStorageBackup.json';
  a.click();

  URL.revokeObjectURL(url);
}

function importLocalStorage(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    for (const [key, value] of Object.entries(data)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    alert('Dados importados com sucesso!');
  };
  reader.readAsText(file);
}
