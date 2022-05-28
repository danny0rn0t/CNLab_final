## Requirements
python 3.10.4

install packages by 
```shell
pip install -r requirement.txt
```
## Deploy 
1. setup users' and servers' information in config.py
2. run backend script 
```shell=
python main.py
```
## Testing backend with proxy api server
1. run proxy api server
```shell=
python testserver.py --id=<id> --port=<port>
```
2. modify ip and port info in config.py according to the api server you run
3. run backend
```shell=
python main.py
```


## Example usage
get records
```shell=
curl -X GET "127.0.0.1:5000/server-records?username=testuser1&password=1234"
```
kill process
```shell=
curl -X POST -d 'username=testuser1' -d 'password=1234' -d 'server_id=<server_id>' -d 'pid=<pid>' 127.0.0.1:5000/kill-process
```
