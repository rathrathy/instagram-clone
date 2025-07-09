import { useState } from 'react';
import { Box, InputBase, Button, styled } from '@mui/material';
import { SentimentSatisfiedAltOutlined } from '@mui/icons-material';

const Component = styled(Box)`
    padding: 6px 16px;
    border-top: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Emoji = styled(SentimentSatisfiedAltOutlined)`
    font-size: 28px;
`;

const InputTextField = styled(InputBase)`
    width: 100%;
    margin-left: 10px;
    font-size: 14px;
`;

const PostButton = styled(Button)`
    color:rgb(0, 61, 204);
    text-transform: none;
    font-weight: bold;
    transition: color 0.2s, opacity 0.2s;
    opacity: 1;
    &:active {
        opacity: 0.5;
    }
`;

const PostComment = ({ addComment }) => {
    const [input, setInput] = useState('');

    const handlePost = () => {
        addComment(input);
        setInput('');
    };

    return (
        <Component>
            <Emoji />
            <InputTextField
                placeholder='Add a comment...'
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <PostButton onClick={handlePost}>Post</PostButton>
        </Component>
    )
}

export default PostComment