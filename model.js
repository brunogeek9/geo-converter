var Promise = require('bluebird');
// var GeoJSON = require('mongoose-geojson-schema');
const mongo = Promise.promisifyAll(require('mongoose'));
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

module.exports = mongo.model('restaurants', restaurantSchema);