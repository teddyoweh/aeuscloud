import re
class ValidateReq:
    def __init__(self):
        pass
    def has_errors(self, errors:dict)->bool:
        return bool(errors)
    def email_exits(self,email:str)->bool:
        pass
    def register(self,data:dict)->dict:
        errors = {}
 
        required_fields = ['firstname', 'email', 'lastname', 'password']
        for field in required_fields:
            if field not in data or not data[field]:
                errors[field] = 'This field is required'
        if len(data['password']) < 8:
            errors['password'] = 'Password must be at least 8 characters'


        with open('data/common_passwords.txt', 'r') as f:
            common_passwords = f.read().splitlines()
        if data['password'] in common_passwords:
            errors['password'] = 'Please choose a stronger password'

        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, data['email']):
            errors['email'] = 'Invalid email format'

        if self.email_exists(data['email']):
            errors['email'] = 'Email already exists'

        return errors
