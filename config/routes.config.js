const SiteController = require('../controller/site.controller');

exports.routesConfig = function (app) {

    app.post('/sites', [
        SiteController.insert
    ]);

    app.get('/sites', [
        SiteController.list
    ]);

    app.get('/sites/:id', [
        SiteController.findById
    ]);

    app.patch('/sites/:id', [
        SiteController.patchById
    ]);

    app.delete('/sites/:id', [
        SiteController.deleteById
    ]);
};
