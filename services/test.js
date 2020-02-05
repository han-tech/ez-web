const ForestryService = require('../services/forestryService').ForestryService;
const forestryService = new ForestryService();
(async () => {
    try {
        const site = forestryService.addSite('dinhquangson@gmail.com', 'Th@nh+b1nh', 'han-tech/brevifolia-gatsby-forestry','https://www.google.com');
        console.log(site);
    } catch (e) {
        // Deal with the fact the chain failed
        console.log(e);
    }
})();
