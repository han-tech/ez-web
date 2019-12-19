const SiteController = require('../controller/site.controller');

exports.routesConfig = function (app) {

    app.post('/sites', [
        SiteController.insert
    ]);

    app.get('/sites', [
        SiteController.list
    ]);

    app.get('/sites/:name', [
        SiteController.findByName
    ]);

   app.delete('/sites/:name', [
        SiteController.deleteByName
    ]);
};
