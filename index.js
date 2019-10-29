var Promise = require('bluebird');
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
    // mydata = data;
    // await console.log(data);
} 
var restaurantSchema = new mongo.Schema({
    address: {
        // building: mongo.Types.Decimal128,
        // coord: [[ {lat: Number}, {long: Number }]],
        street: String,
        // zipcode: mongo.Types.Decimal128
 
    },
    borough: String,
    cuisine: String,
    grades: [{
        grade: String,
        // score: mongo.Types.Decimal128,
        date: Date
    }],
    name: String,
    restaurant_id: Number,
    coordinates: {type: "Point}
 
});

var Model = mongo.model('restaurants', restaurantSchema);
var finalResults = [];
// var query = Model.findOne({}
    // , function (err, data) {
    // if (err) return console.error(err);
    // // consoleAsync(data);
// );
var promises = Model.find({}, function(err, results) {
    results.forEach(function(element) {
        finalResults.push(element);
    });
});

Promise.all(promises).then(function() {
    console.log(finalResults.length);
}).error(console.error);

console.log(finalResults[0]);
// var promise = query.exec();
// promise.addBack(function (err, docs) {
//     mydata = docs;
// });
// console.log(mydata);
// await Model.updateMany({}, { $set: { name: 'foo' } });