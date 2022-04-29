from db import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, unique=True, nullable=False)
    hash = db.Column(db.String, nullable=False)

class Datas(db.Model):
    __tablename__ = 'Datas'
    id = db.Column(db.Integer, primary_key=True)
    datas = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email_datas = db.Column(db.Text, db.ForeignKey('User.email'))

def format_json(data):
    return {
        "datas" : data.datas,
        "id" : data.id,
        "created_at" : data.created_at,
        "email_datas" : data.email_datas
    }