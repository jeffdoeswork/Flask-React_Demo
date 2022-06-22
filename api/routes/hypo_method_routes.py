from app import app, db
from models import MethodHypos, method_datas
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