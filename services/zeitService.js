const Config = require('../config/env.config');
const axios = require('axios');
const projectApiUrl = Config.projectApiUrl;
const projectApiV1Url = Config.projectApiV1Url;
const projectApiV2Url = Config.projectApiV2Url;
const githubCreateRepoUrl = Config.githubCreateRepoUrl;
const githubPushRepoUrl = Config.githubPushRepoUrl;
const githubDeployUrl = Config.githubDeployUrl;
const org = Config.org;
const gittype = Config.gittype;
const token = Config.nowToken;
const installationId = Config.installationId;
const teamId = Config.teamId;
const config = {
    headers : {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
};
class ZeitService{
    async listProjects(){
        //list all projects
        var url = projectApiV2Url+'/?teamId='+teamId;
        return await axios.get(url, config);
    }

    async deleteProject(name){
        //delete the project
        var url = projectApiV2Url+'/'+name+'/?teamId='+teamId;
        await axios.delete(url, config);
    }

    async searchProjectByName(name) {
        //search by name
        const url = projectApiUrl+'/list'+'?search='+name+'&teamId='+teamId;
        return await axios.get(url, config);
    }
    async getProjectByName(name) {
        //get by name
        const url = projectApiV1Url+'/'+name+'?teamId='+teamId;
        return await axios.get(url, config)
        .then((project)=>{
            return project;
        })
        .catch((error)=>{
            return null;
        });
    }

    async createProject(name){
        const url = projectApiUrl+'?teamId='+teamId;
        //create a project
        return await axios.post(url,{name:name}, config);
    }

    async createRepository(newGitRepo){
        const data = {
            name: newGitRepo, 
            installationId: installationId, 
            private: true
        };
        const url = githubCreateRepoUrl;
        //create git repo
        return await axios.post(url, data, config);
    }

    async pushRepository(template, name, full_name){
        const data = {
            template: template, 
            name: name, 
            target: full_name
        };
        const url = githubPushRepoUrl;
        //push git repo        
        return await axios.post(url, data, config);
    }

    async linkRepository(newGitRepo,projectName){
        //link to github
        const data = {
            type: gittype, 
            repo: newGitRepo, 
            org: org
        };
        const url = projectApiV2Url+'/'+projectName+'/link?teamId='+teamId;
        return await axios.post(url, data, config);
    }

    async deployRepository(githubProjectId, githubProjectFullName,projectName){
        const url = githubDeployUrl+'/?teamId='+teamId;
        const data = {
            source:{
                type:gittype,
                projectId:githubProjectId,
                fullName:githubProjectFullName,
                ref:"master",
            },
            name:projectName,
            target:"production"
        };
        //deploy to github
        return await axios.post(url, data, config);
    }

    async createHook(id){
        //create zeit hook
        const url = projectApiV2Url+'/'+id+'/deploy-hooks?teamId='+teamId;
        const hook = {ref:'master',name:'build'}
        return await axios.post(url, hook, config);
    }
}
exports.ZeitService = ZeitService;