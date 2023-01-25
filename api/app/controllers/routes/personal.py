from flask import render_template, Blueprint, request,jsonify
 

blueprint = Blueprint('personal', __name__)


################
#### personal routes ####
################
prefix='/p'
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
    return jsonify({'hello':'red'})


 