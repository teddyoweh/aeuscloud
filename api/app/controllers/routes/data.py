from flask import render_template, Blueprint, request
import os
from werkzeug.utils import secure_filename
from flask import Flask, flash, request, redirect, url_for, session
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')
blueprint = Blueprint('data', __name__)
UPLOAD_FOLDER = './data/root/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

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
@cross_origin(origin='*',headers=['Authorization'])
@blueprint.route(droutes['upload']['route'], methods=droutes['upload']['method'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    
    file = request.files['file']
    post_data= request.form
    print('post-data',post_data)

    print(file) 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    print('don')
    response="Whatever you wish too return"
    return response
 