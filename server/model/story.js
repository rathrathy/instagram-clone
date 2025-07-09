import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

const Story = mongoose.model('story', storySchema);

export default Story; 