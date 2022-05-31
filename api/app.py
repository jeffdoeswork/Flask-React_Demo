from flask import Flask, request, jsonify, redirect, make_response
#import bcrypt
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, set_access_cookies, unset_jwt_cookies, get_jwt, create_refresh_token, set_refresh_cookies
# Expetions for sqlaclemy
from sqlalchemy.exc import IntegrityError
#from flask_jwt_extended import get_jwt
from datetime import datetime, timedelta, timezone
from flask_cors import CORS, cross_origin
#from flask_session import Session
import redis
from models import User, Datas, Hypos, Methods, format_json, hypo_format_json, method_json, format_user
from db import db

app = Flask(__name__)
# SQLAlchemy config. Read more: https://flask-sqlalchemy.palletsprojects.com/en/2.x/
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:catdog123@localhost:5433/postgres'
#Desktop
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:catdog123@localhost:5432/postgres'
#virtual machone
#SQLALCHEMY_DATABASE_URI = r"postgresql+psycopg2://postgres:gelaw01@localhost/postgres"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:gelaw01@localhost/postgres'
#server
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:catdog123@localhost:5432/postgres'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#CORS(app, withCredentials = True)
app.config["CORS_SUPPORTS_CREDENTIALS"]=True


flask_bcrypt = Bcrypt(app)
#Session(app)
db.init_app(app)
# Setup the Flask-JWT-Extended extension. Read more: https://flask-jwt-extended.readthedocs.io/en/stable/options/

# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
app.config['BASE_URL'] = 'http://127.0.0.1:5000'  #Running on localhost
app.config['JWT_TOKEN_LOCATION'] = ["cookies"]
#app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_COOKIE_SECURE'] = False
#app.config['JWT_CSRF_CHECK_FORM'] = True
app.config['JWT_SECRET_KEY'] = "change this"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
#app.config['JWT_COOKIE_DOMAIN'] = ["localhost"]
#app.config["JWT_COOKIE_SAMESITE"] = ["None"]
#app.config['JWT_COOKIE_DOMAIN'] = ["localhost:5000"]


CORS(app, supports_credentials=True)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

jwt_redis_blocklist = redis.StrictRedis(
    host="127.0.0.1", port=5000, db=0, decode_responses=True
)

#create and datas
@app.route('/datas', methods=['POST'])
def make_datas():
    email = request.json.get('body_email', None)
    body = request.json.get('body', None)

    datas = Datas(datas=body, email_datas=email)
    db.session.add(datas)
    db.session.commit()

    return "You've created a Data", 200

#get all datass
@app.route("/datas", methods=["GET"])
def get_datas():
    #datas = Datas.query.order_by(Datas.created_at.asc()).all()
    datas = Datas.query.order_by(Datas.id.asc()).all()
    datas_list = []
    for data in datas:
        datas_list.append(format_json(data))
    return {'datas': datas_list}

#create and hypos
@app.route('/hypos', methods=['POST'])
def make_hypo():
    email = request.json.get('body_email', None)
    body = request.json.get('body', None)

    hypos = Hypos(hypos=body, email_hypos=email)
    db.session.add(hypos)
    db.session.commit()

    return "You've created a Hypo", 200

#make method
@app.route('/method', methods=['POST'])
def make_method():
    email = request.json.get('body_email', None)
    title = request.json.get('title', None)
    hypo = request.json.get('hypo', None)
    data = request.json.get('data', None)

    method = Methods(title=title, email_method=email, hypo=hypo, data=data)
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

#get all hypos
@app.route("/hypos", methods=["GET"])
def get_hypos():
    #datas = Datas.query.order_by(Datas.created_at.asc()).all()
    hypos = Hypos.query.order_by(Hypos.id.asc()).all()
    hypos_list = []
    for hypo in hypos:
        hypos_list.append(hypo_format_json(hypo))
    return {'hypos': hypos_list}

#get all users
@app.route("/users", methods=["GET"])
def get_users():
    #datas = Datas.query.order_by(Datas.created_at.asc()).all()
    users = User.query.order_by(User.id.asc()).all()
    users_list = []
    for user in users:
        users_list.append(format_user(user))
    return {'users': users_list}

#get all artifacts
@app.route("/artifacts", methods=["GET"])
def get_artifacts():
    hypos = Hypos.query.order_by(Hypos.created_at.desc()).all()
    hypos_list = []
    for hypo in hypos:
        hypos_list.append(hypo_format_json(hypo))
    datas = Datas.query.order_by(Datas.created_at.desc()).all()
    datas_list = []
    for data in datas:
        datas_list.append(format_json(data))
    artifacts_list = datas_list + hypos_list
    sorted_list = sorted(artifacts_list, key=lambda x: datetime.strptime(str(x['created_at']), r'%Y-%m-%d %H:%M:%S.%f'), reverse=True)
    print(sorted_list)

    return {'artifacts': sorted_list}

