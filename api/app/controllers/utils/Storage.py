from .Utils import Utils
import json
import uuid
import os
Util = Utils()
class Storage:
    def __init__(self):
        pass


    def new_bucket(self,filename):
        filename =   Util.client_user_dir+'/'+filename
        os.makedirs(filename)
    def get_user_folder(self,uuid):
        with open(Util.users_database, 'r') as f:
            data = json.load(f)
 
        for _ in data:
            if _['id']==uuid:
                return _['folder_name']

        