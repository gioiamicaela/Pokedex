const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

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
});

userSchema.plugin(beautifyUnique);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
