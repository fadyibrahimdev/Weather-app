const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmFkeWF0dGlhIiwiYSI6ImNrYXd1YWF5ZDN5dXoydHA2NjQwbHhwdHgifQ.kCU8VM_fLlKfeRoFNlw_6Q&limit=1`
    request({ url, json: true }, (err, res) => {

        if(err){
            callback(console.log('unable to connect to location services!'), undefined)
        }else if(res.body.features.length === 0){
            callback('unable to find location, try another search!', undefined)
        }else{
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode