import configparser
import os
from pymongo import MongoClient
import json
import time

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))
print(type(config['PROD']['DB_URI']))

print('###')
client = MongoClient(config['PROD']['DB_URI'])
db = client['cnlab']
# collection = db['server_records']
# collection = db['server_records']['testuser']
collection = db['servers']
item3 = {
  'server _name': None,
  'ip': '140.112.31.182',
  'port': '5000',
  'info_path': 'api/fetchInfo',
  'record': None
}
item2 = {
  'username': 'testuser',
  'password': '12345678'
}
item1 = {
  'time': time.ctime(time.time()),
  "host": 'Server1',
  "CPUS": [0, 0, 10.9, 20],
  "MEM_USE": 4096,
  "MEM_TOT": 16384,
  "PROCESS":[
    {
      "pid": 12345,
      "owner": "userA",
      "cpu": 10.9,    
      "mem": 1024,   
      "cmd": "python3 -m http.server 8080"
    },
    {
      "pid": 12456,
      "owner": "userB",
      "cpu": 20,    
      "mem": 3072,   
      "cmd": "python3 train.py"
    }
  ]
}
# collection.insert_one(item3)
r = collection.find()
for server in r:
  collection.update_one()
# for item in r:
#   collection.update_one({'_id': item['_id']}, {"$set": {"record": item1}})
# r = collection.find_one({'username': 'testuser', 'password': '1245678'})
# print(r)
# print(type(r))
# print(type(item1))

