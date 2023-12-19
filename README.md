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
$ PORT=3000
$ FOLDER="uploads"
$ MONGO_URI=mongodb://localhost:27017/file_sharing_api
$ DAILY_DOWNLOAD_LIMIT=50
$ DAILY_UPLOAD_LIMIT=50

# Schedule the cleanup job to run every day at midnight
$ CLEANUP_SCHEDULE="0 0 * * *"
# Set the inactivity threshold for 7 days
$ INACTIVITY_PERIOD=7
```