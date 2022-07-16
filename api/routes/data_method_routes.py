from app import app, db
from models import User, Datas, Hypos, Methods, Observation, MethodDatas, method_datas, format_json
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

@app.route('/methoddatas/<method>/delete/<data>', methods=["DELETE"])
def delete_method_datas(method, data):
    artifact = MethodDatas.query.filter_by(method=method, data=data).one()
    db.session.delete(artifact)
    db.session.commit()
    return 'deleted', 200

#get methdo's datas
@app.route('/methoddatas/datas/<method>', methods=["GET"])
def get_all_method_datas(method):
    methoddatas = MethodDatas.query.filter_by(method=method).all()
    methoddatas_list = []
    datas_list = []
    for datas in methoddatas:
        methoddatas_list.append(method_datas(datas))
        a_data = Datas.query.filter_by(id=datas.data).one()
        datas_list.append(format_json(a_data))
    #for data in methoddatas_list:
    #    a_data = Datas.query.filter_by(id=data).one()
    #    datas_list.append(format_json(a_data))

    return {"datalist" : datas_list}
