var Promise = require('bluebird');
var GeoJSON = require('mongoose-geojson-schema');
const mongo = Promise.promisifyAll(require('mongoose'));

var mydata;
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
    point: mongo.Schema.Types.Point,
});

var Model = mongo.model('restaurants', restaurantSchema);
// var finalResults = [];

// var promises = Model.find({}, function (err, results) {
//     results.forEach(function (element) {
//         finalResults.push(element);
//     });
// });

// Promise.all(promises).then(function () {
//     // Model.updateMany({}, { $set: { point: finalResults.address.coord } });
//     var tam = finalResults.length;
//     console.log(finalResults[0]);
//     for (let index = 0; index < tam; index++) {
//         Model.update({}, { $set: { point: finalResults[index].address.coord } });
//     }
//     console.log(finalResults[0].address.building);
// }).error(console.error);

// Model.findOne({}, function (err, data) {
//     consoleAsync(data);
// })

// console.log(finalResults[0]);
// var promise = query.exec();
// promise.addBack(function (err, docs) {
//     mydata = docs;
// });
// console.log(mydata);
// await Model.updateMany({}, { $set: { point: [] } });