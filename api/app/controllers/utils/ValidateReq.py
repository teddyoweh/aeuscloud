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
            print(data)
            for user in data:
                print(user)
                if user[field] == email:
                    return True
        return False
    def register(self,data:dict)->dict:

        errors = {}
 
        required_fields = ['firstname', 'email', 'lastname', 'password','username']
        for field in required_fields:
            if field not in data or not data[field]:
                errors[field] = 'This field is required'
            try:
                if len(data[field])==0:
                    errors[field] = f'This {field.capitalize()} is required'
            except:
                pass
            
        try:

            if len(data['password']) < 8:
                errors['password'] = 'Password must be at least 8 characters'
        except:
            pass
        try:
            if data['password'] in self.common_passwords:
                errors['password'] = 'Please choose a stronger password'
        except:
            pass
        try:
            email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            if not re.match(email_regex, data['email']):
                errors['email'] = 'Invalid email format'
        except:
            pass

        if self.does_exists(data['email'],'email'):
            errors['email'] = 'Email already exists'
        try:

            if self.does_exists(data['username'],'username'):
                errors['username'] = 'Username already exists'
        except:
            pass

        return errors
    def login(self,data:dict)->dict:
        errors = {}
 
        required_fields = ['email', 'password']
        for field in required_fields:
            if field not in data or not data[field]:
                errors[field] = f'This {field.capitalize()} is required'
            try:
                if len(data[field])==0:
                    errors[field] = f'This {field.capitalize()} is required'
            except:
                pass
            

     
        
        try:
            email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            if not re.match(email_regex, data['email']):
                errors['email'] = 'Invalid email format'
        except:
            pass

        if self.email_exists(data['email'])==False:
            errors['email'] = "Email doesn't exists"

        return errors
