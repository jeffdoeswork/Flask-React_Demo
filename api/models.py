from db import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, unique=True, nullable=False)
    hash = db.Column(db.String, nullable=False)

class Observation(db.Model):
    __tablename__ = 'Observation'
    id = db.Column(db.Integer, primary_key=True)
    observation = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email_obs = db.Column(db.Text, db.ForeignKey('User.email'))

class Datas(db.Model):
    __tablename__ = 'Datas'
    id = db.Column(db.Integer, primary_key=True)
    datas = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email_datas = db.Column(db.Text, db.ForeignKey('User.email'))
    observation = db.Column(db.INT, db.ForeignKey('Observation.id'))

class Hypos(db.Model):
    __tablename__ = 'Hypos'
    id = db.Column(db.Integer, primary_key=True)
    hypos = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email_hypos = db.Column(db.Text, db.ForeignKey('User.email'))
    observation = db.Column(db.INT, db.ForeignKey('Observation.id'))

class Methods(db.Model):
    __tablename__ = 'Methods'
    id = db.Column(db.Integer, primary_key=True)
    observation = db.Column(db.INT, db.ForeignKey('Observation.id'))
    title = db.Column(db.Text, unique=True, nullable=False)
    email_method = db.Column(db.Text, db.ForeignKey('User.email'))
    hypo = db.Column(db.INT, db.ForeignKey('Hypos.id'))
    #data = db.Column(db.INT, db.ForeignKey('Datas.id'))
    data = db.Column(db.ARRAY(db.INT))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    draft = db.Column(db.Boolean, default=True)

def format_user(data):
    return {
        "user" : data.email,
        "id" : data.id,
    }

def obs_format_json(data):
    return {
        "observation" : data.observation,
        "id" : data.id,
        "created_at" : data.created_at,
        "email_obs" : data.email_obs
    }

def format_json(data):
    return {
        "datas" : data.datas,
        "id" : data.id,
        "created_at" : data.created_at,
        "email_datas" : data.email_datas,
        "observation" : data.observation,
    }

def data_obs_format_json(data, swipe):
    return {
        "datas" : data.datas,
        "id" : data.id,
        "created_at" : data.created_at,
        "email_datas" : data.email_datas,
        "observation" : data.observation,
        "swipe" : swipe
    }

def hypo_format_json(data):
    return {
        "hypos" : data.hypos,
        "id" : data.id,
        "created_at" : data.created_at,
        "email_hypos" : data.email_hypos,
        "observation" : data.observation
    }

def hypo_obs_format_json(data, swipe):
    return {
        "hypos" : data.hypos,
        "id" : data.id,
        "created_at" : data.created_at,
        "email_hypos" : data.email_hypos,
        "observation" : data.observation,
        "swipe" : swipe
    }
def method_json(data):
    return {
        'title' : data.title,
        'email_method' : data.email_method,
        'observation' : data.observation,
        'hypo' : data.hypo,
        'data' : data.data,
        'created_at' : data.created_at,
        'draft' : data.draft
    }