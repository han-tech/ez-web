const Config = require('../config/env.config');
const kontentApiUrl = Config.kontentApiUrl;
const axios = require('axios');
class KontentService{
    async createContentType(kontentManagementApiKey, projectId, contentType){
        const url = kontentApiUrl+projectId+'/types/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+kontentManagementApiKey
            }
        };
        return await axios.post(url, contentType, config);
    }
    async createContent(kontentManagementApiKey, project, content){
        const url = kontentApiUrl+project+'/items/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+kontentManagementApiKey
            }
        };
        return await axios.post(url, content, config);
    }
    async createAndPublishContent(kontentManagementApiKey, project, content, variant){
        const itemsUrl = kontentApiUrl+project+'/items/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+kontentManagementApiKey
            }
        };
        const item = await axios.post(itemsUrl, content, config);
        const variantsUrl = kontentApiUrl+project+'/items/'+item.data.id+'/variants/00000000-0000-0000-0000-000000000000';
        
        var result = await axios.put(variantsUrl, variant, config);
        const publishUrl = variantsUrl + '/publish';
        return await axios.put(publishUrl, null, config);
    }
    async createWebHook(kontentManagementApiKey, project, webhook){
        const webhooksUrl = kontentApiUrl+project+'/webhooks/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+kontentManagementApiKey
            }
        };
        
        return await axios.post(webhooksUrl, webhook, config);
    }
}
exports.KontentService = KontentService;