const ZeitService = require('../services/zeitService').ZeitService;
const ContentfulService = require('../services/contentfulService').ContentfulService;
const GithubService = require('../services/githubService').GithubService;
const PrismicService = require('../services/prismicService').PrismicService;
const zeitService = new ZeitService();
const contentfulService = new ContentfulService();
const githubService = new GithubService();
const prismicService = new PrismicService();
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
exports.insert = async (req, res) => {
    //search by name
    const project = await zeitService.getProjectByName(req.body.name);
    if(project){
        const message = {
            isError : true,
            message : 'Project "'+project.data.name+'" already exists on your team. Please choose a different name.'
        }
        res.status(500).send(message);            
    }else{
        try{
            //create a project and github
            const project = await zeitService.createProject(req.body.name);
            const repository = await zeitService.createRepository(req.body.newGitRepo);
            //push git repo
            await zeitService.pushRepository(req.body.template, req.body.name, repository.data.full_name);
            //link to github
            await zeitService.linkRepository(req.body.newGitRepo, req.body.name);
            //create zeit hook, the .env.development file and the .env.production file
            let hook = await zeitService.createHook(project.data.id);
            if(req.body.datatype=='contentful'){
                // Create webhook
                await contentfulService.createWebHook(req.body.ContentManagementApiKey, req.body.ContentfulSpaceId, hook.data.link.deployHooks[0].url);
            }else if(req.body.datatype=='prismic'){
                // Create repository
                await prismicService.newRepository(req.body.prismicTemplate, req.body.prismicRepository, req.body.prismicUsername, req.body.prismicPassword);
                await snooze(5000);
                // Create prismic webhook
                await prismicService.createWebHook(req.body.prismicRepository, hook.data.link.deployHooks[0].url, req.body.prismicUsername, req.body.prismicPassword);
            }
            let content = '';
            if(req.body.datatype=='contentful'){
                //preparing data for contentfull
                content = "CONTENTFUL_SPACE_ID='"+req.body.ContentfulSpaceId+"'\n"+
                "CONTENTFUL_ACCESS_TOKEN='"+req.body.ContentfulAccessToken+"'";
            } else if(req.body.datatype=='prismic'){
                content = "PRISMIC_REPOSITORY='"+req.body.prismicRepository+"'";
            }
            let buff = new Buffer(content);
            let base64content = buff.toString('base64');
            await githubService.createOrUpdateFile(req.body.newGitRepo, '.env.development', base64content, 'Create .env.development file', null);
            await githubService.createOrUpdateFile(req.body.newGitRepo, '.env.production', base64content, 'Create .env.production file', null);

            res.status(201).send({});
        }
        catch(error) {
            const message = {
                isError : true,
                message : 'There is an occurred error: "'+error.message+'".'
            }
            res.status(500).send(message);            
        }                                        
    }
}

exports.findByName = async (req, res) => {
    //search by name
    return await zeitService.searchProjectByName(req.body.name);
};

exports.list = async (req, res) => {
    //list all projects
    return await zeitService.listProjects();
};

exports.deleteByName = async (req, res) => {    
    //delete the project
    await zeitService.deleteProject(req.params.name);
};