from flask import request, render_template, flash, redirect, url_for
from flask_login import login_user, logout_user, current_user
from Forms.formModel import Login,Cadastro
from Models.userModel import Users
from Config.database import db

def user_login():
    email = None
    form = Login()
    title = 'Login'
    if request.method == 'POST':
        email = request.form['email']
        nome = request.form['nome']
        user = Users.query.filter_by(email=email).first()
        if user != None:
            flash('Login efetuado com sucesso')
            login_user(user)
            return redirect("dashboard")
        else:
            flash('Usuário não cadastrado')
    return render_template('login.html', form=form,title=title)


def user_logout():
    if current_user.is_authenticated:
        logout_user()
        flash('Volte logo :D')
        return redirect(url_for('login'))
    else:
        return redirect(url_for('login'))
    

def user_sign():
    title = "Cadastro"
    form = Cadastro()
    if request.method == 'POST':
        nome = form.nome.data
        email = form.email.data
        user = Users(nome=nome, email=email)
        db.session.add(user)
        db.session.commit()
        return redirect("/list")
    return render_template("cadastro.html", title=title, form=form)

def user_dashboard():
    title = "Dashboard"
    return render_template("dashboard.html", title=title)


def user_list():
    title = 'Usuarios'
    users = Users.query.order_by(Users.timestamp)
    return render_template('userList.html', title=title, user_db = users)