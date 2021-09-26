const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define Paths For Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars Engine And Views Location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.',
    name: 'Andrew Mead',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        // console.log(location);
        // console.log(forecastData);

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  //localhost:3000/products?search=games&rating=5
  console.log(req.query);

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error',
    error: '404',
    message: 'Help Page Not Found',
    name: 'Andrew Mead',
  });
});

app.get('/about/*', (req, res) => {
  res.render('404', {
    title: 'Error',
    error: 'Error 404',
    message: 'About Page Not Found',
    name: 'Andrew Mead',
  });
});

// * Match anything that hasn't been matched so far
app.get('*', (req, res) => {
  res.render('404', {
    title: 'ERROR',
    error: 'Error 404',
    message: 'Page Not Found',
    name: 'Andrew mead',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

// nodemon src/appjs -e js,hbs
