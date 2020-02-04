const PrismicUtility = require('../prismicLibs/prismicUtility').PrismicUtility;
const prismicUtility = new PrismicUtility();
class PrismicService{
  async newRepository(prismicTemplate, domain, prismicUsername, prismicPassword){
    return await prismicUtility.createPrismicProject(prismicUsername, prismicPassword, prismicTemplate, domain);
  }
  async createWebHook(domain, url, prismicUsername, prismicPassword){
    return await prismicUtility.createPrismicWebHook(prismicUsername, prismicPassword, domain, url);
  }
}
exports.PrismicService = PrismicService;