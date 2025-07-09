import { Box } from '@mui/material';
import Comment from './Comment';

const Comments = ({ comments = [] }) => {
    return (
        <Box>
            {comments.map((data, idx) => (
                <Comment key={idx} username={data.username} text={data.text} />
            ))}
        </Box>
    );
};

export default Comments;