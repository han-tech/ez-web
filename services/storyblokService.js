// npm install storyblok-js-client
const StoryblokClient = require('storyblok-js-client')

// Initialize the client with the oauth token

class StoryblokService{
    async createComponentAndStories(storyblokManagementApiKey, spaceId, stories, component){
        let Storyblok = new StoryblokClient({
            oauthToken: storyblokManagementApiKey,
            cache: {type: 'memory',clear: 'auto'}
        });

        stories.forEach(story => {
            Storyblok.post(`spaces/${spaceId}/stories/`, {
                story
            }).then(res => {
                console.log(`Success: ${res.data.story.name} was created.`)
            }).catch(err => {
                console.log(`Error: ${err}`)
            });
        });

        Storyblok.post(`spaces/${spaceId}/components/`, component).then(res => {
            console.log(`Success: ${res.data.component.name} was created.`)
        }).catch(err => {
            console.log(`Error: ${err}`)
        });
        
        return null;
    }
    
    async createWebHook(storyblokManagementApiKey, spaceId, webhook){
        let Storyblok = new StoryblokClient({
            oauthToken: storyblokManagementApiKey,
            cache: {type: 'memory',clear: 'auto'}
        });
        Storyblok.get(`spaces/${spaceId}/`).then(res => {
            var space = res.data;
            space.story_published_hook = webhook.story_published_hook;
            Storyblok.put(`spaces/${spaceId}/`, space).then(res => {
                console.log(`Success: ${res.data.space.story_published_hook} was created.`)
            }).catch(err => {
                console.log(`Error: ${err}`)
            });
        }).catch(err => {
            console.log(`Error: ${err}`)
        });        
        
        return null;
    }
}
exports.StoryblokService = StoryblokService;