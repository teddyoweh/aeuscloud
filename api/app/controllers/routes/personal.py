from flask import render_template, Blueprint, request,jsonify
from app.controllers.utils.ValidateReq import ValidateReq
from app.controllers.utils.Utils import Utils
from datetime import datetime
import uuid
import json


blueprint = Blueprint('personal', __name__)


################
#### personal routes ####
################
prefix='/p'
Validator = ValidateReq()
Util = Utils()
proutes = {
    'login':{
         'route':f'{prefix}/login',
        'methods':['POST','GET']
    },
    'register':{
        'route':f'{prefix}/register',
        'methods':['POST','GET']
    }

}

@blueprint.route(proutes['register']['route'],methods=proutes['register']['methods'])
def register():
    user_data = request.form
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
        user_data['id']=str(uuid.uuid4().hex)
        user_data['date']=str(datetime.now())
        user_data['activity_history']=[{
            'title':'Registered Account',
            'date':str(datetime.now())
        }]

        data.append(user_data)

 
    with open(Util.users_database, 'w') as f:
        json.dump(data, f, indent=4)
        response = jsonify({
            'status':'Successfull',
            'data':user_data
        })
        response.status_code = 200
        return response
    

@blueprint.route(proutes['login']['route'],methods=proutes['login']['methods'])
def login():
    user_data = request.form
    validated = Validator.login(user_data)
    if(Validator.has_errors(validated)):
        if validated['email']=="Email doesn't exists":

            response = jsonify({
                        'message':"Email doesn't exist"
                    })
        else:
    
            response = jsonify({
                '':validated
            })
        response.status_code = 401
        return response
   
        pass
    else:
        with open(Util.users_database, 'r') as f:
            data = json.load(f)
        user_data = dict(user_data)
        for _ in data:
            if _['email']==user_data['email'] and _['password'] ==user_data['password']:
                _['activity_history'].append({
                    'title':'Logged IN',
                    'date':str(datetime.now())
                })
                with open(Util.users_database, 'w') as f:
                    json.dump(data, f, indent=4)
                    response = jsonify({
                        'Message':'Login Successfull',
                        'data':_
                    })
                    response.status_code = 200
                    return response
        response = jsonify({
            'message':'Password Incorrect'
        })
        response.status_code = 401
        return response
  
  