const Config = require('../config/env.config');
const storyblokApiUrl = Config.storyblokApiUrl;
const axios = require('axios');
class StoryblokService{
    async createComponent(storyblokManagementApiKey, spaceId, component){
        const url = storyblokManagementApiKey+spaceId+'/components/';
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+kontentManagementApiKey
            }
        };
        return await axios.post(url, component, config);
    }
    
    async createAndPublishContent(storyblokManagementApiKey, spaceId, content, variant){
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
exports.StoryblokService = StoryblokService;