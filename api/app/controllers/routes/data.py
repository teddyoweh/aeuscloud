from flask import render_template, Blueprint, request
import os
from werkzeug.utils import secure_filename
from flask import Flask, flash, request, redirect, url_for, session
from flask_cors import CORS, cross_origin
import logging
from app.controllers.utils.Utils import Utils, User
from app.controllers.utils.Storage import Storage
import ast 
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
    }

}

@blueprint.route(droutes['createnotes']['route'], methods=droutes['createnotes']['method'])
def createnotes():
    return {'hello'}

@blueprint.route(droutes['upload']['route'], methods=droutes['upload']['method'])
@cross_origin(origin='*',headers=['Authorization'])
def fileUpload():
    post_data= request.form
    post_data = dict(post_data)
 
    target=os.path.join(Util.client_user_dir,Store.get_user_folder(ast.literal_eval(post_data['userdata'])['id']))
    if not os.path.isdir(target):
        os.mkdir(target)
    
    file = request.files['file']

    

 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
 
    response="Whatever you wish too return"
    return response
 