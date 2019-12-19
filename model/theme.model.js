const Mongoose = require('mongoose');
const Config = require('../config/env.config');

const MONGODB_URI = Config.mongoDbUri;

Mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const Schema = Mongoose.Schema;

const themeSchema = new Schema({
    description: String,
    name: String,
    owner:String,
    templateUrl: String,
    createdAt: { type: Date, default: Date.now},
    modifiedAt: { type: Date, default: Date.now},
});

themeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
themeSchema.set('toJSON', {
    virtuals: true
});

themeSchema.findById = function (cb) {
    return this.model('Theme').find({id: this.id}, cb);
};

const Theme = Mongoose.model('theme', themeSchema);

exports.findById = (id) => {
    return Theme.findById(id)
        .then((result) => {
            if(result) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.create = (themeData) => {
    const theme = new Theme(themeData);
    return theme.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Theme.find()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchById = (id, themeData) => {
    return new Promise((resolve, reject) => {
        Theme.findById(id, function (err, theme) {
            if (err) reject(err);
            for (let i in themeData) {
                theme[i] = themeData[i];
            }
            theme.save(function (err, updatedTheme) {
                if (err) return reject(err);
                resolve(updatedTheme);
            });
        });
    })
};

exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Theme.deleteOne({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.findByOwnerAndName = (owner, name) => {
    return Theme.find({owner: owner, name: name});
};
