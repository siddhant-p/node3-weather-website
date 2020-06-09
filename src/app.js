const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000
//Define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Siddhant Pandit'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me ',
        name: 'Andrew Mead'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'this  is some helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            if(error){
               return res.send({error})

            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })

    })
    // res.send([{
    //     forecast : 30,
    //     location : 'Philadelphia',
    //     address: req.query.address
    // }
    // ])
})
// app.get('/products', (req, res)=>{
//     if(!req.query.search){
//         return res.send({
//             error :'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send([{
//         products : []
//     }

// ])
// })

 app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name:'Andrew mead',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name : 'Andrew mead',
        errorMessage:'Page not found'

    })

})

app.listen(port, ()=>{
    console.log('Server is up on port' +port)
}) 