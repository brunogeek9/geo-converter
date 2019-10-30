var Promise = require('bluebird');
var GeoJSON = require('mongoose-geojson-schema');
const mongo = Promise.promisifyAll(require('mongoose'));

mongo.connect(
    'mongodb://localhost:27017/geoconv',
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
var restaurantSchema = new mongo.Schema({
    address: {
        street: String,
        building: Number,
        coord: []
    },
    borough: String,
    cuisine: String,
    grades: [{
        grade: String,
        date: Date
    }],
    name: String,
    restaurant_id: Number,
    point: { type: 'Point' },
});

var Model = mongo.model('restaurants', restaurantSchema);
var finalResults = [];

var promises = Model.find({}, function (err, results) {
    results.forEach(function (element) {
        finalResults.push(element);
    });
});

Promise.all(promises).then(function () {
    var tam = finalResults.length;
    console.log(finalResults[0].address.coord);
    
    for (let index = 0; index < tam; index++) {
    finalResults[0].update(
        { point: finalResults[0].address.coord },
        { multi: true },
        function (err, numberAffected) {
            // consoleAsync(numberAffected);
        });
    }
    
    console.log(finalResults[0].address.coord);
}).error(console.error);