const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const PublicPath = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve as 
app.use(express.static(PublicPath))
 
app.get('',(req,res) =>{
    res.render('index',{
        title:'Home Page',
        name:'Sriharsha'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Page',
        name:'Sriharsha'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'help page',
        name:'Sriharsha',
        helptext:'This is help text'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address is Must'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            //console.log(location)
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address})
        })
    })
    
    
    // res.send({
    //     forecast:'Forcast',
    //     location:'Location',
    //     address:req.query.address
    // })   
})

app.get('/products', (req,res) => {
    if (!req.query.qty){
        return res.send({
            error:'Qty is Must'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })

})
app.get('/help/*',(req,res) => {
    res.render('error', {
        errorMessage:'Help not Found',
        name:'Sriharsha Error'
    })
})
app.get('*', (req,res) =>{
    //res.send('404')
    res.render('error', {
        errorMessage:'404! No Page found',
        name:'Sriharsha Error'
    })
})

app.listen(3000, () => {
    console.log('Server Started Successfully!!!')
})
