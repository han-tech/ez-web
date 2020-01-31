const ButterCMSService = require('../services/butterCMSService').ButterCMSService;
const butterCMSService = new ButterCMSService();
(async () => {
    try {
        const result = butterCMSService.createWebHook('dinhquangson@gmail.com','Th@nhb1nh', 'https://api.zeit.co/v1/integrations/deploy/QmSy4kGHQsJ6jbBJb7jJniLwsbfL9X3yXnCN4YsugXEGFx/jtlWuXPtVq');
    } catch (e) {
        // Deal with the fact the chain failed
        console.log(e);
    }
})();
