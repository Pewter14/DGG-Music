from flask import Flask, jsonify, request, render_template
import os
import requests
from dotenv import load_dotenv

# Carrega API key
load_dotenv()
API_KEY = os.getenv('FOOTBALL_DATA_API_KEY')
HEADERS = {'X-Auth-Token': API_KEY}
BASE_URL = 'https://api.football-data.org/v4'

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recent')
def recent_matches():
    url = f"{BASE_URL}/matches?status=FINISHED&limit=5"
    resp = requests.get(url, headers=HEADERS)
    return jsonify(resp.json().get('matches', []))

@app.route('/api/search')
def search_by_team():
    team = request.args.get('team', '').strip()
    if not team:
        return jsonify(error='Parâmetro team é obrigatório'), 400

    # busca ID do time
    t_resp = requests.get(f"{BASE_URL}/teams?name={team}", headers=HEADERS)
    teams = t_resp.json().get('teams', [])
    if not teams:
        return jsonify(error='Time não encontrado'), 404

    team_id = teams[0]['id']
    m_resp = requests.get(f"{BASE_URL}/teams/{team_id}/matches?status=FINISHED", headers=HEADERS)
    return jsonify(m_resp.json().get('matches', []))

if __name__ == '__main__':
    app.run(debug=True)