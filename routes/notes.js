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
    const { id } = req.params;
    Note.findById(id)
    .then(note => {
        res.json(note);
    })
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    const data = req.body;
    const title = data[0][0];
    const content = data[0].slice(1).join('\n');
    const owner = req.session.currentUser._id;
    const rawStrokes = data[1];
    const strokeGroups = data[2];
    Note.create({
        owner,
        title,
        content,
        rawStrokes,
        strokeGroups
    });
    res.status(200).send();
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const title = data[0][0];
    const content = data[0].slice(1).join('\n');
    const owner = req.session.currentUser._id;
    const rawStrokes = data[1];
    const strokeGroups = data[2];
    Note.findByIdAndUpdate(id, {owner, title, content, rawStrokes, strokeGroups})
    .then(() => {
        res.status(200).send();
    })
    .catch(error => next(error));
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
    .then(() => {
        res.status(200).send();
    })
    .catch(error => next(error));
});

module.exports = router;