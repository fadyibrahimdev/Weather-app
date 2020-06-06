const request = require('request')

//we use request to get data from an api (the given url), and get it as a response
//json: true => to parse the data automatically for us
const forecast = (lat, lon, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ee97694b3fa6db9731aa2807e6d6029c&units=metric`
    
    request ({ url, json: true }, (err , res) => {
        if(err){
            callback('unable to connect to the weather services!', undefined)
        }else if(res.body.message !== undefined){
            callback('unable to find location!', undefined)
        }else {
            callback(undefined, `it's currently ${res.body.main.temp} degrees out. there is a ${res.body.main.humidity}% humidity`)
        }
    })
}

module.exports = forecast

