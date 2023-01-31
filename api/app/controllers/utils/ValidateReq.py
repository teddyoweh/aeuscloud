import re
from .Utils import Utils
import json
import uuid
Util = Utils()
class ValidateReq:
    def __init__(self):
     
        with open('data/common_passwords.txt', 'r') as f:
            self.common_passwords = f.read().splitlines()

    def has_errors(self, errors:dict)->bool:
        return bool(errors)
    def does_exists(self,email:str,field:str)->bool:
        with open(Util.users_database, 'r') as f:
            data = json.load(f)
       
            for user in data:
                print(user)
                if user[field] == email:
                    return True
        return False
    def validate_username(self,username):
        special_characters = list('~!@#$%^&*()_+-={}[]:";\'<>?,./|\\')
        for char in str(username):
            if char in special_characters:
                return True
        return False

    def register(self,data:dict)->dict:

        errors = {}
 
        required_fields = ['firstname', 'email', 'lastname', 'password','username']
        for field in required_fields:
            if field not in data or not data[field]:
                errors[field] = f'{field.capitalize()} is required'
            try:
                if len(data[field])==0:
                    errors[field] = f'{field.capitalize()} is required'
            except:
                pass
            
        try:
            if 'password' not in errors:
                if len(data['password']) < 8:
                    errors['password'] = 'Password must be at least 8 characters'
        except:
            pass
        try:
            if 'password' not in errors:
                if data['password'] in self.common_passwords:
                    errors['password'] = 'Please choose a stronger password'
        except:
            pass
        try:
            if 'email' in errors:
                pass
            else:
                email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
                if not re.match(email_regex, data['email']):
                    errors['email'] = 'Invalid email format'
        except:
            pass
        try:
            if 'username' not in errors:
                if self.validate_username(data['username']):
                    errors['username']='Username can only contain letters and numbers'
        except:
            pass
        if 'email' not in errors:
            if self.does_exists(data['email'],'email'):
                errors['email'] = 'Email already exists'
        try:
            if 'username' not in errors:
                if self.does_exists(data['username'],'username'):
                    errors['username'] = 'Username already exists'
        except:
            pass

        return errors
    def login(self,data:dict)->dict:
        errors = {}
 
        required_fields = ['uuid', 'password']
        for field in required_fields:
            if field not in data or not data[field]:
                errors[field] = f'{field.capitalize()} is required'
            try:
                if len(data[field])==0:
                    errors[field] = f'This {field.capitalize()} is required'
            except:
                pass
            

     
        
        # try:
        #     email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        #     if not re.match(email_regex, data['uuid']):
        #         errors['uuid'] = 'Invalid email format'
        # except:
        #     pass
        if Util.check_email_or_username(data['uuid']) =='email':
            if self.does_exists(data['uuid'],'email')==False:
                errors['uuid'] = "Email doesn't exists"
        elif Util.check_email_or_username(data['uuid']) =='username':
            if self.does_exists(data['uuid'],'username')==False:
                errors['uuid'] = "Username doesn't exists"
        

        return errors
