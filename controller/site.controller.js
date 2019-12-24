const Config = require('../config/env.config');
const axios = require('axios');

const githubDeployUrl = Config.githubDeployUrl;
const installationId = Config.installationId;
const org = Config.org;
const token = Config.nowToken;
const projectApiUrl = Config.projectApiUrl;
const projectApiV2Url = Config.projectApiV2Url;
const githubCreateRepoUrl = Config.githubCreateRepoUrl;
const githubPushRepoUrl = Config.githubPushRepoUrl;
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: 'c2e1f8b279fa17edf598783430dabfbfd88952e7'
  });
//create contentfull webhook
const contentful = require('contentful-management');
const teamId = Config.teamId;
const config = {
    headers : {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
};

exports.insert = (req, res) => {
    //search by name
    var url = projectApiUrl+'/list'+'?search='+req.body.name+'&teamId='+teamId;
    axios.get(url, config)
    .then((projects) => {
        //if existed
        if(projects.data.length>0){
            const message = {
                isError : true,
                message : 'Project "'+projects.data[0].name+'" already exists on your team. Please choose a different name.'
            }
            res.status(500).send(message);            
        }else{
            url = projectApiUrl+'?teamId='+teamId;
            //create a project
            axios.post(url,req.body, config)
            .then((project) => {
                const data = {
                    name: req.body.newGitRepo, 
                    installationId: installationId, 
                    private: true
                };
                url = githubCreateRepoUrl;
                //create git repo
                axios.post(url, data, config)
                .then((result)=>{
                    const data = {
                        template: req.body.template, 
                        name: req.body.name, 
                        target: result.data.full_name
                    };
                    url = githubPushRepoUrl;
                    //push git repo
                    axios.post(url, data, config)
                    .then((result)=>{
                        //link to github
                        const data = {
                            type: "github", 
                            repo: req.body.newGitRepo, 
                            org: org
                        };
                        url = projectApiV2Url+'/'+project.data.name+'/link?teamId='+teamId;
                        axios.post(url, data, config)
                        .then((result)=>{
                            let content = "CONTENTFUL_SPACE_ID='"+req.body.ContentfulSpaceId+"'\n"+
                            "CONTENTFUL_ACCESS_TOKEN='"+req.body.ContentfulAccessToken+"'";
                            let buff = new Buffer(content);
                            let base64content = buff.toString('base64');

                            octokit.repos.createOrUpdateFile({
                                owner:'han-tech',
                                repo:req.body.newGitRepo,
                                path:'.env.development',
                                message:'Create .env.development file',
                                content:base64content,
                                branch:'master'
                            }).then((result)=>{
                                octokit.repos.createOrUpdateFile({
                                    owner:'han-tech',
                                    repo:req.body.newGitRepo,
                                    path:'.env.production',
                                    message:'Create .env.production file',
                                    content:base64content,
                                    branch:'master'
                                }).then((result)=>{
                                    
                                })
                                .catch((error)=>{
                                    console.log(error);
                                });  
                            })
                            .catch((error)=>{
                                console.log(error);
                            });                            
                            
                            url = githubDeployUrl+'/?teamId='+teamId;
                            const data = {
                                source:{
                                    type:"github",
                                    projectId:req.body.githubProjectId,
                                    fullName:req.body.githubProjectFullName,
                                    ref:"master",
                                },
                                name:req.body.name,
                                target:"production"
                            };
                            //deploy to github
                            axios.post(url, data, config)
                            .then(()=>{
                                //create zeit hook
                                url = projectApiV2Url+'/'+project.data.id+'/deploy-hooks?teamId='+teamId;
                                hook = {ref:'master',name:'build'}
                                axios.post(url, hook, config)
                                    .then((result)=>{
                                        const client = contentful.createClient({
                                          accessToken: req.body.ContentManagementApiKey
                                        })
                                        
                                        // Create webhook
                                        client.getSpace(req.body.ContentfulSpaceId)
                                        .then((space) => space.createWebhook( {
                                          'name': 'Zeit webhook',
                                          'url': result.data.link.deployHooks[0].url,
                                          'topics': [
                                            '*.*'
                                          ]
                                        }))
                                        .then((webhook) => {
                                            res.status(201).send({});
                                        })
                                        .catch(console.error)                                        
                                    })
                                    .catch((error)=>{
                                        console.log(error);
                                    })
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                        });
                    });
                });
            }).catch(error => {
                const message = {
                    isError : true,
                    message : 'There is an occurred error: "'+error.response+'".'
                }
                res.status(500).send(message);            
            });
        }
    });
};

exports.findByName = (req, res) => {
    //search by name
    var url = projectApiUrl+'/list'+'?search='+req.params.name+'&teamId='+teamId;
    axios.get(url, config)
    .then((projects) => {
        res.status(200).send(projects.data);
    });
};

exports.list = (req, res) => {
    //list all projects
    var url = projectApiV2Url+'/?teamId='+teamId;
    axios.get(url, config)
    .then((projects) => {
        res.status(200).send(projects.data);
    });
};

exports.deleteByName = (req, res) => {
    //list all projects
    var url = projectApiV2Url+'/'+req.params.name+'/?teamId='+teamId;
    axios.delete(url, config)
    .then((projects) => {
        res.status(204).send({});
    });
};