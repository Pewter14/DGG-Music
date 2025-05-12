from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente (se houver)
load_dotenv()

app = Flask(__name__)
CORS(app)  # só para permitir seu front chamar /api/* sem bloqueio

# Rota principal: serve templates/index.html
@app.route('/')
def index():
    return render_template('index.html')

# Proxy de busca no Openwhyd
@app.route('/api/search')
def proxy_search():
    q = request.args.get('q', '').strip()
    if not q:
        return jsonify(error='q é obrigatório'), 400

    url = f'https://openwhyd.org/search?q={requests.utils.quote(q)}&format=json'
    resp = requests.get(url)
    if resp.status_code != 200:
        return jsonify(error='falha no Openwhyd'), resp.status_code

    return jsonify(resp.json())

if __name__ == '__main__':
    # Importante: certifique-se de estar na pasta `your-project` ao rodar.
    app.run(host='127.0.0.1', port=5000, debug=True)
