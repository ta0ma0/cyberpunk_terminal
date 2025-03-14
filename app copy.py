from flask import Flask, render_template, send_from_directory, url_for, jsonify
import requests
from datetime import datetime
import os
from dotenv import load_dotenv
from random_convers import readfile
import json


app = Flask(__name__)


def create_numbered_dict(my_list):
    """Создает словарь из списка, где ключи - цифры от 1 до конца списка."""
    return {i + 1: value for i, value in enumerate(my_list)}


@app.route('/')
def index():
    chat_messages = readfile()
    
    messages = create_numbered_dict(chat_messages)
    messages = json.dumps(messages)
    print(type(messages))
    repo_count = get_repos()
    current_date = get_current_datetime()
    pdf_url = url_for('static', filename='resume.pdf')
    return render_template('index.html',  repo_count=repo_count, current_date=current_date, pdf_url=pdf_url, chat_messages=messages)

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


def get_repos():
    load_dotenv()
    username = 'ta0ma0' # Замените на ваш логин GitHub
    token = os.environ.get('GITHUB_TOKEN')
    headers = {}
    if token:
        headers['Authorization'] = f'token {token}'
    url = f'https://api.github.com/users/{username}/repos'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        repos = response.json()
        count = len(repos)
        return f"Count of Repos {count} on GitHub."
    else:
        return f"Ошибка: {response.status_code}"



def get_current_datetime():
    """
    Возвращает текущую дату и время в формате 'YYYY-MM-DD HH:MM:SS'.
    """
    now = datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")



if __name__ == '__main__':
    app.run(debug=False)