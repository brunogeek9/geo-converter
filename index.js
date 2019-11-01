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
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
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
        var local = finalResults[index].address.coord;
        finalResults[index].update(
            {
                location: local
            },
            { multi: true },
            function (err, numberAffected) {
            });
    }

}).error(console.error);