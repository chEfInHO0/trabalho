from flask_login import LoginManager
from Config.config import app

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'É necessário logar para acessar esse conteudo'
