from app import app, db
from models import User, Datas, Hypos, Methods, Observation, MethodDatas, method_datas
from flask import Flask, g, request, jsonify
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, set_access_cookies, unset_jwt_cookies, get_jwt, create_refresh_token, set_refresh_cookies

#add one data to method, methods can have many datas
@app.route('/methoddatas', methods=["POST"])
def add_method_datas():
    data = request.json.get('data', None)
    method = request.json.get('method', None)

    add_method_datas = MethodDatas(data=data, method=method)
    db.session.add(add_method_datas)
    db.session.commit()
    return 'data added to method', 200
