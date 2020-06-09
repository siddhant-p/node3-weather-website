const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=69548c2b8e016ab51c35975fde309e03&query=' + latitude +',' + longitude +'&units=f'
    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error){
            callback('Unable to find locations', undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature +' degrees out,but it feels like '+ body.current.feelslike)
        }

    })

}


module.exports = forecast