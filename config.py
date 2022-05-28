class Config:
    ''' connection string for MongoDB '''
    DB_URI = 'mongodb+srv://root:root@cluster0.su9lnzy.mongodb.net/?retryWrites=true&w=majority'
    
    ''' api server configuration'''
    api_server_record_path = 'api/infoFetch'

    ''' 
    default servers,
    *** Replace the servers with the servers you run before deployment.
    '''
    servers =  [
        {
            'Server_name': 'Test Server 1',
            'ip': '140.112.31.182',
            'port': 5001,
        },
        {
            'Server_name': 'Test Server 2',
            'ip': '140.112.31.182',
            'port': 5002,
        }
    ]

    ''' default users '''
    users = [
        {
            'username': 'testuser1',
            'password': '1234'
        },
        {
            'username': 'testuser2',
            'password': '2222'
        }
    ]