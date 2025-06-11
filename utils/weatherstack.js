const request = require('postman-request')

const weatherstack = (lati, long, callback) => {
    const weatherURL = 'https://api.weatherstack.com/current?access_key=cd12e0bf57263aca19a73f60150da30c&query=' + lati + ',' + long 

    request({ url: weatherURL, json:true }, (error, response, body)=>{
        if(error){
            callback("Internet Hatasi", undefined)
        }else if (body.error){
            callback("URL Hatasi", undefined)
        }else{
            callback(undefined, {
                sicaklik: body.current.temperature,
                hissedilen: body.current.feelslike,
                hava: body.current.weather_descriptions[0],
                yagis: body.current.precip
            })
        }
    })

}
module.exports = weatherstack