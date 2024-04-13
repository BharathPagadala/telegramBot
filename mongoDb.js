
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
    },
    totalAmount:{
        type: Number,
    },
    balance:{
        type: Number,
    },
    addAmount:{
        type: Number,
    },
    
},
{ timestamps: true })

const user = mongoose.model('user', userSchema)

module.exports = user

