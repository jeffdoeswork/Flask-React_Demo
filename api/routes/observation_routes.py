from app import app, db
from models import User, Datas, Hypos, Methods, Observation, format_json, hypo_format_json, method_json, format_user, obs_format_json, data_obs_format_json, hypo_obs_format_json
from flask import Flask, g, request, jsonify
from datetime import datetime


#get all observations
@app.route("/observations", methods=["GET"])
def get_observations():
    observations = Observation.query.order_by(Observation.id.desc()).all()
    observation_list = []
    for observation in observations:
        observation_list.append(obs_format_json(observation))
    return {'observations': observation_list}



#create an observation
@app.route('/observations', methods=['POST'])
def make_observation():
    email = request.json.get('body_email', None)
    body = request.json.get('body', None)

    observations = Observation(observation=body, email_obs=email)
    db.session.add(observations)
    db.session.commit()

    return "You've created an observation", 200


#get stingle observation
@app.route("/observations/<id>", methods=["GET"])
def get_obs(id):
    observation = Observation.query.filter_by(id=id).one()
    formated_obs = obs_format_json(observation)
    return {'observation' : formated_obs}
    