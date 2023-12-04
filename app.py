from db_init import *
from os import getcwd
from Models.userModel import Users
from Models.osModel import Servico
from flask import render_template, url_for
from flask_login import login_required
from Config.login import *
from Routes.mainRoute import index_index
from Routes.controlRoute import user_login, user_logout, user_sign, user_dashboard, user_list
    ##########################################################################################################################################################
    #####################  - ATENÇÃO - OS ARQUIVOS DE INICIALIZAÇÃO ENCONTRAM-SE DENTRO DA PASTA CONFIG, INCLUINDO AS TEMPLATES             ##################
    #####################  - QUAL QUER ALTERAÇÃO DENTRO DO BANCO DE DADOS DEVE SER MIGRADAS (CONSULTAR ARQUIVO database.py PARA DETALHES)   ##################    
    #####################  - MODIFICAÇÕES NAS ROTAS DEVEM SER REALIZADAS NAS FUNÇÕES DENTRO DA PASTA ROUTES, EM SUA RESPECTIVA ROTA         ##################    
    #####################  -                                                                                                                ##################    
    ##########################################################################################################################################################

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))

@app.route('/', methods=['GET', 'POST'])
def index():
    return user_login()


@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    return user_sign()

@app.route('/dashboard', methods=['GET','POST'])
def dashboard():
    return user_dashboard();

@app.route('/login', methods=['GET', 'POST'])
def login():
    return user_login()


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    return user_logout()

@app.route('/list', methods=['GET', 'POST'])
@login_required
def list_user():
    return user_list()


@app.route('/wait-i-know-you', methods=['GET'])
def page_error():
    page_style = '../static/css/404.css'
    img = 'mac-daddy-dog-costume.jpg'
    title = '404'
    return render_template('err/404.html',img=img,title=title,page_style=page_style)

@app.errorhandler(404)
def not_found(e):
    page_style = '../static/css/404.css'
    img = 'mac-daddy-dog-costume.jpg'
    title = '404'
    return render_template('err/redirect.html',img=img,title=title,page_style=page_style), 404


if __name__ == "__main__":
    app.run(port=3000, host='localhost', debug=True)
