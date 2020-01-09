const Config = require('../config/env.config');
const PrismicUtility = require('../libraries/prismicUtility').PrismicUtility;
const prismicUtility = new PrismicUtility();

const prismicUsername = Config.prismicUsername;
const prismicPassword = Config.prismicPassword;

class PrismicService{
    async newRepository(prismicTemplate, domain){
      return await prismicUtility.createPrismicProject(prismicUsername, prismicPassword, prismicTemplate, domain);
    }
}
exports.PrismicService = PrismicService;