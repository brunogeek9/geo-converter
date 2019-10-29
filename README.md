# geo-converter

## Project setup
```
npm install
```
## Running mongo in docker
```
docker run -p 27017:27017 --name nosql-mongo -v /home/USER/development/mongo:/data/ -d mongo
mongoimport --db test --collection restaurants --drop --file /data/primer-dataset.json
```
## downloading the dataset
```
git clone https://github.com/gustavoleitao/mongo-dataset.git
```
### Running
```
npm start
```
