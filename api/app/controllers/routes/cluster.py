from flask import render_template, Blueprint, request
 
blueprint = Blueprint('cluster', __name__)


################
#### personal routes ####
################
prefix='/p'
croutes = {
    'create':f"{prefix}/create"

}

@blueprint.route(croutes['create'])
def create():
    return {'hello'}


 