const Config = require('../config/env.config');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

var FormData = require('form-data');
const prismicAuthUrl = Config.prismicAuthUrl;
const prismicUsername = Config.prismicUsername;
const prismicPassword = Config.prismicPassword;

class PrismicService{
    async newRepository(xsrfToken, domain){
        //signin
        axiosCookieJarSupport(axios);

        const cookieJar = new tough.CookieJar();
        var bodyFormData = new FormData();
        bodyFormData.append('email', prismicUsername);
        bodyFormData.append('password', prismicPassword);
        const config = {
            headers:{'Content-Type':bodyFormData.getHeaders()['content-type'],
            'Access-Control-Allow-Origin': '*'},
            withCredentials: true, 
            crossdomain: true ,
            jar:cookieJar};
        await axios.post(prismicAuthUrl+'/signin',
            bodyFormData, config);
        
        //config.headers = { };
        const cookies = cookieJar.getCookiesSync(prismicAuthUrl);
        axios.defaults.headers['X-XSRF'] = cookies.find((x) => x.key === 'X-XSRF').value;
        //new a repository
        var bodyFormData = new FormData();
        bodyFormData.append('firstname', 'Son');
        bodyFormData.append('lastname', 'Dinh');
        bodyFormData.append('plan', 'personal');
        bodyFormData.append('domain', domain);
        bodyFormData.append('isAnnual', 'false');

        bodyFormData.append('custom-types', JSON.stringify([
            {
              "id": "page",
              "name": "Page",
              "repeatable": true,
              "value": {
            "Main" : {
              "uid" : {
                "type" : "UID",
                "config" : {
                  "placeholder" : "UID"
                }
              },
              "title" : {
                "type" : "StructuredText",
                "config" : {
                  "single" : "heading1",
                  "placeholder" : "Title..."
                }
              },
              "description" : {
                "type" : "StructuredText",
                "config" : {
                  "multi" : "paragraph,em,strong,hyperlink",
                  "placeholder" : "Description..."
                }
              },
              "image" : {
                "type" : "Image"
              }
            }
          }
            }
          ])          
         );

        await axios.post(prismicAuthUrl+'/newrepository', bodyFormData,config);
    }
}
exports.PrismicService = PrismicService;