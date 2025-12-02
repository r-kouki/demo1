const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du plan est obligatoire'],
    },
    durationMonths: {
      type: Number,
      required: [true, 'La durée en mois est obligatoire'],
      min: [1, 'La durée doit être au moins de 1 mois'],
    },
    price: {
      type: Number,
      required: [true, 'Le prix est obligatoire'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Plan', planSchema);
