'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const Note = require('../models/note');

router.get('/', (req, res, next) => {
    const oid = req.session.currentUser._id;
    Note.find({'owner': ObjectId(oid)})
        .then(notes => {
            res.json(notes);
        })
        .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
    
});

router.post('/', (req, res, next) => {
    const data = req.body;
    const title = data[0];
    const content = data.slice(1).join('\n');
    const owner = req.session.currentUser._id;
    Note.create({
        owner,
        title,
        content
    });
    res.status(200).send();
});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

module.exports = router;