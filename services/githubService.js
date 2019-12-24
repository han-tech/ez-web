const Config = require('../config/env.config');
const Octokit = require("@octokit/rest");
const githubToken = Config.githubToken;
const org = Config.org;
const octokit = new Octokit({
    auth: githubToken
});

class GithubService{
    async getContents(newGitRepo, path){
        return await octokit.repos.getContents({
            owner:org,
            repo:newGitRepo,
            path:path
          });
    }

    async createOrUpdateFile(newGitRepo, path, base64content, comment, sha){
        const body ={                                
            owner:org,
            repo:newGitRepo,
            path:path,
            message:comment,
            content:base64content,
            branch:'master'
        }
        if(sha){
            body.sha = sha;
        }
        return await octokit.repos.createOrUpdateFile(body);
    }
}
exports.GithubService = GithubService;