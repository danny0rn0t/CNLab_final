import requests
import pymongo
from flask import jsonify
import sys
import time
from config import Config
from uuid import uuid4
import json
from hashlib import sha256

def init_db(db, config: Config):
    '''
    remove all documents in db
    initialize users and servers from config.py
    '''
    print(f"Initializing database ... ", file=sys.stderr)
    collection = db['users']
    collection.delete_many({})
    for user in config.users:
        collection.insert_one(user)
    
    collection = db['servers']
    collection.delete_many({})
    for server in config.servers:
        collection.insert_one({**server, 'server_id': str(uuid4()), 'info_path': config.api_server_record_path, 'killp_path': config.api_server_killp_path, 'records': None})
    print(f"Done.", file=sys.stderr)
    

def valid_user(db: pymongo.database.Database, username: str, password: str) -> bool:
    collection = db['users']
    user = collection.find_one({'username': username, 'password': password})
    if user is None:
        return False
    return True

def gen_reponse(status, data='', message=''):
    '''
    status: ['SUCCESSED', 'FAILED']
    '''
    res = {
        'status': status,
        'data': data,
        'message': message
    }
    return jsonify(res)

def get_records(db):
    collection = db['servers']
    data = []
    for server in collection.find():
        # print(server)
        # record = server['records']
        # if record is not None:
            # data.append(record)
        server['_id'] = str(server['_id'])
        data.append(server)
    print(data)
    return data

def update_records(db, config: Config):
    collection = db['servers']
    time_stamp = time.ctime()
    user = config.users[0]['username']
    secret = config.users[0]['password']
    signature = sha256(f"{user}{time_stamp}{secret}".encode('utf-8')).hexdigest()
    for server in collection.find():
        url = f"http://{server['ip']}:{server['port']}/{server['info_path']}"
        
        try:
            r = requests.get(url, params={"user": user, "signature": signature, "reqTime": time_stamp})
            if r.status_code != 200:
                print(f"{time.ctime()} | query {url} got status code {r.status_code}", file=sys.stderr)
                continue
            print(f"{time.ctime()} | updated records from {url}")
            collection.update_one({'_id': server['_id']}, {"$set": {"records": r.json()}})
        except:
            print(f"{time.ctime()} | query {url} cause connection error", file=sys.stderr)

def send_killp_request(server, pid, username, password):
    time_stamp = int(time.time())
    signature = sha256(f"{username}{time_stamp}{password}".encode('utf-8')).hexdigest()
    url = f"http://{server['ip']}:{server['port']}/{server['killp_path']}"
    data = {'pid': pid, 'signature': signature, 'reqTime': time_stamp, 'user': username}
    try: 
        r = requests.post(url, json=data)
    except:
        return gen_reponse('FAILED', message=f"server connection error")
    if r.status_code != 200:
        return gen_reponse('FAILED', message=f"server replied {r.status_code}")
    return gen_reponse('SUCCESSED', data=r.json())



