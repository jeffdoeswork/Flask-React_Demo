from app import app, db
from models import MethodHypos, Hypos, method_hypo, hypo_format_json
from flask import Flask, g, request, jsonify
from datetime import datetime

#add one data to method, methods can have many datas
@app.route('/methodhypos', methods=["POST"])
def add_method_hypos():
    hypo = request.json.get('hypo', None)
    method = request.json.get('method', None)

    add_method_hypos = MethodHypos(hypo=hypo, method=method)
    db.session.add(add_method_hypos)
    db.session.commit()
    return 'hypo added to method', 200

@app.route('/methoddatas/delete/<method>', methods=["DELETE"])
def delete_method_hypos(method):
    artifacts =MethodHypos.__table__.delete().where(MethodHypos.method == method)
    db.session.execute(artifacts)
    db.session.commit()
    return 'deleted', 200

#get methdo's hypo
@app.route('/methodhypo/hypo/<method>', methods=["GET"])
def get_a_method_hypo(method):
    methodhypo = MethodHypos.query.filter_by(method=method).one()
    a_hypo = Hypos.query.filter_by(id=methodhypo.hypo).one()
    a_hypo = (hypo_format_json(a_hypo))
    print(a_hypo)
    #for data in methoddatas_list:
    #    a_data = Datas.query.filter_by(id=data).one()
    #    datas_list.append(format_json(a_data))

    return {"methodhypo" : a_hypo}