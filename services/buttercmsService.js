const Config = require('../config/env.config');
const butterCMSApiUrl = Config.butterCMSApiUrl;
const butterCMSLoginWebhookUrl = Config.butterCMSLoginWebhookUrl;
const butterCMSWebhookUrl = Config.butterCMSWebhookUrl;
const axios = require('axios');
const
  path = require('path'),
  _ = require('underscore')
;
var
  // close env to pass to spawn
  env = _.clone(process.env),
  // get the PATH - in my local Windows, it was Path
  envPath = env.PATH || env.Path,
  // get path to node_modules folder where casperjs and
  // phantomjs-prebuilt are installed
  // this will be different for you
  binDir = path.join(__dirname, './../node_modules/.bin'),
  Spooky = require('spooky')
;
// update the path in the cloned env
env.PATH = env.Path = `${envPath};${binDir}`;
class ButterCMSService{
    async createPage(butterCMSWriteApiKey, page){
        const url = butterCMSApiUrl+'pages/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Token '+butterCMSWriteApiKey
            }
        };
        return await axios.post(url, page, config);
    }
    async createPost(butterCMSWriteApiKey, post){
        const url = butterCMSApiUrl+'posts/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Token '+butterCMSWriteApiKey
            }
        };
        return await axios.post(url, post, config);
    }
    async createCollection(butterCMSWriteApiKey, content){
        const url = butterCMSApiUrl+'content/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Token '+butterCMSWriteApiKey
            }
        };
        return await axios.post(url, content, config);
    }
    async createWebHook(butterCMSUsername, butterCMSPassword, webhookUrl){
        var spooky = new Spooky({
            child: {
                // spooky is trying to call casperjs.bat for windows
                // .bat doesn't work, so call the update .cmd file
                // this fixes issue 2 with the file
                command: /^win/.test(process.platform) ? 'casperjs.cmd' : 'casperjs',
                transport: 'http' ,
                spawnOptions: {
                    // set the env using cloned version
                    // this fixes issue 1 with the path
                    env: env
                }
            },
            casper: {
                logLevel: 'debug',
                verbose: true,
                pageSettings: {
                        loadImages:  false,         // The WebPage instance used by Casper will
                        loadPlugins: false,         // use these settings
                        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
                }
            }
        }, function (err) {
            if (err) {
                e = new Error('Failed to initialize SpookyJS');
                e.details = err;
                throw e;
            }
            
            spooky.start(butterCMSLoginWebhookUrl);
            spooky.then([{username: butterCMSUsername, password:butterCMSPassword, url:webhookUrl},function () {
                this.fill('form.form-horizontal', { 
                    username: username, 
                    password:  password
                }, true);
                this.waitFor(
                    function check() {
                        return (this.getCurrentUrl() === butterCMSWebhookUrl);
                    },
                    function then() { // step to execute when check() is ok
                        this.fill('form[method="post"]', { 
                            'form-0-target': url, 
                            'form-0-event':  'post.all'
                        }, true);
                        this.waitFor(
                            function check() {
                                return this.evaluate(function() {
                                    return document.querySelector('select#id_form-0-event').selectedIndex === 1; 
                                });
                            },
                            function then() { // step to execute when check() is ok
                                this.fill('form[method="post"]', { 
                                    'form-1-target': url, 
                                    'form-1-event':  'page.all'
                                }, true);
                                this.waitFor(
                                    function check() {
                                        return this.evaluate(function() {
                                            return document.querySelector('select#id_form-1-event').selectedIndex === 6; 
                                        });
                                    },
                                    function then() { // step to execute when check() is ok
                                        this.fill('form[method="post"]', { 
                                            'form-2-target': url, 
                                            'form-2-event':  'contentfield.update'
                                        }, true);
                                    },
                                    function timeout() { // step to execute if check has failed
                                        e = new Error('Failed to create webhook for all pages');
                                        e.details = err;
                                        throw e;                            
                                    }
                                );  
                            },
                            function timeout() { // step to execute if check has failed
                                e = new Error('Failed to create webhook for all posts');
                                e.details = err;
                                throw e;                            
                            }
                        );  
                    },
                    function timeout() { // step to execute if check has failed
                        e = new Error('Failed to navigate to home');
                            e.details = err;
                            throw e; 
                    }
                );   
            }]);
            spooky.run();
        });
        spooky.on('error', function (e, stack) {
            console.error(e);
        
            if (stack) {
                console.log(stack);
            }
        });
        spooky.on('log', function (log) {
            if (log.space === 'remote') {
                console.log(log.message.replace(/ \- .*/, ''));
            }
        });
        return null;
    }
}
exports.ButterCMSService = ButterCMSService;