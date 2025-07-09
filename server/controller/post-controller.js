import Post from '../model/post.js';


export const savePost = async (request, response) => {
    try {
        const newPost = new Post(request.body);
        await newPost.save();

        response.status(200).json('Post saved sucessfully');
    } catch(error) {
        response.status(500).json(error.message);
    }
}

export const getAllPosts = async (request, response) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        response.status(200).json(posts);
    } catch(error) {
        response.status(500).json(error.message);
    }
}