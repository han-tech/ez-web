const contentful = require('contentful-management');
class ContentfulService{
    async createWebHook(contentManagementApiKey, contentfulSpaceId, url){
        const client = contentful.createClient({
            accessToken: contentManagementApiKey
        });
        // Create webhook
        const space = await client.getSpace(contentfulSpaceId);
        return await space.createWebhook( {
            'name': 'Zeit webhook',
            'url': url,
            'topics': [
                '*.*'
            ]
        });
    }
}
exports.ContentfulService = ContentfulService;