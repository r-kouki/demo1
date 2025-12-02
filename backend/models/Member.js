const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
    },
    lastName: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
    },
    phone: {
      type: String,
      required: [true, 'Le téléphone est obligatoire'],
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Member', memberSchema);
