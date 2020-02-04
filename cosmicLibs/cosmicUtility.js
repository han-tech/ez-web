'use strict'
var request = require('request');
var Configstore = require('configstore');
var pkg = require('../package.json');
var conf = new Configstore(pkg.name);
var Cosmic = require('cosmicjs')();
var TOKEN_KEY = 'token';
var EMAIL_KEY = 'email';
var BUCKET_KEY = 'bucket'
class CosmicUtility{  
    login(email, password, callback){
        request.post({ url: 'https://api.cosmicjs.com/v1/authenticate', form: { email: email, password: password } }, function(err, httpResponse, body) {
            if (err || !body) {
                return callback('Could not authenticate')
            }

            var token = JSON.parse(body).token
            if (!token) {
                return callback('Could not authenticate')
            }

            // save the token
            conf.set(TOKEN_KEY, token)
            conf.set(EMAIL_KEY, email)
            if(callback!=null)
                return callback(null, token);
            else
                return token;
        })
    }
    createBucket(title, slug, read_key, write_key, object_types, objects, webhooks){
        var token = conf.get(TOKEN_KEY);
        var Cosmic = require('cosmicjs')({
            token: token
            });
        return Cosmic.addBucket({
            title: title,
            slug: slug,
            object_types: object_types,
            read_key: read_key,
            write_key: write_key,
            objects: objects,
            webhooks: webhooks
        });            
    }
}
exports.CosmicUtility = CosmicUtility;