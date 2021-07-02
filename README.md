# NA-Helper

Page for Naruto-Arena players where they can see skills and missions of all available characters.

## How to open an app in three steps

1.
### Prepare json

Upload your json file with chars to any API

create an `.env` file with the following keys:
```
REACT_APP_SECRET_KEY = <key for your API>
REACT_APP_API = <your JSON file location>
REACT_APP_LAST_UPDATE = <date of last update of your JSON file>
```

Adjust `getData` function to match your API

2.
### Install dependencies

```bash
npm i
cd frontend && npm i
```

3.
### Run application
```bash
npm run dev
```



#### Note: backend folder is useless now and will be deleted when I'll get some free time ;)
