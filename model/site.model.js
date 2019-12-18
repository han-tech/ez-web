const Mongoose = require('mongoose');
const Config = require('../config/env.config');

const MONGODB_URI = Config.mongoDbUri;

Mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const Schema = Mongoose.Schema;

const siteSchema = new Schema({
    name: String,
    siteUrl: String,
    createdAt: { type: Date, default: Date.now},
    modifiedAt: { type: Date, default: Date.now},
});

siteSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
siteSchema.set('toJSON', {
    virtuals: true
});

siteSchema.findById = function (cb) {
    return this.model('Site').find({id: this.id}, cb);
};

const Site = Mongoose.model('site', siteSchema);

exports.findById = (id) => {
    return Site.findById(id)
        .then((result) => {
            if(result) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.create = (siteData) => {
    const site = new Site(siteData);
    return site.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Site.find()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchById = (id, siteData) => {
    return new Promise((resolve, reject) => {
        Site.findById(id, function (err, site) {
            if (err) reject(err);
            for (let i in siteData) {
                site[i] = siteData[i];
            }
            site.save(function (err, updatedSite) {
                if (err) return reject(err);
                resolve(updatedSite);
            });
        });
    })
};

exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Site.deleteOne({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.findByOwnerAndName = (owner, name) => {
    return Site.find({owner: owner, name: name});
};
