const SiteController = require('../controller/site.controller');
const ThemeController = require('../controller/template.controller');

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

    app.post('/themes', [
        ThemeController.insert
    ]);

    app.get('/themes', [
        ThemeController.list
    ]);

    app.get('/themes/:id', [
        ThemeController.findById
    ]);

    app.patch('/themes/:id', [
        ThemeController.patchById
    ]);

   app.delete('/themes/:id', [
        ThemeController.deleteById
    ]);
};
