from Config.database import db
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(125),nullable=False)
    email = db.Column(db.String(125),nullable=False,unique=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    os_id = db.relationship("Servico", backref="os")
    def __repr__(self):
        return '<Nome %r>' % self.nome