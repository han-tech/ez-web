const Mongoose = require('mongoose');
const Config = require('../config/env.config');

const MONGODB_URI = Config.mongoDbUri;

Mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const Schema = Mongoose.Schema;

const templateSchema = new Schema({
    description: String,
    name: String,
    owner:String,
    templateUrl: String,
    createdAt: { type: Date, default: Date.now},
    modifiedAt: { type: Date, default: Date.now},
});

templateSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
templateSchema.set('toJSON', {
    virtuals: true
});

templateSchema.findById = function (cb) {
    return this.model('Template').find({id: this.id}, cb);
};

const Template = Mongoose.model('template', templateSchema);

exports.findById = (id) => {
    return Template.findById(id)
        .then((result) => {
            if(result) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.create = (templateData) => {
    const template = new Template(templateData);
    return template.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Template.find()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchById = (id, templateData) => {
    return new Promise((resolve, reject) => {
        Template.findById(id, function (err, template) {
            if (err) reject(err);
            for (let i in templateData) {
                template[i] = templateData[i];
            }
            template.save(function (err, updatedTemplate) {
                if (err) return reject(err);
                resolve(updatedTemplate);
            });
        });
    })
};

exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Template.deleteOne({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.findByOwnerAndName = (owner, name) => {
    return Template.find({owner: owner, name: name});
};
