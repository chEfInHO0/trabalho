from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField,EmailField,BooleanField,validators,SelectField, IntegerField
from wtforms.validators import DataRequired, EqualTo
from wtforms.widgets import TextArea


class Cadastro(FlaskForm):
    nome = StringField('Nome',validators=[DataRequired()])
    email = EmailField('E-mail',validators=[DataRequired(),validators.Email()])
    enviar = SubmitField('Cadastrar')


class Login(FlaskForm):
    nome = StringField('Nome',validators=[DataRequired()])
    email = EmailField('E-mail',validators=[DataRequired(),validators.Email()])
    enviar = SubmitField('Login') 