#get user's artifacts
@app.route("/artifacts/<email>", methods=["GET"])
def get_user_artifacts(email):
    hypos = Hypos.query.filter_by(email_hypos=email).order_by(Hypos.created_at.desc()).all()
    hypos_list = []
    for hypo in hypos:
        hypos_list.append(hypo_format_json(hypo))
    datas = Datas.query.filter_by(email_datas=email).order_by(Datas.created_at.desc()).all()
    datas_list = []
    for data in datas:
        datas_list.append(format_json(data))
    artifacts_list = datas_list + hypos_list
    sorted_list = sorted(artifacts_list, key=lambda x: datetime.strptime(str(x['created_at']), r'%Y-%m-%d %H:%M:%S.%f'), reverse=True)
    print(sorted_list)

    return {'artifacts': sorted_list}

#get stingle datas
@app.route("/data/<id>", methods=["GET"])
def get_data(id):
    data = Datas.query.filter_by(id=id).one()
    formated_data = format_json(data)
    return {'data' : formated_data}

#get stingle hypothesis
@app.route("/hypo/<id>", methods=["GET"])
def get_hypo(id):
    hypo = Hypos.query.filter_by(id=id).one()
    formated_hypo = hypo_format_json(hypo)
    return {'hypo' : formated_hypo}

#create method
@app.route('/methods', methods=['POST'])
def make_methods():
    email = request.json.get('email_method', None)
    title = request.json.get('title', None)
    data = request.json.get('data', None)
    hypo = request.json.get('hypo', None)

    method = Methods(title=title, email_method=email, hypo=hypo, data=data)
    db.session.add(method)
    db.session.commit()

    return "You've created a Method", 200

#delete and event
#@app.route("/events/<id>", methods=["DELETE"])
#def delete_event(id):
#    event = Event.query.filter_by(id=id).one()
#    db.session.delete(event)
#    db.session.commit()
#    return f'Event (id: {id} deleted!'

#edit an event
#@app.route("/events/<id>", methods=["PUT"])
#def update_event(id):
#    event = Event.query.filter_by(id=id)
#    description = request.json['description']
#    event.update(dict(description = description, created_at = datetime.utcnow()))
#    db.session.commit()
#    return {'event' : format_event(event.one())}










@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=1))

        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')

        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route("/")
def home():
    return "Hello World!"

@app.route('/register', methods=['POST'])
def register():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        
        if not email:
            return 'Missing email', 400
        if not password:
            return 'Missing password', 400
        
        hashed = flask_bcrypt.generate_password_hash(password).decode('utf-8')
        #hashed = flask_bcrypt.hashpw(password.encode('utf-8'), flask_bcrypt.gensalt())

        user = User(email=email, hash=hashed)
        db.session.add(user)
        db.session.commit()

        #access_token = create_access_token(identity={"email": email})
        #return {"access_token": access_token}, 200
        return "Thanks for making an account", 200
    except IntegrityError:
        # the rollback func reverts the changes made to the db ( so if an error happens after we commited changes they will be reverted )
        db.session.rollback()
        return 'User Already Exists', 400
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400


@app.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        
        if not email:
            return 'Missing email', 400
        if not password:
            return 'Missing password', 400
        
        user = User.query.filter_by(email=email).first()
        if not user:
            return 'User Not Found!', 404
        
            
        if flask_bcrypt.check_password_hash(user.hash, password):
        #if bcrypt.check_password_hash(password, user.hash):
            response = jsonify({"msg": "login successful"})
            #access_token = create_access_token(identity={"email": email})
            #set_access_cookies(response, access_token)
            #return {"access_token": access_token}, 200
            #return response

            access_token = create_access_token(identity={"email": email})
            refresh_token = create_refresh_token(identity={"email": email})

            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        else:
            return 'Invalid Login Info!', 400
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400

@app.route("/logout", methods=["GET"])
def logout_with_cookies():
    #response = jsonify({"msg": "logout successful"})
    #unset_jwt_cookies(response)
    #return response
    resp = make_response(redirect(app.config['BASE_URL'] + '/', 302))
    unset_jwt_cookies(resp)
    return resp

# protected test route
@app.route('/test', methods=['GET'])
#@cross_origin(withCredentials = True)
@jwt_required()
def test():
    #response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    #response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    #response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    #response.headers.add('Access-Control-Allow-Credentials', 'true')
    user = get_jwt_identity()
    email = user['email']

    return jsonify({
        "email": email,
    })


if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host="0.0.0.0", debug=True)