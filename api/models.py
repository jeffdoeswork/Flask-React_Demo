from db import db
from datetime import datetime
from sqlalchemy.ext.mutable import Mutable

class MutableDict(Mutable, dict):
    @classmethod
    def coerce(cls, key, value):
        "Convert plain dictionaries to MutableDict."

        if not isinstance(value, MutableDict):
            if isinstance(value, dict):
                return MutableDict(value)

            # this call will raise ValueError
            return Mutable.coerce(key, value)
        else:
            return value

    def __setitem__(self, key, value):
        "Detect dictionary set events and emit change events."

        dict.__setitem__(self, key, value)
        self.changed()

    def __delitem__(self, key):
        "Detect dictionary del events and emit change events."

        dict.__delitem__(self, key)
        self.changed()

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
    title = db.Column(db.Text, unique=True, nullable=True)
    email_method = db.Column(db.Text, db.ForeignKey('User.email'))
    hypo = db.Column(db.INT, db.ForeignKey('Hypos.id'))
    data = db.Column(db.INT, db.ForeignKey('Datas.id'))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    draft = db.Column(db.Boolean, default=True, nullable=False)

class MethodDatas(db.Model):
    __tablename__ = 'MethodDatas'
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.INT, db.ForeignKey('Datas.id'), nullable=False)
    method = db.Column(db.INT, db.ForeignKey('Methods.id'), nullable=False)

class MethodHypos(db.Model):
    __tablename__ = 'MethodHypos'
    id = db.Column(db.Integer, primary_key=True)
    hypo = db.Column(db.INT, db.ForeignKey('Hypos.id'), nullable=False)
    method = db.Column(db.INT, db.ForeignKey('Methods.id'), nullable=False)

def method_datas(data):
    return {
        "id" : data.id,
        "data" : data.data,
        "method" : data.method,
    }

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
        'id' : data.id,
        'title' : data.title,
        'email_method' : data.email_method,
        'observation' : data.observation,
        'hypo' : data.hypo,
        'data' : data.data,
        'created_at' : data.created_at,
        'draft' : data.draft
    }
def method_json_data(data):
    return {
        'data' : data.data,
    }
def method_json_title(data):
    return {
        'key' : data.id,
        'label' : data.title,
    }

def method_json_yourtitle(data):
    return {
    'title' : data.title,
    }