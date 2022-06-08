from app import app, db
from models import User, Datas, Hypos, Methods, Observation, format_json, hypo_format_json, method_json, format_user, obs_format_json, data_obs_format_json, hypo_obs_format_json
from flask import Flask, g, request, jsonify
from datetime import datetime

#create a hypos
@app.route('/hypos', methods=['POST'])
def make_hypo():
    email = request.json.get('body_email', None)
    body = request.json.get('body', None)
    observation = request.json.get('observation', None)

    hypos = Hypos(hypos=body, email_hypos=email, observation=observation)
    db.session.add(hypos)
    db.session.commit()

    return "You've created a Hypo", 200

#get all hypos
@app.route("/hypos", methods=["GET"])
def get_hypos():
    #datas = Datas.query.order_by(Datas.created_at.asc()).all()
    hypos = Hypos.query.order_by(Hypos.id.asc()).all()
    hypos_list = []
    for hypo in hypos:
        hypos_list.append(hypo_format_json(hypo))
    return {'hypos': hypos_list}


#get all hypos observation
@app.route("/hypos/<obs>", methods=["GET"])
def get_obs_hypos(obs):
    hypos = Hypos.query.filter_by(observation=obs).order_by(Hypos.id.asc()).all()
    hypos_list = []
    swipe = 0
    for hypo in hypos:
        hypos_list.append(hypo_obs_format_json(hypo, swipe))
        swipe += 1
    return {'hypos': hypos_list}

#get stingle hypothesis
@app.route("/hypo/<id>", methods=["GET"])
def get_hypo(id):
    hypo = Hypos.query.filter_by(id=id).one()
    formated_hypo = hypo_format_json(hypo)
    return {'hypo' : formated_hypo}