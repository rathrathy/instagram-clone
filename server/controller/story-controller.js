import Story from '../model/story.js';

export const saveStory = async (request, response) => {
    try {
        const newStory = new Story(request.body);
        await newStory.save();
        response.status(200).json('Story saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getActiveStories = async (request, response) => {
    try {
        // Find all stories created in the last 24 hours
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const stories = await Story.find({ createdAt: { $gte: since } });
        response.status(200).json(stories);
    } catch (error) {
        response.status(500).json(error.message);
    }
} 