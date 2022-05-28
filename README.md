## Requirements
python 3.10.4
pip install -r requirement.txt
## Usage
curl -X GET "127.0.0.1:5000/server-records?username=testuser1&password=1234"
curl -X POST -d 'username=testuser1' -d 'password=1234' -d 'server_id=508e7dfa-8572-4ed4-85a6-6c5e0c7b37df' 127.0.0.1:5000/kill-process
