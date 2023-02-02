from flask import render_template, Blueprint, request,jsonify
from app.controllers.utils.ValidateReq import ValidateReq
from app.controllers.utils.Utils import Utils, User
from app.controllers.utils.Storage import Storage
from app.controllers.utils.decorators import token_required
import jwt
from datetime import datetime, timedelta
import uuid
import json
from flask_cors import CORS, cross_origin
 
blueprint = Blueprint('personal', __name__)


################
#### personal routes ####
################
prefix='/p'
Validator = ValidateReq()
Util = Utils()
Store = Storage()
proutes = {
    'login':{
         'route':f'{prefix}/login',
        'methods':['POST','GET']
    },
    'register':{
        'route':f'{prefix}/register',
        'methods':['POST','GET']
    },
    'home':{
        'route':f'{prefix}',
        'methods':['POST','GET']
        }
    

}
 
@blueprint.route(proutes['home']['route'],methods=proutes['home']['methods'])
@cross_origin(origin='*',headers=['Authorization'])
@token_required

def home():
 
    return jsonify({'message':'tes'})


@blueprint.route(proutes['register']['route'],methods=proutes['register']['methods'])
@cross_origin(origin='*',headers=['Authorization'])
def register():
    user_data = request.form
    if request.method == 'POST':
     

        validated = Validator.register(user_data)
        if(Validator.has_errors(validated)):
            response = jsonify({
                'data':validated
            })
            response.status_code = 401
            return response
    
            pass
        else:
            with open(Util.users_database, 'r') as f:
                data = json.load(f)
            user_data = dict(user_data)
 
            user_data['password'] = Util.secure_password(user_data['password'])
            user_data['id']=str(Util.uuid_())
            user_data['meta_data']=[]
            user_data['folder_name'] = Util.folder_name(user_data['id'],Util.secure_password(user_data['password']),user_data['username'],user_data['email'],user_data['firstname'])
            user_data['date']=str(datetime.now())
            user_data['activity_history']=[{
                'title':'Registered Account',
                'date':str(datetime.now())
            }]

            data.append(user_data)
            Store.new_bucket(user_data['folder_name'])

    
        with open(Util.users_database, 'w') as f:
            json.dump(data, f, indent=4)
            response = jsonify({
                'status':'Success, Verify Email Address',
                'data':user_data
            })
            response.status_code = 200
            return response
    response = jsonify({
               'message':'error'
            })
    response.status_code = 500
    return response
 
    

@blueprint.route(proutes['login']['route'],methods=proutes['login']['methods'])
@cross_origin(origin='*',headers=['Authorization'])
def login():
    user_data = request.form
    validated = Validator.login(user_data)
    if(Validator.has_errors(validated)):
        
    
        response = jsonify({
            'data':validated
        })
        response.status_code = 401
        return response
   
        pass
    else:
        with open(Util.users_database, 'r') as f:
            data = json.load(f)
        user_data = dict(user_data)
        for _ in data:
        
            if _['email']==user_data['uuid']  and _['password'] ==Util.secure_password(user_data['password']) or _['username']==user_data['uuid'] and _['password'] == Util.secure_password(user_data['password']):
                _['activity_history'].append({
                    'title':'Logged IN',
                    'date':str(datetime.now())
                })
                with open(Util.users_database, 'w') as f:
                    json.dump(data, f, indent=4)
                token = jwt.encode({
                'id': _['id'],
                'exp' : datetime.utcnow() + timedelta(minutes = 400)
            }, Utils().secret)
                data1 =   {
            "id": _['id'],
            "email": _['email'],
            "username":_['username'],
            "first_name": _['firstname'],
            "last_name": _['lastname']
        }
                response = jsonify({
                    'Message':'Login Successful',
                    'token':token.decode('UTF-8'),
                    'data': data1
                })
                
                response.status_code = 200
                return response
        response = jsonify({
            'data':{
                'password':'Incorrect Password'
            }
        })
        response.status_code = 401
        return response
  
  