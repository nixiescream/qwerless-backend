'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const noteSchema = new Schema({
    owner: { type: ObjectId, ref: 'User' },
    title: String,
    content: String,
    rawStrokes: [],
    strokeGroups: []
    }, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;