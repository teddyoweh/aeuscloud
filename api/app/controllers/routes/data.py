from flask import render_template, Blueprint, request
import os
from werkzeug.utils import secure_filename
from flask import Flask, flash, request, redirect, url_for, session,jsonify
from flask_cors import CORS, cross_origin
import logging
from app.controllers.utils.Utils import Utils, User
from app.controllers.utils.decorators import user_, token_required
from app.controllers.utils.Storage import Storage
import json
import ast 
from datetime import datetime, timedelta
from pathlib import Path

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')
blueprint = Blueprint('data', __name__)
UPLOAD_FOLDER = './data/root/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
Util = Utils()
Store = Storage()
################
#### personal routes ####
################
prefix='/d'
droutes = {
    'createnotes':
    {
        'route':f'{prefix}/createnotes',
        'method':['POST', 'PUT', 'DELETE','GET']
    },
     'upload':
    {
        'route':f'{prefix}/upload',
        'method':['POST']
    },
       'listdata':
    {
     'route':f'{prefix}/data',
    'method':['POST']
    }

}

@blueprint.route(droutes['createnotes']['route'], methods=droutes['createnotes']['method'])
def createnotes():
    return {'hello'}


@blueprint.route(droutes['listdata']['route'], methods=droutes['listdata']['method'])
@cross_origin(origin='*',headers=['Authorization'])
def listdata():
    post_data= request.form
    post_data = dict(post_data)

    user = user_()
    print(user)
    with open(Util.users_database, 'r') as f:
        data = json.load(f)
    
        for _ in data:
        
            if _['id']==user['id']:
                resdata = Util.select_keys(_['meta_data'],['id','filename','size','access','size','created','modified'])
                print(post_data)
                start = int(post_data['start'])
                end = int(post_data['end'])
                print(type(start))
                print(type(end))
                response = jsonify({'data':resdata[start:end],'length':len(resdata[start:end]),'total':len(resdata)})
                return  response




@blueprint.route(droutes['upload']['route'], methods=droutes['upload']['method'])
@cross_origin(origin='*',headers=['Authorization'])
def fileUpload():
    post_data= request.form
    post_data = dict(post_data)
 
    target=os.path.join(Util.client_user_dir,Store.get_user_folder(ast.literal_eval(post_data['userdata'])['id']))
    if not os.path.isdir(target):
        os.mkdir(target)
    
    file = request.files['file']
    

    

 
    filename = secure_filename(file.filename)+Util.uuid_()
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    print('u')
    
    print(user_())
    with open(Util.users_database, 'r') as f:
        data = json.load(f)
    
        for _ in data:
        
            if _['id']==user_()['id']:
                _['activity_history'].append({
                    'title':'Upload File',

                    'date':str(datetime.now())
                })
                destination_size = Path(destination).stat().st_size
                print(destination_size)
                _['meta_data'].append(
                    {    'id':Util.hash_password(Util.secure_password(Util.uuid_()+Util.hash_password(Util.uuid_()))+Util.secure_password(filename+Util.hash_password(Util.size_of( destination_size)))),
                        'filename':file.filename,
                        'path': destination,
                        'size': Util.size_of( destination_size),
                        'access':[_['id']],
                        'created':str(datetime.now()),
                        'modified':str(datetime.now()),
                        'storage_file':filename,
                        
                    }
                )
                with open(Util.users_database, 'w') as fa:
                    json.dump(data, fa, indent=4)
                
          
    print('u')

    
    response="Whatever you wish too return"
    return response
 