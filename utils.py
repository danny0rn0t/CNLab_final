import requests
import pymongo
from flask import jsonify

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

def query_server_for_record(url):
    r = requests.get(url)
    # print(r.status_code, type(r.status_code))
    # print(r.json(), type(r.json()))
    # print(r.json()['MEM_USE'], type(r.json()['MEM_USE']))
    return r

def update_records(servers):
    for server in servers:
        url = f"http://{server['ip']}:{server['port']}/{server['info_path']}"
        r = query_server_for_record(url)
    ''' 
    TODO
    update dp data
    '''
    pass

