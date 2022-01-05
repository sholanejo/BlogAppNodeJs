const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_At: {
        type: Date,
        default: new Date()
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})
UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema);
module.exports = User;