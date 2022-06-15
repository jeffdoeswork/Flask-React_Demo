from app import app, db
from models import User, Datas, Hypos, Methods, Observation, format_json, method_json, method_json_data, method_json_title, method_json_yourtitle
from flask import Flask, g, request, jsonify
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, set_access_cookies, unset_jwt_cookies, get_jwt, create_refresh_token, set_refresh_cookies

#make method
@app.route('/method', methods=['POST'])
def make_method():
    email = request.json.get('body_email', None)
    title = request.json.get('title', None)
    observation = request.json.get('observation', None)
    hypo = request.json.get('hypo', None)
    data = request.json.get('data', None)
    draft = request.json.get('draft', None)

    method = Methods(title=title, email_method=email, observation=observation, hypo=hypo, data=data, draft=draft)
    db.session.add(method)
    db.session.commit()

    return "You've created a Method", 200

#get all methods
@app.route('/method', methods=["GET"])
def get_methods():
    methods = Methods.query.order_by(Methods.created_at.desc()).all()
    method_list = []
    for method in methods:
        method_list.append(method_json(method))
    return {'methods' : method_list}

#get user's methods
@app.route('/method/<email>', methods=["GET"])
def get_user_methods(email):
    methods = Methods.query.filter_by(email_method=email).order_by(Methods.created_at.desc()).all()
    method_list = []
    for method in methods:
        method_list.append(method_json(method))
    return {'methods' : method_list}

#get user's methods title
@app.route('/method/<id>/title/<email>', methods=["GET"])
def get_user_methods_title(email, id):
    method_title = Methods.query.add_columns(Methods.id, Methods.title).filter_by(email_method=email, observation=id).order_by(Methods.created_at.desc()).all()
    method_list = []
    for method in method_title:
        method_list.append(method_json_title(method))
    return {'items' : method_list}

#get methods title
@app.route('/method/title/<id>/', methods=["GET"])
def get_methods_title(id):
    method = Methods.query.add_columns(Methods.title).filter_by(id=id).one()
    method_title = method_json_yourtitle(method)
    return {'title' : method_title}

#edit a method
@app.route("/method/<id>", methods=["PUT"])
def update_method_draft(id):
    method = Methods.query.filter_by(id=id)
    method.update(dict(draft=False, created_at = datetime.utcnow()))
    db.session.commit()
    return {'methods' : method_json(method.one())}

#get method's datas
#@app.route("/method/datas/<id>", methods=["GET"])
#def get_methods_data(id):
#    method = Methods.query.add_column(Methods.data).filter_by(id=id).order_by(Methods.created_at.desc()).one()
#    m = method_json_data(method)
#    print(m['data'])
#    return {'methods' : m}

#update method's datas
@app.route("/method/datas/<id>", methods=["PUT"])
def update_methods_data(id):
    new_data = request.json.get('new_data', None)
    new_data_list = []  
    method = Methods.query.add_column(Methods.data).filter_by(id=id).one()
    m = method_json_data(method)
    new_data_list.append(m['data'])
    new_data_list = m['data']   
    if len(new_data_list) >=3:
        new_data_list.pop(0)
    new_data_list.append(new_data)
    method = Methods.query.filter_by(id=id).update({"data":new_data_list, "created_at" : datetime.utcnow()})
    db.session.commit()

    return {'methods' : m}

#create method
@app.route('/methods', methods=['POST'])
def make_methods():
    email = request.json.get('email_method', None)
    title = request.json.get('title', None)
    data = request.json.get('data', None)
    hypo = request.json.get('hypo', None)
    observation = request.json.get('observation', None)
    draft = False

    method = Methods(title=title, email_method=email, hypo=hypo, data=data, observation=observation, draft=draft)
    db.session.add(method)
    db.session.commit()

    return "You've created a Method", 200

#create method
@app.route('/methods/draft', methods=['POST'])
def make_method_draft():
    email = request.json.get('email_method', None)
    title = request.json.get('title', None)
    observation = request.json.get('observation', None)
    draft = False

    method = Methods(title=title, email_method=email, observation=observation, draft=draft)
    db.session.add(method)
    db.session.commit()

    return "You've created a Method", 200





