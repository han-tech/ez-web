const Config = require('../config/env.config');
const butterCMSApiUrl = Config.butterCMSApiUrl;
const axios = require('axios');
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
    async createWebhook(butterCMSWriteApiKey, webhook){
        const url = butterCMSApiUrl+'process_webbook/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Token '+butterCMSWriteApiKey
            }
        };
        return await axios.post(url, webhook, config);
    }
}
exports.ButterCMSService = ButterCMSService;