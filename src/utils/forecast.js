const request = require('request');

forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=49088faa4578fd65877d97fbf6281e52&query=' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Connection problem!', undefined);
    } else if (body.error) {
      callback('Coordinate error!', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. There is ' +
          body.current.precip +
          ' % chance of rain.'
      );
    }
  });
};

module.exports = forecast;
