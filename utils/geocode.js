const request = require('postman-request')

const geocode = (address, callback) => {
    const geoURL = 'https://us1.locationiq.com/v1/search?key=pk.8e6292aaea63c8b22a9b8ef07229ed66&q=' + encodeURIComponent(address) + '&format=json&limit=1'

    request({ url: geoURL, json:true }, (error, response, body)=>{
        if(error){
            callback("Internet Baglanti Hatasi", undefined)
        }else if(body.error){
            callback("URL Bilgilerini Kontrol Ediniz", undefined)
        }else{
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            })
        }
})

}
module.exports = geocode