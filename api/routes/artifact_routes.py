from app import app, db
from models import User, Datas, Hypos, Methods, Observation, format_json, hypo_format_json, method_json, format_user, obs_format_json, data_obs_format_json, hypo_obs_format_json
from flask import Flask, g, request, jsonify
from datetime import datetime

#get all artifacts
@app.route("/artifacts", methods=["GET"])
def get_artifacts():
    observations = Observation.query.order_by(Observation.created_at.desc()).all()
    observation_list = []
    for observation in observations:
        observation_list.append(obs_format_json(observation))
    hypos = Hypos.query.order_by(Hypos.created_at.desc()).all()
    hypos_list = []
    for hypo in hypos:
        hypos_list.append(hypo_format_json(hypo))
    datas = Datas.query.order_by(Datas.created_at.desc()).all()
    datas_list = []
    for data in datas:
        datas_list.append(format_json(data))
    artifacts_list = observation_list + datas_list + hypos_list
    sorted_list = sorted(artifacts_list, key=lambda x: datetime.strptime(str(x['created_at']), r'%Y-%m-%d %H:%M:%S.%f'), reverse=True)
    print(sorted_list)

    return {'artifacts': sorted_list}

#get user's artifacts
@app.route("/artifacts/<email>", methods=["GET"])
def get_user_artifacts(email):
    observations = Observation.query.filter_by(email_obs=email).order_by(Observation.created_at.desc()).all()
    observations_list = []
    for observation in observations:
        observations_list.append(obs_format_json(observation))
    hypos = Hypos.query.filter_by(email_hypos=email).order_by(Hypos.created_at.desc()).all()
    hypos_list = []
    for hypo in hypos:
        hypos_list.append(hypo_format_json(hypo))
    datas = Datas.query.filter_by(email_datas=email).order_by(Datas.created_at.desc()).all()
    datas_list = []
    for data in datas:
        datas_list.append(format_json(data))
    artifacts_list = observations_list + datas_list + hypos_list
    sorted_list = sorted(artifacts_list, key=lambda x: datetime.strptime(str(x['created_at']), r'%Y-%m-%d %H:%M:%S.%f'), reverse=True)
    print(sorted_list)

    return {'artifacts': sorted_list}



#get all users
@app.route("/users", methods=["GET"])
def get_users():
    #datas = Datas.query.order_by(Datas.created_at.asc()).all()
    users = User.query.order_by(User.id.asc()).all()
    users_list = []
    for user in users:
        users_list.append(format_user(user))
    return {'users': users_list}