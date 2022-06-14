from app import app, db
from models import User, Datas, Hypos, Methods, Observation, format_json, hypo_format_json, method_json, format_user, obs_format_json, data_obs_format_json, hypo_obs_format_json
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

#edit a method
@app.route("/method/<id>", methods=["PUT"])
def update_method_draft(id):
    method = Methods.query.filter_by(id=id)
    method.update(dict(draft=False, created_at = datetime.utcnow()))
    db.session.commit()
    return {'methods' : method_json(method.one())}

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








