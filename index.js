const mongo = require('mongoose');
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
    mydata = data;
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
    restaurant_id: Number
 
});

var Model = mongo.model('restaurants', restaurantSchema);

Model.findOne({}, function (err, data) {
    if (err) return console.error(err);
    consoleAsync(data);
});

console.log(mydata);
