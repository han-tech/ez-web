const PrismicUtility = require('./prismicUtility').PrismicUtility;
const prismicUtility = new PrismicUtility();
async function start() {
    try{
        var contentType={"Main":{"title":{"type":"StructuredText","config":{"single":"heading1, heading2, heading3, heading4, heading5, heading6","label":"title"}},"description":{"type":"StructuredText","config":{"multi":"paragraph, preformatted, heading1, heading2, heading3, heading4, heading5, heading6, strong, em, hyperlink, image, embed, list-item, o-list-item, o-list-item","label":"description"}},"date":{"type":"Date","config":{"label":"date"}},"link":{"type":"Link","config":{"label":"link"}}}};
        var content={"title":[{"type":"heading1","content":{"text":"Mon super test","spans":[]}}],"description":[{"type":"paragraph","content":{"text":"Test super description","spans":[]}}],"date":"2019-04-30","link":{"url":"https://prismic.io","preview":null},"title_TYPE":"StructuredText","title_POSITION":0,"description_TYPE":"StructuredText","description_POSITION":1,"date_TYPE":"Date","date_POSITION":2,"link_TYPE":"Link","link_POSITION":3,"slugs_INTERNAL":["mon-super-test","test1","test"],"uids_INTERNAL":[]}
        var result = await prismicUtility.createAndPublishPrismicContent('dinhquangson@gmail.com','Th@Nhb1nh','hellotheme8y','post',contentType,content);
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