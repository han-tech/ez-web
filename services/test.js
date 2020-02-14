const StoryblokService = require('../services/storyblokService').StoryblokService;
const storyblokService = new StoryblokService();
(async () => {
    try {
        // one line of csv in here
        let story = {
            slug: 'abcdefss',
            name: 'Greata',
            parent_id: null,
            content: {
                component: 'post2',
                title: 'That\'s was great',
                text: 'body is here',
                image: 'https://a.storyblok.com/f/51376/x/19b4879a86/logo.svg',
                category: 'category 2'
            }
        };
        let stories=[story];
        // Done reading the CSV - now we finally create the component with a definition for each field
        // we can also skip that and define the content type using the interface at app.storyblok.com
        let component = {
            "component": {
                name: "post2",
                display_name: "Post",
                schema: {
                    title: {
                        type: "text",
                        pos: 0
                    },
                    text: {
                        type: "markdown",
                        pos: 1
                    },
                    image: {
                        type: "image",
                        pos: 2
                    },
                    category: {
                        type: "text",
                        pos: 3
                    }
                },
                is_root: true, // is content type
                is_nestable: false // is nestable (in another content type)
            }
        }
        const webhook = {
            story_published_hook: "https://webhook.site/d99e2bd5-5761-4db5-8889-3f6e99cb06c9"
        };
        const site = await storyblokService.createWebHook('bSYBR6Il3gqBYHMb8nNoPgtt-60420-DYpQs8xCekru6GT2xeLR', '75501', webhook);
        console.log(site);
    } catch (e) {
        // Deal with the fact the chain failed
        console.log(e);
    }
})();
