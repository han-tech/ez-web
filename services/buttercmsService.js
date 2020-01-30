const Config = require('../config/env.config');
var FormData = require('form-data');
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
    async createWebHook(butterCMSUsername,butterCMSPassword, webhook){
        const url = 'https://buttercms.com/login';
        var bodyFormData = new FormData();
        bodyFormData.append('username', butterCMSUsername);
        bodyFormData.append('password', butterCMSPassword);
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        axios({method:'post',url:url, data:bodyFormData, headers:bodyFormData.getHeaders()}).then(result => {
            // Handle result…
            console.log(result.data);
          });
        return result;
    }
}
exports.ButterCMSService = ButterCMSService;