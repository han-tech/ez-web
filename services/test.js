const CosmicUtility = require('../cosmicLibs/cosmicUtility').CosmicUtility;
const cosmicUtility = new CosmicUtility();
(async () => {
    try {
        const token = cosmicUtility.login('hantech2017@gmail.com','Cuul0ng1');
        console.log(token);
        const object_types=[{"slug":"planets","title":"Planets", "singular": 'Planet',"metafields":[{"title": "Radius","type":"text", "key": "radius", "required": true}]}];
        const objects=[{"slug":"mars","title":"Mars", "metafields":[{"title": "Radius","type":"text", "key": "radius", "value": "3,760 miles"}]},{"slug":"venus","title":"Venus", "metafields":[{"title": "Radius","type":"text", "key": "radius", "value": "5,760 miles"}]}];
        const webhooks = [
            {
                "title":"Object created and published",
                "event":"object.created.published",
                "endpoint":"https://www.cosmicjs.com/404"
            },
            {
                "title":"Object edited and published",
                "event":"object.edited.published",
                "endpoint":"https://www.cosmicjs.com/404"
            },
            {
                "title":"Object edited and saved as draft",
                "event":"object.edited.draft",
                "endpoint":"https://www.cosmicjs.com/404"
            },
            {
                "title":"Object deleted",
                "event":"object.deleted",
                "endpoint":"https://www.cosmicjs.com/404"
            },
        ];
        const bucket = await cosmicUtility.createBucket('Planets project','Planets_dinhSon','d4abf272-648c-4e38-8b2b-4bf6ad87fbbsd','d4abf272-648c-4e38-8b2b-4bf6ad87fbb03',object_types, objects, webhooks);
        console.log(bucket);
    } catch (e) {
        // Deal with the fact the chain failed
        console.log(e);
    }
})();
