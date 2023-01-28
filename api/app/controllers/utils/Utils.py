import datetime
import random



class Utils:
    def __init__(self):
        self.data_dir = 'data'
        self.root_dir = f'{self.data_dir}/root'
        self.client_dir = f'{self.root_dir}/client'
        self.server_dir = f'{self.root_dir}/server'
        self.users_database = f'{self.server_dir}/users.json'

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



        