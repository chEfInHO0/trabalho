from Config.database import db
from flask_login import UserMixin
from datetime import datetime


class Servico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(125),nullable=False)
    desc = db.Column(db.Text,nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.Integer, default=1)
    os_id = db.Column(db.Integer, db.ForeignKey('users.id'))

"""

Este arquivo foi destinado para controlar (Modelar) a tabela de banco de dados dos jogos
id  => Este campo é responsavel por armazenar o id que é gerado automaticamente e incrementando da mesma forma, devido o atributo primary_key
nome  => Este campo é responsavel por armazenar o nome do jogo que é informado pelo usuário e o armazena no banco de dados, o atributo unique impede que sejam criados 2 jogos com o mesmo nome
regras  =>  Este campo é responsavel por armazenar as regras do jogo que é informado pelo usuário e o armazena no banco de dados
min_jogadores  => Este campo é responsavel por armazenar o minimo de pessoas necessárias para iniciar um jogo, ele é informado pelo usuário e o armazena no banco de dados
max_jogadores  => Este campo é responsavel por armazenar o máximo de pessoas necessárias para iniciar um jogo, ele é informado pelo usuário e o armazena no banco de dados
slug  => armanzena uma string que usaremos mais pra frente para alterar a url do site quando a pagina do jogo for acessada
timestamp  => armazena a data e o horario do momento em que o jogo foi criado
user_id  => armazena o id do usuario que criou o jogo e cria um vinculo com ele (um usuario para muitos jogos 1_V)


"""