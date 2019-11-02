# geo-converter

## project setup
```
npm install
```
## running mongo in docker
```
docker run -p 27017:27017 --name nosql-mongo -v /home/USER/development/mongo:/data/ -d mongo
```
## downloading the dataset
```
git clone https://github.com/gustavoleitao/mongo-dataset.git
```
## importing the dataset to your mongodb
```
mongoimport --db geoconv --collection restaurants --drop --file /data/primer-dataset.json
```

## running the project
```
npm start
```

## after configurations

### Command to create 2dsphere
```
 db.restaurants.createIndex( { location : "2dsphere" } )
```

### Command to fetch restaurant data 1km from Port Authority Bus Terminal (NY)
```
db.restaurants.find(find({
    location:
    {
        $near:
        {
            $geometry:
                { type: "Point", coordinates: [-73.9903, 40.7570] },
            $minDistance: 0, $maxDistance: 1000
        }
    }
})
```