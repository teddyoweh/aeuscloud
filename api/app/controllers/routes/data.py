from flask import render_template, Blueprint, request
 

blueprint = Blueprint('data', __name__)


################
#### personal routes ####
################
prefix='/d'
droutes = {
    'createnotes':f'{prefix}/createnotes'

}

@blueprint.route(droutes['createnotes'])
def createnotes():
    return {'hello'}


 