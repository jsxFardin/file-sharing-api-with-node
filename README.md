# File Sharing API

### Install node packages

```
$ npm i
```

### Create and setup .env file

```
make a copy of .env.example
$ copy .env.example .env

$ MODE=development
# port (default 3000)
$ PORT=3000
# client url (default "http://localhost:3000")
$ CLIENT_URL="http://localhost:3000"
# file upload folder name (default "uploads")
$ FOLDER="uploads"
# mongo db url
$ MONGO_URI=mongodb://localhost:27017/db_name
# daily download limit (defalut 50)
$ DAILY_DOWNLOAD_LIMIT=50
# daily upload limit (defalut 50)
$ DAILY_UPLOAD_LIMIT=50
# in MB max upload file size (by defalut 2 MB)
$ UPLOAD_FILE_SIZE=2 

# Schedule the cleanup job to run every day at midnight
$ CLEANUP_SCHEDULE="0 0 * * *"
# Set the inactivity threshold for 7 days
$ INACTIVITY_PERIOD=7
```

### Serving application
```
$ npm run start
```

### testing application
```
$ npm run test
```

### API's

#### POST /files​
```
$ request param: file (​multipart/form-data)

$ response: {
    "status": 201,
    "message": "File uploaded successfully",
    "data": {
        "publicKey": "Z76UqYgLIG",
        "privateKey": "TWvg837C47s"
    }
}
```
#### ​GET /files/:publicKey​
```
$ query param: publicKey​ 

$ response: MIME type actual file
```
#### DELETE /files/:privateKey​
```
$ query param: privateKey​ 

$ response: {
    "status": 200,
    "message": "File deleted successfully"
}
```