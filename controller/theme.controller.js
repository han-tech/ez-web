const ThemeModel = require('../model/theme.model');
const Config = require('../config/env.config');

exports.insert = (req, res) => {
    ThemeModel.create(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.findById = (req, res) => {
    ThemeModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.list = (req, res) => {

    ThemeModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.patchById = (req, res) => {

    ThemeModel.patchById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};

exports.deleteById = (req, res) => {

    ThemeModel.deleteById(req.params.id, req.body)
        .then(() => {
            res.status(204).send({});
        });
};