import requests
def query_server_for_record(url):
    r = requests.get(url)
    print(r)

