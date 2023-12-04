from flask import render_template, request, flash
from Forms.formModel import Cadastro
from Config.database import db
from Models.userModel import Users
def isNomeValido(nome:str):
    if (len(nome.split(" "))) < 2:
        return -1
    elif len(nome) < 5:
        return -2
    return 0

def isEmailValido(email):
    if(email.split("@")[-1] != 'arbeit-ajax.com.br'):
        return False
    return True

def index_index():
    title = "Login"
    form = Cadastro()
    if form.validate_on_submit():
        nome = form.nome.data
        email = form.email.data
        verificaNome = isNomeValido(nome)
        verificaEmail = isEmailValido(email)
        print(Users.query.filter_by(email=email).first() == None)
        if(Users.query.filter_by(email=email).first() == None):
            if (verificaNome == 0):
                if (verificaEmail):
                    user = Users(nome=nome, email=email)
                    db.session.add(user)
                    db.session.commit()
                else:
                    flash("E-mail inválido")
                    form.email.data = ''
            else:
                if(verificaNome == -1):
                    flash("Use pelo menos 1 sobrenome")
                else:
                    flash('Nome deve conter pelo menos 5 caracteres')
            flash("Cadastro bem sucedido")
            form.nome.data = ''
            form.email.data = ''

        else:
            flash("E-mail já cadastrado")
    return render_template("login.html", title=title, form=form)
