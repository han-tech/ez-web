const CosmicUtility = require('../cosmicLibs/cosmicUtility').CosmicUtility;
const cosmicUtility = new CosmicUtility();
class CosmicService{
  async newRepository(cosmicTemplate, domain, cosmicUsername, cosmicPassword){
    return await cosmicUtility.createCosmicProject(cosmicUsername, cosmicPassword, cosmicTemplate, domain);
  }
  async createWebHook(domain, url, cosmicUsername, cosmicPassword){
    return await cosmicUtility.createCosmicWebHook(cosmicUsername, cosmicPassword, domain, url);
  }
}
exports.CosmicService = CosmicService;