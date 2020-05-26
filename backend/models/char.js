const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const charSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  skills: {
    type: [],
    required: true,
  },
  alternateSkills: {
    type: [],
    required: true,
  },
  charFilter: {
    type: [],
    required: true,
  },
  skillFilter: {
    type: [],
    required: true,
  },
  mission: {
    type: [],
    required: true,
  }
});

const Char = mongoose.model('Char', charSchema);

exports.char = charSchema;
exports.Char = Char;
