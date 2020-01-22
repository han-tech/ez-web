const ButterCMSService = require('./buttercmsService').ButterCMSService;
const buttercmsService = new ButterCMSService();
async function start() {
    try{
        var page={"title": "Frequently Asked Questions",
        "slug": "faq2",
        "status": "published",
        "page-type": "customer_case_study",
        "fields": {
            "seo_title": "asdas",
            "seo_description": "asdasd",
            "title": "asdasd",
            "body": "asdasdasd  asdasdasd asd asd d asd",
            "facebook_open_graph_title": "asdasdasdasd",
            "testimonial": "asdasd",
            "customer_logo": "https://d2wzhk7xhrnk1x.cloudfront.net/f9Sen4QQcyVHSDZzI75w_butter-blog-post.jpg"}
        };
        var result = await buttercmsService.createPage('36cec65d5b8fc991c752523cc43de95b6587500b',page);
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