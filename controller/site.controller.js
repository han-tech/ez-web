const SiteModel = require('../model/site.model');
const Config = require('../config/env.config');

exports.insert = (req, res) => {
    SiteModel.create(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.findById = (req, res) => {
    SiteModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.list = (req, res) => {

    SiteModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.patchById = (req, res) => {
    req.body["updatedAt"] = new Date();
    SiteModel.patchById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};

exports.deleteById = (req, res) => {

    SiteModel.deleteById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};