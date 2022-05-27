import requests
import pymongo
from flask import jsonify
import sys
import time

def valid_user(db: pymongo.database.Database, username: str, password: str) -> bool:
    collection = db['users']
    user = collection.find_one({'username': username, 'password': password})
    if user is None:
        return False
    return True

def gen_reponse(status, data='', error_message=''):
    '''
    status: ['SUCCESSED', 'FAILED']
    '''
    res = {
        'status': status,
        'data': data,
        'error_message': error_message
    }
    return jsonify(res)

def get_records(db):
    collection = db['servers']
    data = []
    for server in collection.find():
        # print(server)
        record = server['record']
        if record is not None:
            data.append(record)
    print(data)
    return data

def update_records(db):
    collection = db['servers']
    for server in collection.find():
        url = f"http://{server['ip']}:{server['port']}/{server['info_path']}"
        
        r = requests.get(url)
        if r.status_code != 200:
            print(f"{time.ctime(time.time())} | query {url} got status code {r.status_code}", file=sys.stderr)
            continue
        collection.update_one({'_id': server['_id']}, {"$set": {"record": r.json()}})


