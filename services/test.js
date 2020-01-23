const KontentService = require('./kontentService').KontentService;
const kontentService = new KontentService();
async function start() {
    try{
         /* var contentType={
            "external_id": "article",
            "name": "Article",
            "codename": "my_article",
            "content_groups": [
              {
                "name": "Article copy",
                "external_id": "article-copy"
              },
              {
                "name": "Author",
                "external_id": "author"
              }
            ],
            "elements": [
              {
                "name": "Article title",
                "codename": "title",
                "type": "text",
                "content_group": {
                  "external_id": "article-copy"
                }
              },
              {
                "name": "Article body",
                "codename": "body",
                "type": "rich_text",
                "content_group": {
                  "external_id": "article-copy"
                }
              },
              {
                "name": "Author bio",
                "codename": "bio",
                "allowed_blocks": [
                  "images",
                  "text"
                ],
                "type": "rich_text",
                "content_group": {
                  "external_id": "author"
                }
              }
            ]
          };
        var result = await kontentService.createContentType('ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogImEzYjM4Yjg3MTI0ODRkYTY4NGNjMDJlNTU3YzEyNDZiIiwNCiAgImlhdCI6ICIxNTc5NjkwMDAxIiwNCiAgImV4cCI6ICIxOTI1MjkwMDAxIiwNCiAgInByb2plY3RfaWQiOiAiY2I4YTFjYWU1Nzk4MDBkNjIzMzg5Mjc2MjY1OGEwZDAiLA0KICAidmVyIjogIjIuMS4wIiwNCiAgInVpZCI6ICI1ZTFlZjBhMzMzZjQzYTBmMTcyMWRiM2MiLA0KICAiYXVkIjogIm1hbmFnZS5rZW50aWNvY2xvdWQuY29tIg0KfQ.DXXBekIjygCbmBBftLT8k_mbYRdJliUerLH7UPS25oA',"cb8a1cae-5798-00d6-2338-92762658a0d0",contentType);
      
        var content={            
            "name":"Helloasdhslddksd",
            "codename": "my_article_on_roalsts_d2k33ssda",
            "type": {
              "codename": "my_article"
            },
            "external_id": "59051037"
          };
          const variant = {
            "elements":[
              {
                "element":{
                  "codename":"title"
                },
                "value":"Hello World"
              },
              {
                "element":{
                  "codename":"body"
                },
                "value":"<p>Hi there</p>"
              },
              {
                "element":{
                  "codename":"bio"
                },
                "value":"<p>Tostar granos de café puede tardar de 6 a 13 minutos. ...</p>"
              }
            ]
        };
        */
        var webhook={
            "name": "Example",
            "url": "https://example.com",
            "secret": "secret",
            "triggers": {
                "delivery_api_content_changes": [
                    {
                        "type": "content_item_variant",
                        "operations": [
                            "publish",  
                            "unpublish" 
                        ]
                    },
                    {
                        "type": "taxonomy",
                        "operations": [
                            "archive",
                            "restore",
                            "upsert" 
                        ]
                    }
                ]
            }
        };
        var result = await kontentService.createWebHook('ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogImEzYjM4Yjg3MTI0ODRkYTY4NGNjMDJlNTU3YzEyNDZiIiwNCiAgImlhdCI6ICIxNTc5NjkwMDAxIiwNCiAgImV4cCI6ICIxOTI1MjkwMDAxIiwNCiAgInByb2plY3RfaWQiOiAiY2I4YTFjYWU1Nzk4MDBkNjIzMzg5Mjc2MjY1OGEwZDAiLA0KICAidmVyIjogIjIuMS4wIiwNCiAgInVpZCI6ICI1ZTFlZjBhMzMzZjQzYTBmMTcyMWRiM2MiLA0KICAiYXVkIjogIm1hbmFnZS5rZW50aWNvY2xvdWQuY29tIg0KfQ.DXXBekIjygCbmBBftLT8k_mbYRdJliUerLH7UPS25oA',"cb8a1cae-5798-00d6-2338-92762658a0d0",webhook);
        return result;
    }
    catch(error){
        console.log(error);
    }
}

start().then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
})