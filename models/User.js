// const {Schema, model} = require('mongoose');
import mongoose from 'mongoose';

const User = new mongoose.Schema ({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    name: {type: String},
    picture: {type: String},
})


export default mongoose.model('User', User)