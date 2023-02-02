import datetime
import random
import re
import hashlib
import bcrypt


class Utils:
    
    def __init__(self):
        self.data_dir = 'data'
        self.root_dir = f'{self.data_dir}/root'
        self.client_dir = f'{self.root_dir}/client'
        self.client_user_dir = f'{self.client_dir}/users'
        self.server_dir = f'{self.root_dir}/server'
        self.users_database = f'{self.server_dir}/users.json'
        self.secret = '$2b$12$.HkBwUbLxWdKzCdX1PqTue'
    def folder_name(self,uuid,password,username,email,firstname):
        data  = uuid+password+username+email+firstname+self.uuid_()
        return self.hash_password(self.secure_password(data))
        pass
    def select_keys(self,arr_dicts, keys): 
        result = []
        for dict in arr_dicts:
            selected = {k: dict[k] for k in keys if k in dict}
            result.append(selected)
        return result 
    def size_of(self,num):
        suffix="b"
        for unit in ["", "k", "m", "g", "t", "p", "e", "z"]:
            if abs(num) < 1024.0:
                return f"{num:3.1f}{unit}{suffix}"
            num /= 1024.0
        return f"{num:.1f}Yi{suffix}"
    def uuid_(self):
        now = datetime.datetime.now()
        day_of_week = now.weekday()
        day_of_month = now.day
        month_of_year = now.month
        year = now.year % 10000
        seconds = now.second
        minute = now.minute
        hour = now.hour
        milliseconds = now.microsecond // 1000
        random_num1 = random.randint(0, 999)
        random_num2 = random.randint(0, 999)
        random_num3 = random.randint(0, 999)
        return '{}{}{}{}{}{}{}{}{}{}{}'.format(day_of_week, day_of_month, month_of_year, year, seconds, minute, hour, milliseconds, random_num1, random_num2, random_num3)

 

    def check_email_or_username(self,input_string):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        username_regex = r'^[a-zA-Z0-9]+$'
        if re.match(email_regex, input_string):
            return 'email'
        elif re.match(username_regex, input_string):
            return 'username'
        else:
            return 'neither'
    def bcrypt_password(self,password):
 
        return  str(bcrypt.hashpw(password.encode('utf-8'), b'$2b$12$p0cNgeq9xrXIer.oLP5snO'))

    def hash_password(self,password):
        return str(hashlib.md5(password.encode()).hexdigest())
    def secure_password(self,password):
            return str(self.hash_password(str(self.hash_password(str(self.bcrypt_password(self.hash_password(password)))))))
    def check_password(self,password):
        return self.secure_password(password) == password

import json
import uuid

class User:
    def __init__(self, uuid):
        self.uuid = uuid
        self.user_info = self.find_user()
    

 
  
    
    def find_user(self):
        print(self.uuid)
        with open(Utils().users_database, 'r') as json_file:
            data = json.load(json_file)
            for user in data:

                if user['id'] == self.uuid:
                  
              
                    return user
            return None

    def get_user_data(self):

        user_data = {
            "id": self.uuid,
            "email": self.user_info['email'],
            "username":self.user_info['username'],
            "first_name": self.user_info['firstname'],
            "last_name": self.user_info['lastname']
        }
 
        return user_data

    # def update_user_data(self, data):
    #     with open(Utils().users_database, 'r') as json_file:
    #         users = json.load(json_file)
    #     for i, user in enumerate(users):
    #         if user['id'] == self.uuid:
    #             users[i].update(data)
    #             break
    #     with open(Utils().users_database, 'w') as json_file:
    #         json.dump(users, json_file)
