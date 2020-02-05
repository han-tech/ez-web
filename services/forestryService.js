const Config = require('../config/env.config');
const forestryLoginUrl = Config.forestryLoginUrl;
const forestryDashboardUrl = Config.forestryDashboardUrl;
const forestryAddSiteUrl = Config.forestryAddSiteUrl;
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
 // NodeJS/SpookyJS context (they are the same)
 var selectXPath = `xPath = function(expression) {
    return {
      type: "xpath",
      path: expression,
      toString: function() {
        return this.type + " selector: " + this.path;
      }
    };
  };`
class ForestryService{
    async addSite(forestryUsername, forestryPassword, forestryTemplate, webhookUrl){
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
            
            spooky.start(forestryLoginUrl);
            spooky.then([{x: selectXPath,
                username: forestryUsername, 
                password:forestryPassword, 
                url:webhookUrl,
                forestryDashboardUrl:forestryDashboardUrl,
                forestryAddSiteUrl:forestryAddSiteUrl,
                forestryTemplate:forestryTemplate},function () {
                this.fill('form#new_user', { 
                    "user[email]": username, 
                    "user[password]": password
                }, true);
                this.waitFor(
                    function check() {
                        return (this.getCurrentUrl() === forestryDashboardUrl);
                    },
                    function then() { // step to execute when check() is ok
                        eval(x);
                        //this.start(forestryAddSiteUrl);
                        this.thenClick(xPath('//*[@href="#/add-site"]'));
                        this.waitFor(
                            function check() {
                                return (this.getCurrentUrl() === forestryAddSiteUrl);//(this.getElementInfo('//span/following-sibling::h2').text() === 'Select your static site generator');
                            },
                            function then() { // step to execute when check() is ok
                                this.waitForSelector(xPath('//h2[text()="Select your static site generator"]'));
                                this.capture('screenshot.png');
                                this.thenClick(xPath('//*[@title="gatsby"]'));
                                this.capture('screenshot1.png');
                                this.thenClick(xPath('//*[text()="Next"]'));
                                this.thenClick(xPath('//*[text()="Github"]'));
                                this.thenClick(xPath('//label/following-sibling::div/div/div'));
                                this.thenClick(xPath('//*[text()="Next"]'));
                                this.sendKeys(xPath('//label[text()="Repository"]/following-sibling::div/input'), "git@github.com:"+forestryTemplate+".git");
                                this.sendKeys(xPath('//label[text()="Branch"]/following-sibling::div/input'), 'master');
                                this.thenClick(xPath('//*[text()="Next"]'));
                            },
                            function timeout() { // step to execute if check has failed
                                e = new Error('Failed to navigate to add site');
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
        spooky.on('url.changed',function(url) {
            console.log(url);
        });
        spooky.on('log', function (log) {
            if (log.space === 'remote') {
                console.log(log.message.replace(/ \- .*/, ''));
            }
        });
        return null;
    }
}
exports.ForestryService = ForestryService;