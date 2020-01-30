var casper = require('casper').create({   
    verbose: true, 
    logLevel: 'debug',
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});
phantom.casperTest = true;
// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});
var url = 'https://buttercms.com/login/?next=/webhooks/';

casper.start(url, function() {
   console.log("page loaded");
   this.test.assertExists('form.form-horizontal', 'form is found');
   this.fill('form.form-horizontal', { 
        username: 'dinhquangson@gmail.com', 
        password:  'Th@nhb1nh'
    }, true);
});

casper.then(function(){
    this.waitFor(function check() {
        return (this.getCurrentUrl() === 'https://buttercms.com/webhooks/');
    },
    function then() { // step to execute when check() is ok
        this.echo('Navigated to home', 'INFO');
        this.fill('form[method="post"]', { 
            'form-0-target': 'https://api.zeit.co/v1/integrations/deploy/QmSy4kGHQsJ6jbBJb7jJniLwsbfL9X3yXnCN4YsugXEGFx/jtlWuXPtVq', 
            'form-0-event':  'post.all'
        }, true);
    },
    function timeout() { // step to execute if check has failed
        this.echo('Failed to navigate to home', 'ERROR');
    });   
});

casper.run(function() {
    this.echo('Done');
    this.exit();            
});