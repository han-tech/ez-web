const config = require('./config/env.config.js');
const express = require('express');
const bodyParser = require('body-parser');
// Import the axios library, to make HTTP requests
const axios = require('axios');
const Router = require('./config/routes.config');

const app = express();
// This is the client ID and client secret that you obtained
// while registering the application
const clientID = 'b17f919903f7f0236823'
const clientSecret = 'faf0619056ad2bbc29f68bed676e1aadaed8b5a0'


// Declare the redirect route
app.get('/home', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token
    console.log(response.data)
    
    // redirect the user to the home page, along with the access token
    res.redirect(`/home.html?access_token=${accessToken}`)
  })
})
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
Router.routesConfig(app);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
