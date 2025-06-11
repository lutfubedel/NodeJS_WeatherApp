const express = require("express");
const hbs = require("hbs")
const app = express();
const path = require("path");
const weatherstack = require("./utils/weatherstack");
const geocode = require("./utils/geocode");

app.set('view engine','hbs')

const publicPath = path.join(__dirname, './public')
app.use(express.static(publicPath))

const viewsPath = path.join(__dirname, './templates/views')
app.set('views',viewsPath)

const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
     res.render("index", {
        title: "Weather App HBS",
        name : "Lütfü Bedel"
     })
 })


app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help HBS",
        name : "Lütfü Bedel",
     })
});


app.get('/about',(req,res) => {
    res.render("about", {
        title: "About HBS",
        name : "Lütfü Bedel",
        about : "BTU BM 3. sınıf ogrencisi"
     })

}) 


app.get('/weather',(req,res) => {
    if(!req.query.location){
        return res.send({
            error : "Adres bilgisi bulunamadı"
        })
    }
    
    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        weatherstack(latitude,longitude,(error, {sicaklik,hissediln, yagis, hava} = {})=> {
            if(error){
                return res.send({ error })
            }

            res.send({
                location,
                latitude,
                longitude,
                sicaklik,
                hissediln,
                yagis,
                hava
            })
        })
    })
}) 



/* 
app.get('/weather',(req,res) => {
    if(!req.query.location){
        return res.send({
            error : "Adres bilgisi bulunamadı"
        })
    }
    res.send({
        location: req.query.location,
        forecast: "Gunesli"
     })
}) 
*/


/*
app.get('/products',(req,res) => {
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error : "Search terimini doldurunuz"
        })
    }
    res.send({
        products: []
     })
}) 

*/


app.get('/help/*', (req, res) => {
    res.render("404", {
        message : "404 Help Sayfası bulunamadı"
    });
});


app.get('*', (req, res) => {
    res.render("404", {
        message : "404 sayfa bulunamadı"
    });
});


app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})