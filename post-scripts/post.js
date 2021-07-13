import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    alias: {type: String},
    description: {type: String},
    content: {type: String, required: true},
    picture:{type: String},
    headerImage:{type: String},
    date:{type: Date},
    createdAt:{type: Date},
    updatedAt:{type: Date}

})

export default mongoose.model("Post", Post)
