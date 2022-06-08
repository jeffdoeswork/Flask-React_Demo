from app import app, db
from models import User, Datas, Hypos, Methods, Observation, format_json, hypo_format_json, method_json, format_user, obs_format_json, data_obs_format_json, hypo_obs_format_json
from flask import Flask, g, request, jsonify
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, set_access_cookies, unset_jwt_cookies, get_jwt, create_refresh_token, set_refresh_cookies

#create a datas
@app.route('/datas', methods=['POST'])
def make_datas():
    email = request.json.get('body_email', None)
    body = request.json.get('body', None)
    observation = request.json.get('observation', None)

    datas = Datas(datas=body, email_datas=email, observation=observation)
    db.session.add(datas)
    db.session.commit()

    return "You've created a Data", 200

#get stingle datas
@app.route("/data/<id>", methods=["GET"])
def get_data(id):
    data = Datas.query.filter_by(id=id).one()
    formated_data = format_json(data)
    return {'data' : formated_data}
    
#get all datas
@app.route("/datas", methods=["GET"])
def get_datas():
    #datas = Datas.query.order_by(Datas.created_at.asc()).all()
    datas = Datas.query.order_by(Datas.id.asc()).all()
    datas_list = []
    for data in datas:
        datas_list.append(format_json(data))
    return {'datas': datas_list}

#get all datas from observations
@app.route("/datas/<obs>", methods=["GET"])
def get_obs_datas(obs):
    datas = Datas.query.filter_by(observation=obs).order_by(Datas.id.asc()).all()
    swipe = 0
    datas_list = []
    for data in datas:
        datas_list.append(data_obs_format_json(data, swipe))
        swipe += 1
    return {'datas': datas_list}