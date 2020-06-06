const path = require('path') //to handle & concatenate file paths
const express = require('express')
const hbs = require('hbs') //then you will be running: nodemon src/app.js -e js,hbs
//for the server to restart for all js & hbs extensions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicPath = path.join(__dirname, '../public') //to get the path of our static content
const viewsPath = path.join(__dirname, '../templates/views') //to get the path of our views for hbs
const partialsPath = path.join(__dirname, '../templates/partials') //to get path of partials (fixed layouts)

//the name has to be exactly like that for the handlebars to work (it's a template engine)
//it's a regular html but you can inject dynamic values in it
//all the views must like in: projectrootdirectory/views/
app.set('view engine', 'hbs') 
app.set('views', viewsPath) //to set the views default to be the (viewPath) path
hbs.registerPartials(partialsPath) //to set the partials default to the correct path

app.use(express.static(publicPath)) //to use the public folder as a static content

app.get('', (req, res) => {
    //render knows that we use handlebars which is all in views folder
    //it renders the index file in views folder -- no need for extension
    //the 2nd argument is an object of values that we want to pass as a dynamic content
    res.render('index', {
        title: 'Weather App',
        name: 'Fady Attia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Fady Attia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Fady Attia',
        email: 'fadyattia11@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //destrcturing
        if(error) return res.send({ error })
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({ error })
    
            res.send({
                Address: req.query.address,
                location,
                Temp: forecastData
            })       
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errormsg: 'help article not found',
        name: 'Fady Attia'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errormsg: 'Page not found',
        name: 'Fady Attia'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000!')
})