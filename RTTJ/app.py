from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search')
def proxy_search():
    # 1) Pega o termo de busca
    q = request.args.get('q', '').strip()
    if not q:
        return jsonify(error='Parâmetro q é obrigatório'), 400

    # 2) Endpoint correto: format=json primeiro, depois q=
    url = f'https://openwhyd.org/search?format=json&q={requests.utils.quote(q)}'
    headers = {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }

    # 3) Faz a requisição
    resp = requests.get(url, headers=headers)
    # DEBUG: descomente pra ver o que chega
    # print('STATUS:', resp.status_code)
    # print('BODY:', resp.text[:200])

    # 4) Se não vier 200, devolve erro
    if resp.status_code != 200:
        return jsonify(error='Falha na API do Whyd', code=resp.status_code), resp.status_code

    # 5) Tenta parsear JSON
    try:
        data = resp.json()
    except ValueError:
        # Debug: resposta não é JSON
        return jsonify(error='Resposta inválida da API do Whyd'), 502

    # 6) Retorna diretamente o array de posts
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)