import { useState } from 'react';
import { Box } from '@mui/material';
import PostComment from './PostComment';
import Comments from './Comments';

const PostCommentsSection = () => {
    const [comments, setComments] = useState([
        { username: 'username', text: 'This is a comment' }
    ]);

    const addComment = (text) => {
        if (text.trim() === '') return;
        setComments(prev => [
            ...prev,
            { username: 'username', text }
        ]);
    };

    return (
        <Box>
            <Comments comments={comments} />
            <PostComment addComment={addComment} />
        </Box>
    );
};

export default PostCommentsSection;