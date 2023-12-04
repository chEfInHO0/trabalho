# Por algum caralho de razão que eu ainda não sei porque, esse código se aplicado diretamente no app.py não surte efeito, portanto
# esse caralho alado tem que ser importado atraves deste arquivo, pf não altere este arquivo
##########################################################################
###########################!!!!ATENÇÃO!!!!################################
##########################################################################
# Não executar esse código caso o Banco de Dados já existe, ou os dados serão apagados
# Esse arquivo só deve ser executado na primeira vez que ele for inicializado
# FLASK_ENV=development
# FLASK
#
import mysql.connector
from Config.database import db
from Config.config import app

db_cred =  open('./DB/info.txt','r').read().split(';')
DB = mysql.connector.connect(
    host=f'{db_cred[0]}',
    user=f'{db_cred[1]}',
    passwd=f''
)
datas = ['USERS_ARBEIT', 'OS'] #admin
CURSOR = DB.cursor()
for data in datas:
    try:
        CURSOR.execute(f"use {data}")
    except:
        CURSOR.execute(f"CREATE DATABASE {data}") # POR TUDO QUE É MAIS SAGRADO NÃO ALTERE ESSA LINHA
        app.app_context().push()
        db.create_all()
    else:
        print(f'Banco de Dados {data} encontrado')