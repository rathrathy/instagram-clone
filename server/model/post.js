import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username: {
        type: String,
        required: true  
    },
    userPicture: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: null
    },
    caption: {
        type: String
    },
    likes: {
        type: [],
        required: true
    },
    comments: {
        type: [],
        required: true
    }
}, { timestamps: true });

const post = mongoose.model('post', postSchema);

export default post;