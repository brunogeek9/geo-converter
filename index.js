var Promise = require('bluebird');
// var GeoJSON = require('mongoose-geojson-schema');
const mongo = Promise.promisifyAll(require('mongoose'));
const PORT = 27017;
const DB_NAME = 'geoconv';
mongo.connect(
    `mongodb://localhost:${PORT}/${DB_NAME}`,
    { useNewUrlParser: true }
);
var db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('conectado');
});
async function consoleAsync(data) {
    await console.log(data);
}
require('./model');
var Model = mongo.model('restaurants');
var finalResults = [];

var promises = Model.find({}, function (err, results) {
    results.forEach(function (element) {
        finalResults.push(element);
    });
});

Promise.all(promises).then(function () {
    var tam = finalResults.length;

    for (let index = 0; index < tam; index++) {
        var local = finalResults[index].address.coord;
        finalResults[index].updateOne(
            {
                location: local
            },
            { multi: true },
            function (err, numberAffected) {
            });
    }
    console.log(local);
}).error(console.error);
//latitude 40.7570 Longitude: -73.9903.
//Criando o indice 2dsphere db.restaurants.createIndex( { location : "2dsphere" } )
//buscando os dados 
Model.find({
    location:
    {
        $near:
        {
            $geometry:
                { type: "Point", coordinates: [-73.9903, 40.7570] },
            $minDistance: 0, $maxDistance: 1000
        }
    }
}, function (err, d) {
    //como são muitos dados, apenas printei a quantidade de restaurantes
    console.log(d.length)
    if (err) return console.error(err);

});

