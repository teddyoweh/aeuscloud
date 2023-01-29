from app.controllers.utils.Utils import Utils, User
from flask import Flask, request, jsonify, make_response
import app
from  werkzeug.security import generate_password_hash, check_password_hash
 
import jwt
from datetime import datetime, timedelta
from functools import wraps
  
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
  
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
   
 
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
 
            data = jwt.decode(token, Utils().secret)
        
            current_user = User(data['id']).get_user_data()
    
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
 
        return current_user
  
    return decorated