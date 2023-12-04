from flask import Flask

app = Flask(__name__)
# DB
db_cred =  open('./DB/info.txt','r').read().split(';')
###############  [database antigo] ###############
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db' 
###############  [database antigo] ###############
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_cred[1]}@{db_cred[0]}/users_arbeit'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Chave CSFR
app.config['SECRET_KEY'] = 'DBZ > NARUTO'