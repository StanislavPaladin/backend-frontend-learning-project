// const {Schema, model} = require('mongoose');
import mongoose from 'mongoose';

const Role = new mongoose.Schema ({
    value: {type: String, unique: true, default: "ADMIN"},
})

// module.exports = model ('Role', Role)
export default mongoose.model('Role', Role)