const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bcrypt = require('bcrypt');


const customer = new Schema({
    id: ObjectId,
    fullname: String,
    avatar: String,
    email: String,
    password: String,
    created_at: Date,
    phone: String,
    address: String,
    status: Boolean,
    verify: Boolean,
    created_at: Date,
});

// Password Encode
customer.pre('save', async function(next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

exports.customer = mongoose.model('customer', customer);