const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  abilities: {
    type: [String], 
    required: true,
  },
  types: {
    type: [String], 
    required: true,
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    unique: 'El correo electrónico ya está registrado ({VALUE})',
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite: { 
    type: String,
    default: '',  
  },
  customPokemons: { 
    type: [pokemonSchema], 
    default: [], 
  },
});

//userSchema.plugin(beautifyUnique);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

