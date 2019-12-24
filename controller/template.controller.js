const TemplateModel = require('../model/template.model');
const Config = require('../config/env.config');

exports.insert = (req, res) => {
    TemplateModel.create(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.findById = (req, res) => {
    TemplateModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.list = (req, res) => {

    TemplateModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.patchById = (req, res) => {

    TemplateModel.patchById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};

exports.deleteById = (req, res) => {

    TemplateModel.deleteById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};